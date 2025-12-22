#!/usr/bin/env node

// Compile Ink using inkjs's built-in compiler instead of inklecate
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function compileInk() {
  try {
    console.log('Compiling Ink using inkjs compiler...')

    // Import inkjs with compiler using the official export
    const inkjs = await import('inkjs/full')

    console.log('Available exports:', Object.keys(inkjs))

    // Read the source Ink file
    const inkPath = path.join(__dirname, '..', 'src', 'content', 'main.ink')
    const inkSource = fs.readFileSync(inkPath, 'utf8')

    console.log('Read Ink source:', inkPath)
    console.log('Source length:', inkSource.length, 'characters')

    // Try different ways to access the compiler
    const Compiler = inkjs.Compiler || inkjs.default?.Compiler || inkjs.default
    console.log('Compiler found:', !!Compiler)

    if (!Compiler) {
      throw new Error('Could not find Compiler in inkjs exports')
    }

    // Compile using inkjs compiler
    const compiler = new Compiler(inkSource)
    const story = compiler.Compile()

    if (compiler.errors && compiler.errors.length > 0) {
      console.error('Compilation errors:')
      compiler.errors.forEach(error => console.error('  -', error))
      process.exit(1)
    }

    if (compiler.warnings && compiler.warnings.length > 0) {
      console.warn('Compilation warnings:')
      compiler.warnings.forEach(warning => console.warn('  -', warning))
    }

    // Generate JSON
    const jsonContent = story.ToJson()

    console.log('Generated JSON length:', jsonContent.length, 'characters')

    // Ensure output directory exists
    const outputDir = path.join(__dirname, '..', 'src', 'content', 'build')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Write JSON file
    const outputPath = path.join(outputDir, 'main.ink.json')
    fs.writeFileSync(outputPath, jsonContent, 'utf8')

    console.log('✅ Successfully compiled Ink to:', outputPath)

    // Quick verification - check if tags are present
    const jsonObj = JSON.parse(jsonContent)
    const jsonStr = JSON.stringify(jsonObj)
    const deltaTagCount = (jsonStr.match(/delta:/g) || []).length
    console.log('✅ Found', deltaTagCount, 'delta tags in compiled JSON')
  } catch (error) {
    console.error('❌ Compilation failed:', error)
    process.exit(1)
  }
}

compileInk()
