#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const INK_FILE = 'src/content/main.ink'
const COMPILED_FILE = 'src/content/build/main.ink.json'

function validateInkContent() {
  console.log('🔍 Validating Ink content...')

  // Check if Ink file exists
  if (!fs.existsSync(INK_FILE)) {
    console.error('❌ Ink file not found:', INK_FILE)
    process.exit(1)
  }

  // Check if compiled JSON exists
  if (!fs.existsSync(COMPILED_FILE)) {
    console.error('❌ Compiled Ink JSON not found:', COMPILED_FILE)
    console.log('💡 Run "pnpm run compile:ink" first')
    process.exit(1)
  }

  // Read and parse the compiled JSON
  let inkData
  try {
    const jsonContent = fs.readFileSync(COMPILED_FILE, 'utf8')
    // Remove BOM if present
    const cleanContent = jsonContent.replace(/^\uFEFF/, '')
    inkData = JSON.parse(cleanContent)
  } catch (error) {
    console.error('❌ Failed to parse compiled Ink JSON:', error.message)
    process.exit(1)
  }

  // Validate story structure
  const errors = []
  const warnings = []

  // Check for required story sections
  const requiredSections = ['start_here', 'new_day']
  for (const section of requiredSections) {
    if (!inkData.inkVersion) {
      errors.push(`Missing inkVersion in compiled JSON`)
    }
  }

  // Check for stat delta tags
  const inkContent = fs.readFileSync(INK_FILE, 'utf8')
  const deltaTags = inkContent.match(/#delta:[^#\n]+/g) || []

  console.log(`📊 Found ${deltaTags.length} stat delta tags`)

  // Validate delta ranges
  for (const tag of deltaTags) {
    const matches = tag.match(/#delta:(\w+)=([+-]?\d+)/g)
    if (matches) {
      for (const match of matches) {
        const [, stat, value] = match.match(/#delta:(\w+)=([+-]?\d+)/)
        const numValue = parseInt(value)

        // Check for reasonable ranges
        if (Math.abs(numValue) > 20) {
          warnings.push(`Large stat delta: ${match} (${numValue})`)
        }

        // Check for valid stat names
        const validStats = ['energy', 'masking', 'competence', 'relationships']
        if (!validStats.includes(stat)) {
          errors.push(`Invalid stat name: ${stat} in ${match}`)
        }
      }
    }
  }

  // Check for unreachable content (basic check)
  const choicePatterns = inkContent.match(/\*.*?\[.*?\]/g) || []
  console.log(`🎯 Found ${choicePatterns.length} choice patterns`)

  // Check for potential infinite loops
  const gotoPatterns = inkContent.match(/->\s*(\w+)/g) || []
  const targetSections = [
    ...new Set(gotoPatterns.map(p => p.replace('-> ', ''))),
  ]
  console.log(`🔗 Found ${targetSections.length} unique story sections`)

  // Report results
  if (errors.length > 0) {
    console.error('❌ Validation errors:')
    errors.forEach(error => console.error(`  - ${error}`))
    process.exit(1)
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Validation warnings:')
    warnings.forEach(warning => console.warn(`  - ${warning}`))
  }

  console.log('✅ Ink content validation passed!')
  console.log(
    `📈 Summary: ${deltaTags.length} deltas, ${choicePatterns.length} choices, ${targetSections.length} sections`
  )
}

validateInkContent()
