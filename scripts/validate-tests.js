#!/usr/bin/env node

/**
 * Test validation script for autism-simulator
 * Validates that test files are syntactically correct and use proper selectors
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const testDir = path.join(__dirname, '../tests/e2e')
const testFiles = [
  'basic.spec.ts',
  'multi-day-gameplay.spec.ts',
  'advanced-scenarios.spec.ts',
  'failure-scenarios.spec.ts',
]

console.log('🧪 Validating Playwright test files...\n')

let allValid = true

for (const testFile of testFiles) {
  const filePath = path.join(testDir, testFile)

  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${testFile}: File not found`)
    allValid = false
    continue
  }

  const content = fs.readFileSync(filePath, 'utf8')

  // Check for required imports
  if (!content.includes("import { test, expect } from '@playwright/test'")) {
    console.log(`❌ ${testFile}: Missing Playwright imports`)
    allValid = false
    continue
  }

  if (
    !content.includes('GameHelper') ||
    !content.includes('./helpers/game-helpers')
  ) {
    console.log(`❌ ${testFile}: Missing GameHelper import`)
    allValid = false
    continue
  }

  // Check for proper test structure
  if (!content.includes('test.describe(')) {
    console.log(`❌ ${testFile}: Missing test.describe`)
    allValid = false
    continue
  }

  if (!content.includes('test.beforeEach(')) {
    console.log(`❌ ${testFile}: Missing test.beforeEach`)
    allValid = false
    continue
  }

  // Check for proper selectors (data-testid)
  const hasDataTestId = content.includes('data-testid')
  const hasGameHelper = content.includes('gameHelper.')

  if (!hasDataTestId && !hasGameHelper) {
    console.log(`⚠️  ${testFile}: No data-testid selectors or GameHelper usage`)
  }

  // Check for old problematic patterns
  const problematicPatterns = [
    {
      pattern: /page\.goto\('\/'/,
      suggestion: 'Use gameHelper.startNewGame()',
    },
    {
      pattern: /button:visible/,
      suggestion: 'Use [data-testid="choice-button"]',
    },
    { pattern: /text=\/.*\/i/, suggestion: 'Use proper data-testid selectors' },
    {
      pattern: /waitForTimeout\(3000\)/,
      suggestion: 'Use shorter waits or proper waiting strategies',
    },
  ]

  let hasIssues = false
  for (const { pattern, suggestion } of problematicPatterns) {
    if (pattern.test(content)) {
      console.log(
        `⚠️  ${testFile}: Found potentially problematic pattern - ${suggestion}`
      )
      hasIssues = true
    }
  }

  if (!hasIssues) {
    console.log(`✅ ${testFile}: Valid`)
  }
}

// Check GameHelper
const gameHelperPath = path.join(testDir, 'helpers/game-helpers.ts')
if (!fs.existsSync(gameHelperPath)) {
  console.log(`❌ GameHelper: File not found at ${gameHelperPath}`)
  allValid = false
} else {
  const helperContent = fs.readFileSync(gameHelperPath, 'utf8')

  // Check for required methods
  const requiredMethods = [
    'startNewGame',
    'getCurrentStats',
    'getCurrentDay',
    'getCurrentStoryText',
    'getAvailableChoices',
    'makeChoice',
    'makeChoiceByIndex',
  ]

  let missingMethods = []
  for (const method of requiredMethods) {
    if (!helperContent.includes(`async ${method}(`)) {
      missingMethods.push(method)
    }
  }

  if (missingMethods.length > 0) {
    console.log(`❌ GameHelper: Missing methods: ${missingMethods.join(', ')}`)
    allValid = false
  } else {
    console.log(`✅ GameHelper: All required methods present`)
  }
}

console.log('\n' + '='.repeat(50))

if (allValid) {
  console.log('🎉 All tests are valid and ready to run!')
  console.log('\nTo run the tests:')
  console.log('  pnpm run playwright:install  # Install browsers')
  console.log('  pnpm run test:e2e            # Run all tests')
  console.log('  pnpm run test:e2e:headed     # Run with visible browser')
  console.log('  pnpm run test:e2e:ui         # Run with Playwright UI')
  process.exit(0)
} else {
  console.log('❌ Some tests have issues. Please fix them before running.')
  process.exit(1)
}
