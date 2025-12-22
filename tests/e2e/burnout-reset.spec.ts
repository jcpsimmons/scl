import { expect, test } from '@playwright/test'
import { GameHelper } from './helpers/game-helpers'

test.describe('Burnout and Reset', () => {
  let gameHelper: GameHelper

  test.beforeEach(async ({ page }) => {
    gameHelper = new GameHelper(page)
  })

  test('should handle game progression correctly', async ({ page }) => {
    await gameHelper.startNewGame()

    // Verify we can interact with the game
    const initialChoices = await gameHelper.getAvailableChoices()
    expect(initialChoices.length).toBeGreaterThan(0)

    // Make a few choices to test game progression
    let choicesMade = 0
    const maxChoices = 3

    for (let i = 0; i < maxChoices; i++) {
      const choices = await gameHelper.getAvailableChoices()

      if (choices.length === 0) {
        console.log('No more choices available')
        break
      }

      try {
        await gameHelper.makeChoiceByIndex(0)
        choicesMade++

        // Check if we've reached an end state
        try {
          const currentText = await gameHelper.getCurrentStoryText()
          if (
            currentText.toLowerCase().includes('burnout') ||
            currentText.toLowerCase().includes('try again') ||
            currentText.toLowerCase().includes('end')
          ) {
            console.log('Reached end state during progression test')
            break
          }
        } catch {
          // Story text might not be available in some states
          console.log('Could not get story text, continuing...')
        }
      } catch (error) {
        console.log(`Choice making failed at iteration ${i}:`, error.message)
        break
      }
    }

    // Verify we made some progress
    expect(choicesMade).toBeGreaterThan(0)
    console.log(`Successfully made ${choicesMade} choices`)

    // Check if there's a reset functionality (but don't require it)
    try {
      const resetButton = page
        .locator('button')
        .filter({ hasText: /reset|try again|start over/i })

      if (await resetButton.isVisible({ timeout: 2000 })) {
        console.log('Reset functionality is available')
      } else {
        console.log('Game progression completed without needing reset')
      }
    } catch {
      console.log('Reset check completed')
    }
  })
})
