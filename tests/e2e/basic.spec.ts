import { expect, test } from '@playwright/test'
import { GameHelper } from './helpers/game-helpers'

test.describe('Basic Game Functionality', () => {
  let gameHelper: GameHelper

  test.beforeEach(async ({ page }) => {
    gameHelper = new GameHelper(page)
  })

  test('loads the game and shows initial screen', async ({ page }) => {
    await page.goto('/')

    // Check that the page loads
    await expect(page).toHaveTitle(/autism simulator/i)

    // Check for game container
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()

    // Check for stats bar
    await expect(page.locator('[data-testid="stats-bar"]')).toBeVisible()

    // Check for intro button (Press y to begin)
    await expect(page.locator('[data-testid="intro-close"]')).toBeVisible()
  })

  test('can start a new game', async ({ page }) => {
    // Use the gameHelper to ensure clean state
    await gameHelper.startNewGame()

    // Should show choice buttons after starting the game
    const choiceButtons = page.locator('[data-testid="choice-button"]')
    await expect(choiceButtons.first()).toBeVisible()

    // Should have exactly 2 choices
    const buttonCount = await choiceButtons.count()
    expect(buttonCount).toBe(2)

    // Check that the choices contain expected text
    const firstChoiceText = await choiceButtons.first().textContent()
    expect(firstChoiceText).toContain('self-care')
  })

  test('displays game stats', async ({ page }) => {
    await gameHelper.startNewGame()

    // Check all stat elements are visible and have values
    const energyStat = page.locator('[data-testid="stat-energy"]')
    const maskingStat = page.locator('[data-testid="stat-masking"]')
    const competenceStat = page.locator('[data-testid="stat-competence"]')
    const relationshipsStat = page.locator('[data-testid="stat-relationships"]')

    await expect(energyStat).toBeVisible()
    await expect(maskingStat).toBeVisible()
    await expect(competenceStat).toBeVisible()
    await expect(relationshipsStat).toBeVisible()

    // Check stats have numeric values
    const energyValue = await energyStat.textContent()
    const maskingValue = await maskingStat.textContent()
    const competenceValue = await competenceStat.textContent()
    const relationshipsValue = await relationshipsStat.textContent()

    expect(energyValue).toMatch(/\d+/)
    expect(maskingValue).toMatch(/\d+/)
    expect(competenceValue).toMatch(/\d+/)
    expect(relationshipsValue).toMatch(/\d+/)
  })

  test('displays story content and choices', async ({ page }) => {
    await gameHelper.startNewGame()

    // Check story content is visible
    const storyContent = page.locator('[data-testid="story-content"]')
    await expect(storyContent).toBeVisible()

    // Check choices are available
    const choiceButtons = page.locator('[data-testid="choice-button"]')
    const buttonCount = await choiceButtons.count()
    expect(buttonCount).toBeGreaterThan(0)

    // Check first choice contains expected text
    const firstChoiceText = await choiceButtons.first().textContent()
    expect(firstChoiceText).toContain('self-care')
  })

  test('can make a choice and progress the story', async ({ page }) => {
    await gameHelper.startNewGame()

    // Get initial story content
    const initialStoryContent = await page
      .locator('[data-testid="story-content"]')
      .textContent()

    // Make the first choice
    const firstChoice = page.locator('[data-testid="choice-button"]').first()
    await firstChoice.click()

    // Wait for story to update by checking for content change
    await page.waitForFunction(() => {
      const storyContent = document.querySelector(
        '[data-testid="story-content"]'
      )
      return (
        storyContent &&
        storyContent.textContent &&
        storyContent.textContent.trim().length > 0
      )
    })

    // Story should have changed
    const newStoryContent = await page
      .locator('[data-testid="story-content"]')
      .textContent()
    expect(newStoryContent).not.toBe(initialStoryContent)

    // Should still have choice buttons (game continues)
    const choiceButtons = page.locator('[data-testid="choice-button"]')
    const buttonCount = await choiceButtons.count()
    expect(buttonCount).toBeGreaterThan(0)
  })

  test('handles browser refresh gracefully', async ({ page }) => {
    await gameHelper.startNewGame()

    // Make a choice
    await page.locator('[data-testid="choice-button"]').first().click()
    // Wait for story to update
    try {
      await page.waitForFunction(() => {
        const storyContent = document.querySelector(
          '[data-testid="story-content"]'
        )
        return (
          storyContent &&
          storyContent.textContent &&
          storyContent.textContent.trim().length > 0
        )
      })
    } catch {
      // Continue even if story doesn't update
    }

    // Clear local storage to ensure fresh start after refresh
    await page.evaluate(() => {
      localStorage.clear()
      indexedDB.deleteDatabase('autsim')
    })

    // Refresh the page
    await page.reload()

    // Should still load properly and show initial state (since we cleared storage)
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()
    await expect(page.locator('[data-testid="intro-close"]')).toBeVisible()
  })

  test('page is responsive on different screen sizes', async ({ page }) => {
    // Test mobile size
    await page.setViewportSize({ width: 375, height: 667 })
    await gameHelper.startNewGame()
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()

    // Test tablet size
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()

    // Test desktop size
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('[data-testid="game-container"]')).toBeVisible()
  })
})
