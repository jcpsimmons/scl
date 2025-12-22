#!/usr/bin/env node

import { GoogleGenAI } from '@google/genai'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import mime from 'mime'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Configuration
const INK_FILE_PATH = join(__dirname, '../src/content/main.ink')
const BURNOUT_SCENARIOS_PATH = join(
  __dirname,
  '../src/content/burnoutScenarios.json'
)
const OUTPUT_DIR = join(__dirname, '../public/images/generated')
const TEST_MODE = process.argv.includes('--test')

// Parallelization settings (can be overridden with env vars)
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE) || 10
const BATCH_DELAY_MS = parseInt(process.env.BATCH_DELAY_MS) || 500
const AGGRESSIVE_MODE =
  process.argv.includes('--aggressive') ||
  process.env.AGGRESSIVE_MODE === 'true'

// Google AI Studio API configuration
const GOOGLE_AI_KEY = process.env.GOOGLE_AI_KEY

if (!GOOGLE_AI_KEY) {
  console.error('❌ GOOGLE_AI_KEY environment variable is required')
  console.error('Set it with: export GOOGLE_AI_KEY=your_api_key_here')
  process.exit(1)
}

// Initialize Gemini for both prompt creation and image generation
const ai = new GoogleGenAI({
  apiKey: GOOGLE_AI_KEY,
})

// Parse ink file to extract story steps with hashes
function parseInkFile(filePath) {
  const content = readFileSync(filePath, 'utf8')
  const steps = []

  // Split content by story step markers
  const stepSections = content.split(/^=== (\w+) ===$/gm)

  // Process each section (skip the first empty section)
  for (let i = 1; i < stepSections.length; i += 2) {
    const stepName = stepSections[i]
    const stepContent = stepSections[i + 1]

    if (!stepName || !stepContent) continue

    // Extract hash from the step content
    const hashMatch = stepContent.match(/~ current_step_hash = "([^"]+)"/)
    if (!hashMatch) continue

    const hash = hashMatch[1]

    // Extract only the narrative text (skip choices, deltas, etc.)
    const lines = stepContent.split('\n')
    const narrativeLines = []

    for (const line of lines) {
      const trimmedLine = line.trim()

      // Skip empty lines, comments, choices, technical lines
      if (
        trimmedLine === '' ||
        trimmedLine.startsWith('//') ||
        trimmedLine.startsWith('*') ||
        trimmedLine.startsWith('+') ||
        trimmedLine.startsWith('#') ||
        trimmedLine.startsWith('~') ||
        trimmedLine.startsWith('{') ||
        trimmedLine.startsWith('}') ||
        trimmedLine.startsWith('->') ||
        trimmedLine.includes('#delta:') ||
        trimmedLine.includes('#goto:') ||
        trimmedLine.includes('[') ||
        trimmedLine.includes(']') ||
        trimmedLine.includes('Congratulations!') ||
        trimmedLine.includes("You've reached") ||
        trimmedLine.includes('The simulation ends') ||
        trimmedLine.includes('Welcome to Autism Simulator') ||
        trimmedLine.includes('Begin the day')
      ) {
        continue
      }

      // This is narrative text
      narrativeLines.push(trimmedLine)
    }

    if (narrativeLines.length > 0) {
      steps.push({
        name: stepName,
        hash: hash,
        text: narrativeLines.join(' ').trim(),
      })
    }
  }

  return steps
}

// Check if image already exists (check both jpg and png)
function imageExists(hash) {
  const jpgPath = join(OUTPUT_DIR, `${hash}.jpg`)
  const pngPath = join(OUTPUT_DIR, `${hash}.png`)
  return existsSync(jpgPath) || existsSync(pngPath)
}

// Extract meaningful context keywords from story text
function extractContextKeywords(text) {
  const keywords = []
  const lowerText = text.toLowerCase()

  // Emotional states
  if (
    lowerText.includes('tired') ||
    lowerText.includes('exhausted') ||
    lowerText.includes('drained')
  ) {
    keywords.push('tired', 'exhausted')
  }
  if (
    lowerText.includes('anxious') ||
    lowerText.includes('worried') ||
    lowerText.includes('nervous')
  ) {
    keywords.push('anxious', 'concerned')
  }
  if (
    lowerText.includes('calm') ||
    lowerText.includes('peaceful') ||
    lowerText.includes('relaxed')
  ) {
    keywords.push('calm', 'peaceful')
  }
  if (lowerText.includes('focused') || lowerText.includes('concentrated')) {
    keywords.push('focused', 'concentrated')
  }
  if (lowerText.includes('overwhelmed') || lowerText.includes('stressed')) {
    keywords.push('overwhelmed', 'stressed')
  }

  // Actions (safe for images)
  if (lowerText.includes('walking') || lowerText.includes('moving')) {
    keywords.push('walking')
  }
  if (lowerText.includes('sitting') || lowerText.includes('resting')) {
    keywords.push('sitting', 'resting')
  }
  if (lowerText.includes('standing') || lowerText.includes('waiting')) {
    keywords.push('standing')
  }
  if (lowerText.includes('thinking') || lowerText.includes('contemplating')) {
    keywords.push('contemplating')
  }

  // Environmental context
  if (lowerText.includes('quiet') || lowerText.includes('silent')) {
    keywords.push('quiet atmosphere')
  }
  if (lowerText.includes('busy') || lowerText.includes('crowded')) {
    keywords.push('busy environment')
  }

  return keywords.slice(0, 3) // Limit to top 3 most relevant keywords
}

// Basic image quality validation
async function validateImageQuality(imagePath) {
  try {
    const stats = require('fs').statSync(imagePath)

    // Check file size (should be reasonable for a 1K image)
    if (stats.size < 10000) {
      // Less than 10KB is suspicious
      console.log(
        `!  Image ${imagePath} is unusually small (${stats.size} bytes)`
      )
      return false
    }

    if (stats.size > 1000000) {
      // More than 1MB is suspicious
      console.log(
        `!  Image ${imagePath} is unusually large (${stats.size} bytes)`
      )
      return false
    }

    return true
  } catch (error) {
    console.log(`!  Could not validate image ${imagePath}: ${error.message}`)
    return false
  }
}

// Use Gemini 2.5 Flash to create a better prompt for Imagen
async function createImagenPrompt(stepText, hash) {
  const cleanText = stepText
    .replace(/\[.*?\]/g, '') // Remove any remaining choice text
    .replace(/#delta:.*?/g, '') // Remove delta markers
    .replace(/\{.*?\}/g, '') // Remove any remaining technical markup
    .replace(/\s+/g, ' ') // Clean up multiple spaces
    .trim()

  const promptCreationPrompt = `You are an expert at creating detailed, specific prompts for AI image generation. 

Story text: "${cleanText}"
Story hash: "${hash}"

Create a detailed, specific prompt for Gemini 2.5 Flash Nano Banana that will generate a compelling visual representation of this story moment. Focus on:

1. SPECIFIC OBJECTS/ACTIONS: What specific objects, actions, or scenes should be shown? (e.g., "close-up of pill organizer", "hands holding medication bottle", "desk with computer monitor", "car dashboard with radio")

2. ENVIRONMENT: What is the specific setting? (e.g., "1990s kitchen counter", "office cubicle", "car interior", "break room table")

3. COMPOSITION: What type of shot? (e.g., "close-up", "medium shot", "wide shot", "overhead view")

4. MOOD/ATMOSPHERE: What feeling should the image convey? (e.g., "calm morning routine", "stressful work environment", "peaceful commute")

5. 1990s AESTHETIC: Include authentic 1990s details (clothing, technology, furniture, etc.)

The image should focus on the SCENARIO and OBJECTS rather than being a portrait. If there's a person, they should be part of the scene but not the main focus. Above all these images should be photorealistic. 

Return ONLY the prompt text, no explanations or formatting.`

  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-flash-latest',
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: promptCreationPrompt,
            },
          ],
        },
      ],
    })

    let promptText = ''
    for await (const chunk of response) {
      promptText += chunk.text
    }

    // Add the strict requirements
    const finalPrompt = `${promptText.trim()}

STRICT REQUIREMENTS: NO TEXT, NO WORDS, NO LETTERS, NO MUSICAL INSTRUMENTS, NO GUITARS, NO PIANOS, NO DRUMS, NO MUSIC NOTES, NO SONG LYRICS, NO WRITTEN TEXT, NO SIGNS, NO POSTERS WITH TEXT, NO BOOKS WITH VISIBLE TEXT, NO COMPUTER SCREENS WITH TEXT, NO PHONE SCREENS WITH TEXT, NO NEWSPAPERS, NO MAGAZINES, NO DOCUMENTS, NO WRITING, NO PRINTED MATERIALS, NO MUSIC SHEETS, NO INSTRUMENTS, NO AUDIO EQUIPMENT, NO SPEAKERS, NO HEADPHONES, NO RADIOS, NO CDS, NO CASSETTES, NO RECORDS, NO MUSIC PLAYERS, NO ELECTRONIC DEVICES WITH TEXT DISPLAYS, NO CLOCKS WITH NUMBERS, NO CALENDARS, NO NOTEPADS, NO PENS, NO PENCILS, NO WRITING UTENSILS, NO PAPER, NO STICKY NOTES, NO LABELS, NO TAGS, NO BRAND NAMES, NO LOGOS, NO TEXT ON CLOTHING, NO TEXT ON OBJECTS, NO TEXT ANYWHERE IN THE IMAGE.`

    return finalPrompt
  } catch (error) {
    console.error(`❌ Failed to create prompt with Gemini: ${error.message}`)
    // Fallback to basic prompt
    return `Environmental scene photography, 1990s setting, clean composition, authentic 1990s aesthetic, natural lighting, realistic environment, square format.`
  }
}

// Generate image using Gemini 2.5 Flash image generation
async function generateImage(stepText, hash) {
  console.log(`🎨 Generating image for ${hash}...`)
  console.log(`📖 Story text: ${stepText.substring(0, 100)}...`)

  // Use Gemini to create a better prompt
  console.log(`🤖 Creating prompt with Gemini 2.5 Flash...`)
  const prompt = await createImagenPrompt(stepText, hash)

  console.log(`📝 FULL PROMPT CREATED BY GEMINI:`)
  console.log(prompt)
  console.log(`📝 END PROMPT`)

  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash-image-preview',
      config: {
        responseModalities: ['IMAGE', 'TEXT'],
      },
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    })

    let fileIndex = 0
    let imageGenerated = false

    for await (const chunk of response) {
      if (
        !chunk.candidates ||
        !chunk.candidates[0].content ||
        !chunk.candidates[0].content.parts
      ) {
        continue
      }

      if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const inlineData = chunk.candidates[0].content.parts[0].inlineData
        const fileExtension =
          mime.getExtension(inlineData.mimeType || '') || 'jpg'
        const buffer = Buffer.from(inlineData.data || '', 'base64')

        // Save image
        const imagePath = join(OUTPUT_DIR, `${hash}.${fileExtension}`)
        writeFileSync(imagePath, buffer)

        // Validate image quality
        const isValid = await validateImageQuality(imagePath)
        if (!isValid) {
          console.log(
            `!  Image quality validation failed for ${hash}, but keeping generated image`
          )
        }

        console.log(`✅ Generated image: ${hash}.${fileExtension}`)
        imageGenerated = true
        break // We only want one image
      } else if (chunk.text) {
        console.log(`📝 Gemini response: ${chunk.text}`)
      }
    }

    if (!imageGenerated) {
      throw new Error('No image data received from Gemini')
    }

    return true
  } catch (error) {
    console.error(`❌ Failed to generate image for ${hash}:`, error.message)
    return false
  }
}

// Parse burnout scenarios from JSON file - NO REGEX BULLSHIT!
function parseBurnoutScenarios(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8')
    const burnoutScenarios = JSON.parse(content)
    const scenarios = []

    // Just iterate over the object properties directly!
    Object.entries(burnoutScenarios).forEach(([key, description]) => {
      const hash = `burnout_${key}_000`

      scenarios.push({
        name: `BurnoutScenario_${key.charAt(0).toUpperCase() + key.slice(1)}`,
        hash: hash,
        text: description + ' Surreal, horror movie. Schizophrenic.',
      })
    })

    console.log(scenarios)
    return scenarios
  } catch (error) {
    console.error(`❌ Failed to parse burnout scenarios: ${error.message}`)
    return []
  }
}

// Main function
async function main() {
  console.log('🚀 Starting image generation...')
  console.log(`📁 Output directory: ${OUTPUT_DIR}`)
  console.log(
    `🧪 Test mode: ${TEST_MODE ? 'ON (first 3 steps only)' : 'OFF (all steps)'}`
  )
  console.log(`⚡ Batch size: ${BATCH_SIZE} concurrent images`)
  console.log(`⏱  Batch delay: ${BATCH_DELAY_MS}ms`)
  console.log(
    `🔥 Aggressive mode: ${
      AGGRESSIVE_MODE ? 'ON (maximum speed)' : 'OFF (conservative)'
    }`
  )

  // Apply aggressive mode settings
  const actualBatchSize = AGGRESSIVE_MODE ? Math.max(BATCH_SIZE, 8) : BATCH_SIZE
  const actualDelay = AGGRESSIVE_MODE
    ? Math.min(BATCH_DELAY_MS, 1000)
    : BATCH_DELAY_MS

  if (AGGRESSIVE_MODE) {
    console.log(
      `🚀 AGGRESSIVE MODE: Using batch size ${actualBatchSize}, delay ${actualDelay}ms`
    )
  }

  // Parse ink file
  console.log('📖 Parsing ink file...')
  const steps = parseInkFile(INK_FILE_PATH)

  // Parse burnout scenarios
  console.log('📖 Parsing burnout scenarios...')
  const burnoutScenarios = parseBurnoutScenarios(BURNOUT_SCENARIOS_PATH)
  console.log(`📊 Found ${burnoutScenarios.length} burnout scenarios`)

  // Combine regular steps with burnout scenarios
  const allSteps = [...steps, ...burnoutScenarios]

  if (TEST_MODE) {
    console.log(`🧪 Test mode: Processing only first 3 steps`)
    allSteps.splice(3)
  }

  console.log(
    `📊 Found ${allSteps.length} total story steps (including burnout scenarios)`
  )

  // Filter out steps that already have images
  const stepsToProcess = allSteps.filter(step => !imageExists(step.hash))
  const existingCount = allSteps.length - stepsToProcess.length

  console.log(
    `📈 ${existingCount} images already exist, ${stepsToProcess.length} to generate`
  )

  if (stepsToProcess.length === 0) {
    console.log('✅ All images already generated!')
    return
  }

  // Show some example prompts for debugging
  if (TEST_MODE && stepsToProcess.length > 0) {
    console.log('\n🔍 Example prompts that will be generated:')
    for (let i = 0; i < Math.min(3, stepsToProcess.length); i++) {
      const step = stepsToProcess[i]
      const cleanText = step.text
        .replace(/\[.*?\]/g, '')
        .replace(/#delta:.*?/g, '')
        .replace(/\{.*?\}/g, '')
        .replace(
          /song|music|melody|guitar|piano|drum|lyrics|singing|listening to music/gi,
          ''
        )
        .replace(
          /text|writing|reading|book|document|paper|screen|computer|phone/gi,
          ''
        )
        .replace(/\s+/g, ' ')
        .trim()
      const contextKeywords = extractContextKeywords(cleanText)
      console.log(
        `  ${step.hash}: "${cleanText.substring(
          0,
          80
        )}..." -> Keywords: [${contextKeywords.join(', ')}]`
      )
    }
    console.log('')
  }

  // Generate images in parallel batches of 3
  let successCount = 0
  let failCount = 0

  // Process in batches
  for (let i = 0; i < stepsToProcess.length; i += actualBatchSize) {
    const batch = stepsToProcess.slice(i, i + actualBatchSize)
    console.log(
      `\n🎬 Processing batch ${Math.floor(i / actualBatchSize) + 1} (${
        batch.length
      } images)...`
    )

    // Process batch in parallel
    const batchPromises = batch.map(async step => {
      console.log(`🎨 Starting: ${step.name} (${step.hash})`)
      console.log(`📝 Text: ${step.text.substring(0, 100)}...`)

      const success = await generateImage(step.text, step.hash)
      if (success) {
        console.log(`✅ Completed: ${step.hash}`)
        return { success: true, step }
      } else {
        console.log(`❌ Failed: ${step.hash}`)
        return { success: false, step }
      }
    })

    // Wait for batch to complete
    const results = await Promise.all(batchPromises)

    // Count results
    results.forEach(result => {
      if (result.success) {
        successCount++
      } else {
        failCount++
      }
    })

    // Add delay between batches to avoid rate limiting
    if (i + actualBatchSize < stepsToProcess.length) {
      console.log(`⏳ Waiting ${actualDelay}ms before next batch...`)
      await new Promise(resolve => setTimeout(resolve, actualDelay))
    }
  }

  console.log(`\n📊 Generation complete!`)
  console.log(`✅ Success: ${successCount}`)
  console.log(`❌ Failed: ${failCount}`)
  console.log(`📁 Images saved to: ${OUTPUT_DIR}`)
}

// Run the script
main().catch(error => {
  console.error('💥 Script failed:', error)
  process.exit(1)
})
