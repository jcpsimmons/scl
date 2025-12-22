import { expect, test } from '@playwright/test'
import { GameHelper } from './helpers/game-helpers'

test.describe('Simple Visual Regression Tests', () => {
  let gameHelper: GameHelper

  test.beforeEach(async ({ page }) => {
    gameHelper = new GameHelper(page)

    // Set consistent viewport for all visual tests
    await page.setViewportSize({ width: 1280, height: 800 })
  })

  test('intro modal visual state', async ({ page }) => {
    await page.goto('/')

    // Clear storage to ensure intro appears
    await page.evaluate(() => {
      localStorage.clear()
      try {
        indexedDB.deleteDatabase('autsim')
      } catch {
        // Ignore IndexedDB errors
      }
    })

    // Wait for intro modal
    await expect(page.locator('[data-testid="intro-modal"]')).toBeVisible()

    // Wait for page to be fully loaded and stable
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000) // Extra stability time

    // Take screenshot of just the intro modal area
    const introModal = page.locator('[data-testid="intro-modal"]')
    await expect(introModal).toHaveScreenshot('intro-modal.png', {
      threshold: 0.2, // Allow some variation for font rendering
    })
  })

  test('game container layout after starting', async ({ page }) => {
    await gameHelper.startNewGame()

    // Wait for game elements to be visible and stable
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()
    await expect(page.locator('[data-testid="stats-bar"]')).toBeVisible()

    // Wait for any animations to complete
    await page.waitForTimeout(1500)

    // Take screenshot of the stats bar only (most stable element)
    const statsBar = page.locator('[data-testid="stats-bar"]')
    await expect(statsBar).toHaveScreenshot('stats-bar.png', {
      threshold: 0.15,
    })
  })

  test('choice buttons visual consistency', async ({ page }) => {
    await gameHelper.startNewGame()

    // Wait for choices to appear
    const choiceButtons = page.locator('[data-testid="choice-button"]')
    await expect(choiceButtons.first()).toBeVisible()

    // Wait for stability
    await page.waitForTimeout(1000)

    // Take screenshot of just the first choice button
    await expect(choiceButtons.first()).toHaveScreenshot('choice-button.png', {
      threshold: 0.15,
    })
  })
})
