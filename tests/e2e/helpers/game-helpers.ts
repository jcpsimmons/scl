import { expect, Page } from '@playwright/test'

export interface GameStats {
  energy: number
  masking: number
  competence: number
  relationships: number
}

export interface ScreenshotOptions {
  fullPage?: boolean
  clip?: { x: number; y: number; width: number; height: number }
  omitBackground?: boolean
  animations?: 'disabled' | 'allow'
}

export interface GameState {
  day: number
  stats: GameStats
  currentStoryText: string
  availableChoices: string[]
}

/**
 * Helper class for interacting with the autism simulator game
 */
export class GameHelper {
  constructor(private page: Page) {}

  /**
   * Start a new game by dismissing intro and clicking "Begin the day"
   */
  async startNewGame(): Promise<void> {
    await this.page.goto('/')

    // Clear any existing storage to ensure fresh start
    await this.page.evaluate(() => {
      localStorage.clear()
      try {
        indexedDB.deleteDatabase('autsim')
      } catch {
        // IndexedDB operations can fail, ignore
      }
    })

    // Wait for the game to load with a more specific condition
    await this.page.waitForFunction(
      () => {
        const container = document.querySelector(
          '[data-testid="game-container"]'
        )
        const statsBar = document.querySelector('[data-testid="stats-bar"]')
        return container && statsBar && container.offsetHeight > 0
      },
      { timeout: 5000 }
    )

    // Check if intro button is visible and click it
    const introButton = this.page.locator('[data-testid="intro-close"]')
    if (await introButton.isVisible()) {
      // Use force click to bypass any pointer event interception
      await introButton.click({ force: true })

      // Wait for either story content or choice buttons to appear after clicking intro
      try {
        await this.page.waitForFunction(() => {
          const storyContent = document.querySelector(
            '[data-testid="story-content"]'
          )
          const choiceButtons = document.querySelectorAll(
            '[data-testid="choice-button"]'
          )
          return (
            (storyContent &&
              storyContent.textContent &&
              storyContent.textContent.trim().length > 0) ||
            choiceButtons.length > 0
          )
        })
      } catch {
        // If waitForFunction times out, check if we're still in intro state
        const stillInIntro = await this.page
          .locator('[data-testid="intro-modal"]')
          .isVisible()
        if (stillInIntro) {
          // Still in intro state after clicking, continuing...
        } else {
          // Game state unclear after clicking, continuing...
        }
      }
    }
  }

  /**
   * Get current game stats from the stats bar
   */
  async getCurrentStats(): Promise<GameStats> {
    const statsBar = this.page.locator('[data-testid="stats-bar"]')
    await expect(statsBar).toBeVisible()

    // Extract stats values - assuming they're displayed as text or data attributes
    const energy = await this.getStatValue('energy')
    const masking = await this.getStatValue('masking')
    const competence = await this.getStatValue('competence')
    const relationships = await this.getStatValue('relationships')

    return { energy, masking, competence, relationships }
  }

  private async getStatValue(statName: string): Promise<number> {
    try {
      const statElement = this.page.locator(`[data-testid="stat-${statName}"]`)
      const text = await statElement.textContent({ timeout: 5000 })
      const match = text?.match(/\d+/)
      return match ? parseInt(match[0], 10) : 0
    } catch {
      console.log(`Failed to get ${statName} stat value, returning 0`)
      return 0
    }
  }

  /**
   * Get current day number
   */
  async getCurrentDay(): Promise<number> {
    const storyContent = this.page.locator('[data-testid="story-content"]')
    const dayText = await storyContent.textContent()
    const match = dayText?.match(/Day (\d+)/)
    return match ? parseInt(match[1], 10) : 1
  }

  /**
   * Get current story text content
   */
  async getCurrentStoryText(): Promise<string> {
    // Wait for either story content or choices to be visible
    // Sometimes story content might not be present if there are only choices
    try {
      const storyContainer = this.page.locator('[data-testid="story-content"]')
      await expect(storyContainer).toBeVisible({ timeout: 3000 })
      return (await storyContainer.textContent()) || ''
    } catch {
      // If story content is not visible, check if we're in a choice-only state
      const choiceButtons = this.page.locator('[data-testid="choice-button"]')
      const choiceCount = await choiceButtons.count()
      if (choiceCount > 0) {
        // Return empty string if we have choices but no story text
        return ''
      }
      // Re-throw the error if neither story content nor choices are present
      throw new Error('Neither story content nor choice buttons are visible')
    }
  }

  /**
   * Get all available choices (extract just the text part, not the numbers)
   */
  async getAvailableChoices(): Promise<string[]> {
    const choices = this.page.locator('[data-testid="choice-button"]')

    // Wait for choices to be available with a reasonable timeout
    try {
      await expect(choices.first()).toBeVisible({ timeout: 5000 })
    } catch {
      // No choices available
      return []
    }

    const count = await choices.count()
    const choiceTexts: string[] = []

    for (let i = 0; i < count; i++) {
      try {
        const text = await choices.nth(i).textContent({ timeout: 2000 })
        if (text) {
          // Remove the leading number and extract just the choice text
          const cleanText = text.replace(/^\d+\s*/, '').trim()
          choiceTexts.push(cleanText)
        }
      } catch {
        // Skip if we can't get text from this choice
        console.log(`Failed to get text from choice ${i}`)
      }
    }

    return choiceTexts
  }

  /**
   * Make a choice by clicking on the choice button with matching text
   */
  async makeChoice(choiceText: string): Promise<void> {
    // Choice buttons contain both number and text, so we need to be flexible
    const choiceButton = this.page
      .locator('[data-testid="choice-button"]')
      .filter({ hasText: choiceText })
    await expect(choiceButton).toBeVisible()
    await choiceButton.click()

    // Wait for the UI to update - either new story content or new choices
    await this.page.waitForFunction(
      clickedText => {
        const storyContent = document.querySelector(
          '[data-testid="story-content"]'
        )
        const choiceButtons = document.querySelectorAll(
          '[data-testid="choice-button"]'
        )

        // Check if story content is present and has text
        const hasStoryContent =
          storyContent &&
          storyContent.textContent &&
          storyContent.textContent.trim().length > 0

        // Check if we have new choices (different from the one we clicked)
        const hasNewChoices =
          choiceButtons.length > 0 &&
          !Array.from(choiceButtons).some(
            btn => btn.textContent && btn.textContent.includes(clickedText)
          )

        return hasStoryContent || hasNewChoices
      },
      choiceText,
      { timeout: 3000 }
    )
  }

  /**
   * Make a choice by index (0-based)
   */
  async makeChoiceByIndex(index: number): Promise<void> {
    const choices = this.page.locator('[data-testid="choice-button"]')

    // Wait for the specific choice to be visible
    try {
      await expect(choices.nth(index)).toBeVisible({ timeout: 5000 })
    } catch {
      throw new Error(`Choice at index ${index} is not visible`)
    }

    // Store the current choice text for verification (with timeout)
    let choiceText = ''
    try {
      choiceText =
        (await choices.nth(index).textContent({ timeout: 2000 })) || ''
    } catch {
      console.log(`Could not get text from choice ${index}, proceeding anyway`)
    }

    await choices.nth(index).click()

    // Wait for the UI to update - either new story content or new choices
    try {
      await this.page.waitForFunction(
        clickedText => {
          const storyContent = document.querySelector(
            '[data-testid="story-content"]'
          )
          const choiceButtons = document.querySelectorAll(
            '[data-testid="choice-button"]'
          )

          // Check if story content is present and has text
          const hasStoryContent =
            storyContent &&
            storyContent.textContent &&
            storyContent.textContent.trim().length > 0

          // Check if we have new choices (different from the one we clicked)
          const hasNewChoices =
            choiceButtons.length > 0 &&
            Array.from(choiceButtons).some(
              btn => btn.textContent !== clickedText
            )

          return hasStoryContent || hasNewChoices
        },
        choiceText,
        { timeout: 3000 }
      )
    } catch {
      // UI update might not happen immediately, continue anyway
      console.log('UI did not update as expected after choice, continuing...')
    }
  }

  /**
   * Get current game state
   */
  async getCurrentState(): Promise<GameState> {
    const [day, stats, storyText, choices] = await Promise.all([
      this.getCurrentDay(),
      this.getCurrentStats(),
      this.getCurrentStoryText(),
      this.getAvailableChoices(),
    ])

    return {
      day,
      stats,
      currentStoryText: storyText,
      availableChoices: choices,
    }
  }

  /**
   * Play through a full day making specific choices
   */
  async playDay(choices: (string | number)[]): Promise<GameState> {
    let currentState = await this.getCurrentState()

    for (const choice of choices) {
      const availableChoices = await this.getAvailableChoices()

      if (availableChoices.length === 0) {
        break // No more choices, day might be over
      }

      if (typeof choice === 'string') {
        await this.makeChoice(choice)
      } else {
        await this.makeChoiceByIndex(choice)
      }

      // Wait for new state by checking if story content has updated
      await this.page.waitForFunction(() => {
        const storyContent = document.querySelector(
          '[data-testid="story-content"]'
        )
        return (
          storyContent &&
          storyContent.textContent &&
          storyContent.textContent.length > 0
        )
      })
      currentState = await this.getCurrentState()
    }

    return currentState
  }

  /**
   * Continue playing until no more choices are available or max iterations reached
   */
  async playUntilEnd(maxIterations: number = 50): Promise<GameState> {
    let iterations = 0

    while (iterations < maxIterations) {
      const choices = await this.getAvailableChoices()

      if (choices.length === 0) {
        break
      }

      // Make the first available choice
      await this.makeChoiceByIndex(0)
      iterations++
    }

    return await this.getCurrentState()
  }

  /**
   * Wait for a specific condition in the game state
   */
  async waitForCondition(
    condition: (state: GameState) => boolean,
    timeout: number = 5000
  ): Promise<GameState> {
    const startTime = Date.now()

    while (Date.now() - startTime < timeout) {
      const state = await this.getCurrentState()
      if (condition(state)) {
        return state
      }
      // Wait for a short time to allow state to settle
      await this.page.waitForFunction(
        () => {
          const storyContent = document.querySelector(
            '[data-testid="story-content"]'
          )
          return (
            storyContent &&
            storyContent.textContent &&
            storyContent.textContent.length > 0
          )
        },
        { timeout: 200 }
      )
    }

    throw new Error(`Condition not met within ${timeout}ms`)
  }

  /**
   * Save the current game state
   */
  async saveGame(): Promise<void> {
    // Look for save functionality - might be in a menu or settings
    const saveButton = this.page.locator('[data-testid="save-button"]')
    if (await saveButton.isVisible()) {
      await saveButton.click()
    }
  }

  /**
   * Reset the game to initial state
   */
  async resetGame(): Promise<void> {
    // Look for reset functionality
    const resetButton = this.page.locator('[data-testid="reset-button"]')
    if (await resetButton.isVisible()) {
      await resetButton.click()
      // Wait for reset to complete by checking for initial state
      await this.page.waitForSelector('[data-testid="intro-close"]', {
        timeout: 2000,
      })
    } else {
      // If no reset button, reload the page
      await this.page.reload()
      await this.startNewGame()
    }
  }

  /**
   * Prepare page for consistent screenshot capture
   */
  async prepareForScreenshot(): Promise<void> {
    // Disable CSS animations and transitions for consistent screenshots
    await this.page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-delay: -1ms !important;
          animation-duration: 1ms !important;
          animation-iteration-count: 1 !important;
          background-attachment: initial !important;
          scroll-behavior: auto !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    })

    // Wait for any pending network requests or rendering
    await this.page.waitForLoadState('networkidle')

    // Give the page a moment to settle after style changes
    await this.page.waitForTimeout(500)
  }

  /**
   * Wait for visual stability (useful before taking screenshots)
   */
  async waitForVisualStability(timeout: number = 3000): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const gameContainer = document.querySelector(
          '[data-testid="game-container"]'
        )
        const statsBar = document.querySelector('[data-testid="stats-bar"]')
        const crtImages = document.querySelectorAll('canvas')

        // Check that key visual elements are present and have content
        return (
          gameContainer &&
          gameContainer.offsetHeight > 0 &&
          statsBar &&
          statsBar.offsetHeight > 0 &&
          crtImages.length > 0
        )
      },
      { timeout }
    )
  }

  /**
   * Take a screenshot of the entire game area
   */
  async takeGameScreenshot(
    name?: string,
    options: ScreenshotOptions = {}
  ): Promise<void> {
    await this.prepareForScreenshot()
    await this.waitForVisualStability()

    const screenshotOptions = {
      fullPage: options.fullPage ?? false,
      animations: 'disabled' as const,
      ...options,
    }

    if (name) {
      await expect(this.page).toHaveScreenshot(`${name}.png`, screenshotOptions)
    } else {
      await expect(this.page).toHaveScreenshot(screenshotOptions)
    }
  }

  /**
   * Take a screenshot of just the stats bar
   */
  async takeStatsBarScreenshot(name?: string): Promise<void> {
    await this.prepareForScreenshot()
    const statsBar = this.page.locator('[data-testid="stats-bar"]')
    await expect(statsBar).toBeVisible()

    if (name) {
      await expect(statsBar).toHaveScreenshot(`stats-bar-${name}.png`)
    } else {
      await expect(statsBar).toHaveScreenshot()
    }
  }

  /**
   * Take a screenshot of the story content area
   */
  async takeStoryContentScreenshot(name?: string): Promise<void> {
    await this.prepareForScreenshot()
    const storySection = this.page.locator('section').first()
    await expect(storySection).toBeVisible()

    if (name) {
      await expect(storySection).toHaveScreenshot(`story-content-${name}.png`)
    } else {
      await expect(storySection).toHaveScreenshot()
    }
  }

  /**
   * Take a screenshot of the CRT image area
   */
  async takeCRTImageScreenshot(name?: string): Promise<void> {
    await this.prepareForScreenshot()

    // Wait for CRT image to load
    await this.page.waitForFunction(
      () => {
        const canvases = document.querySelectorAll('canvas')
        return (
          canvases.length > 0 &&
          Array.from(canvases).some(canvas => canvas.width > 0)
        )
      },
      { timeout: 5000 }
    )

    const imageContainer = this.page
      .locator('div')
      .filter({ has: this.page.locator('canvas') })
      .first()
    await expect(imageContainer).toBeVisible()

    if (name) {
      await expect(imageContainer).toHaveScreenshot(`crt-image-${name}.png`)
    } else {
      await expect(imageContainer).toHaveScreenshot()
    }
  }

  /**
   * Navigate to a specific story state and prepare for screenshot
   */
  async navigateToStoryState(storyPath: string): Promise<void> {
    await this.page.goto('/')

    // Clear storage to ensure clean state
    await this.page.evaluate(() => {
      localStorage.clear()
      try {
        indexedDB.deleteDatabase('autsim')
      } catch {
        // Ignore errors
      }
    })

    // Start the game and navigate to specific path via narrative system
    await this.startNewGame()

    // Use the narrative system to jump to specific content
    await this.page.evaluate(path => {
      const narrative = (
        window as { narrative: { goto: (path: string) => void } }
      ).narrative
      if (narrative && narrative.goto) {
        narrative.goto(path)
      }
    }, storyPath)

    await this.waitForVisualStability()
  }
}

/**
 * Common test scenarios and paths through the game
 */
export const GameScenarios = {
  /**
   * Self-care focused path through the morning
   */
  SELF_CARE_MORNING: [
    'Take time for self-care this morning',
    'Do some light stretching and breathing exercises',
  ],

  /**
   * Rushed morning path
   */
  RUSHED_MORNING: ['Get straight to breakfast and work prep'],

  /**
   * High energy choices to maximize stats
   */
  HIGH_ENERGY_CHOICES: [
    'Take time for self-care this morning',
    'Listen to a favorite song while getting ready',
    'Take your medication as prescribed',
  ],

  /**
   * Stress-inducing choices that should lower stats
   */
  STRESS_INDUCING_CHOICES: [
    'Get straight to breakfast and work prep',
    'Skip medication today to avoid side effects',
    'Answer everything immediately', // For Slack flood scenario
  ],
}

/**
 * Assert that stats have changed in expected direction
 */
export async function assertStatsChanged(
  beforeStats: GameStats,
  afterStats: GameStats,
  expectedChanges: Partial<GameStats>
): Promise<void> {
  if (expectedChanges.energy !== undefined) {
    if (expectedChanges.energy > 0) {
      expect(afterStats.energy).toBeGreaterThan(beforeStats.energy)
    } else if (expectedChanges.energy < 0) {
      expect(afterStats.energy).toBeLessThan(beforeStats.energy)
    }
  }

  if (expectedChanges.masking !== undefined) {
    if (expectedChanges.masking > 0) {
      expect(afterStats.masking).toBeGreaterThan(beforeStats.masking)
    } else if (expectedChanges.masking < 0) {
      expect(afterStats.masking).toBeLessThan(beforeStats.masking)
    }
  }

  if (expectedChanges.competence !== undefined) {
    if (expectedChanges.competence > 0) {
      expect(afterStats.competence).toBeGreaterThan(beforeStats.competence)
    } else if (expectedChanges.competence < 0) {
      expect(afterStats.competence).toBeLessThan(beforeStats.competence)
    }
  }

  if (expectedChanges.relationships !== undefined) {
    if (expectedChanges.relationships > 0) {
      expect(afterStats.relationships).toBeGreaterThan(
        beforeStats.relationships
      )
    } else if (expectedChanges.relationships < 0) {
      expect(afterStats.relationships).toBeLessThan(beforeStats.relationships)
    }
  }
}
