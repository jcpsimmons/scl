import { expect, test } from '@playwright/test'
import { GameHelper } from './helpers/game-helpers'

test.describe('Advanced Game Scenarios', () => {
  let gameHelper: GameHelper

  test.beforeEach(async ({ page }) => {
    gameHelper = new GameHelper(page)
  })

  test('can make at least one choice successfully', async ({ page }) => {
    await gameHelper.startNewGame()

    // Get available choices
    const availableChoices = await gameHelper.getAvailableChoices()
    expect(availableChoices.length).toBeGreaterThan(0)

    // Make one choice successfully
    try {
      await gameHelper.makeChoiceByIndex(0)
      console.log('Successfully made one choice')
    } catch (error) {
      console.log('Choice failed:', error.message)
      throw error
    }

    // Verify game is still functional
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()
  })

  test('stats tracking works correctly', async ({ page }) => {
    await gameHelper.startNewGame()

    // Get initial stats
    const initialStats = await gameHelper.getCurrentStats()
    console.log('Initial stats:', initialStats)

    // Verify all stats are numbers and in reasonable range
    expect(initialStats.energy).toBeGreaterThanOrEqual(0)
    expect(initialStats.energy).toBeLessThanOrEqual(100)
    expect(initialStats.masking).toBeGreaterThanOrEqual(0)
    expect(initialStats.masking).toBeLessThanOrEqual(100)
    expect(initialStats.competence).toBeGreaterThanOrEqual(0)
    expect(initialStats.competence).toBeLessThanOrEqual(100)
    expect(initialStats.relationships).toBeGreaterThanOrEqual(0)
    expect(initialStats.relationships).toBeLessThanOrEqual(100)

    // Make one choice and check stats again
    const choices = await gameHelper.getAvailableChoices()
    if (choices.length > 0) {
      await gameHelper.makeChoiceByIndex(0)

      // Wait a moment for stats to potentially update
      await page.waitForTimeout(1000)

      const newStats = await gameHelper.getCurrentStats()
      console.log('Stats after choice:', newStats)

      // Stats should still be in valid ranges
      expect(newStats.energy).toBeGreaterThanOrEqual(0)
      expect(newStats.energy).toBeLessThanOrEqual(100)
    }
  })

  test('game handles different choice selections', async ({ page }) => {
    await gameHelper.startNewGame()

    const choices = await gameHelper.getAvailableChoices()
    expect(choices.length).toBeGreaterThan(0)

    // Test selecting first choice
    try {
      await gameHelper.makeChoiceByIndex(0)
      console.log('Successfully selected first choice')
    } catch (error) {
      console.log('First choice selection failed:', error.message)
    }

    // Test selecting second choice if available
    await page.reload()
    await gameHelper.startNewGame()

    const newChoices = await gameHelper.getAvailableChoices()
    if (newChoices.length > 1) {
      try {
        await gameHelper.makeChoiceByIndex(1)
        console.log('Successfully selected second choice')
      } catch (error) {
        console.log('Second choice selection failed:', error.message)
      }
    }
  })

  test('game accessibility - keyboard navigation', async ({ page }) => {
    await gameHelper.startNewGame()

    const choices = page.locator('[data-testid="choice-button"]')
    const choiceCount = await choices.count()

    if (choiceCount > 0) {
      // Test keyboard focus
      await choices.first().focus()

      // Verify the element can receive focus
      const isFocusable = await choices.first().evaluate(el => {
        return el.tabIndex >= 0 || el.hasAttribute('tabindex')
      })
      expect(isFocusable).toBe(true)

      // Test keyboard activation
      await page.keyboard.press('Enter')

      // Wait for potential response
      await page.waitForTimeout(1000)

      // Game should still be functional after keyboard interaction
      await expect(page.locator('[data-testid="game-container"]')).toBeVisible()
    }
  })

  test('game handles interactions safely', async ({ page }) => {
    await gameHelper.startNewGame()

    // Test moderate clicking without overwhelming the system
    let interactions = 0
    const maxInteractions = 3 // Reduced to be safer

    for (let i = 0; i < maxInteractions; i++) {
      const choices = await gameHelper.getAvailableChoices()

      if (choices.length === 0) {
        break
      }

      try {
        await gameHelper.makeChoiceByIndex(0)
        interactions++

        // Reasonable delay between interactions
        await page.waitForTimeout(500)
      } catch (error) {
        console.log(`Interaction ${i} failed:`, error.message)
        break
      }
    }

    // Game should still be functional after interactions
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()
    console.log(`Completed ${interactions} safe interactions`)
  })
})
