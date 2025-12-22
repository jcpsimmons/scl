import { expect, test } from '@playwright/test'
import { GameHelper } from './helpers/game-helpers'

test.describe('Essential Failure Scenarios', () => {
  let gameHelper: GameHelper

  test.beforeEach(async ({ page }) => {
    gameHelper = new GameHelper(page)
  })

  test('handles basic network interruption', async ({ page }) => {
    await gameHelper.startNewGame()

    // Make a choice to verify game is working
    const choices = await gameHelper.getAvailableChoices()
    if (choices.length > 0) {
      await gameHelper.makeChoiceByIndex(0)
    }

    // Simulate network going offline
    await page.context().setOffline(true)

    // Game should still display content (since it's client-side)
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()

    // Restore network
    await page.context().setOffline(false)

    // Game should still be functional
    await expect(page.locator('[data-testid="stats-bar"]')).toBeVisible()
  })

  test('survives JavaScript errors', async ({ page }) => {
    const jsErrors: string[] = []

    // Capture JavaScript errors
    page.on('pageerror', error => {
      jsErrors.push(error.message)
    })

    await gameHelper.startNewGame()

    // Try to cause a minor JavaScript error that shouldn't break the game
    await page.evaluate(() => {
      try {
        // Try to access a non-existent property (shouldn't break the game)
        console.log(window.nonExistentProperty?.someMethod?.())
      } catch {
        // Intentionally catch and ignore
      }
    })

    // Game should still be functional after potential JS errors
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()
    await expect(page.locator('[data-testid="stats-bar"]')).toBeVisible()
  })

  test('handles page refresh gracefully', async ({ page }) => {
    await gameHelper.startNewGame()

    // Make a choice
    const initialChoices = await gameHelper.getAvailableChoices()
    if (initialChoices.length > 0) {
      await gameHelper.makeChoiceByIndex(0)
    }

    // Refresh the page
    await page.reload()

    // Game should load properly again
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()
    await expect(page.locator('[data-testid="stats-bar"]')).toBeVisible()
  })

  test('handles corrupted storage gracefully', async ({ page }) => {
    await gameHelper.startNewGame()

    // Corrupt localStorage
    await page.evaluate(() => {
      try {
        localStorage.setItem('gameState', 'invalid-json-data')
        localStorage.setItem('autismSimulatorState', '{broken json')
      } catch {
        // Storage might be disabled
      }
    })

    // Refresh to trigger storage loading
    await page.reload()

    // Game should handle corrupted storage and still load
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()
    await expect(page.locator('[data-testid="stats-bar"]')).toBeVisible()
  })

  test('responsive on different viewport sizes', async ({ page }) => {
    // Test mobile size
    await page.setViewportSize({ width: 375, height: 667 })
    await gameHelper.startNewGame()
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()

    // Test tablet size
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()

    // Test desktop size
    await page.setViewportSize({ width: 1200, height: 800 })
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()
  })
})
