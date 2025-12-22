import { expect, test } from '@playwright/test'
import { GameHelper } from './helpers/game-helpers'

test.describe('Mobile UI', () => {
  let gameHelper: GameHelper

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 640 })
    gameHelper = new GameHelper(page)
  })

  test('shows about modal with scrollable content on mobile screens', async ({
    page,
  }) => {
    await gameHelper.startNewGame()

    await page.getByRole('button', { name: 'About' }).click()

    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()

    const viewport = page.viewportSize()
    if (!viewport) {
      throw new Error('Viewport size is not available')
    }

    const modalBox = await modal.boundingBox()
    if (!modalBox) {
      throw new Error('Modal bounding box is not available')
    }

    expect(modalBox.width).toBeLessThanOrEqual(viewport.width)
    expect(modalBox.height).toBeLessThanOrEqual(viewport.height)
    expect(modalBox.x).toBeGreaterThanOrEqual(0)
    expect(modalBox.y).toBeGreaterThanOrEqual(0)
    expect(modalBox.y + modalBox.height).toBeLessThanOrEqual(viewport.height)

    const content = modal.locator('.p-4.bg-white')
    await expect(content).toBeVisible()

    const scrollState = await content.evaluate<{
      hasOverflow: boolean
      canScroll: boolean
    }>(node => {
      const element = node as HTMLElement
      const hasOverflow = element.scrollHeight > element.clientHeight
      if (!hasOverflow) {
        return { hasOverflow, canScroll: true }
      }
      const initialScrollTop = element.scrollTop
      element.scrollTop = element.scrollHeight
      const afterScrollTop = element.scrollTop
      element.scrollTop = initialScrollTop
      return {
        hasOverflow,
        canScroll: afterScrollTop > initialScrollTop,
      }
    })

    expect(scrollState.canScroll).toBe(true)
  })

  test('renders random popup fully within the mobile viewport', async ({
    page,
  }) => {
    await gameHelper.startNewGame()

    await page.keyboard.press('KeyD')

    const triggerPopupButton = page.getByRole('button', {
      name: /trigger popup/i,
    })
    await expect(triggerPopupButton).toBeVisible()
    await triggerPopupButton.click()

    const countdown = page.getByText(/ADHD INTERRUPTION/)
    await expect(countdown).toBeVisible()

    const iframe = page.locator(
      'iframe[title="Random Interruption - Random Site"]'
    )
    await expect(iframe).toBeVisible()

    const popupWindow = iframe.locator('xpath=..')

    const viewport = page.viewportSize()
    if (!viewport) {
      throw new Error('Viewport size is not available')
    }

    const popupBox = await popupWindow.boundingBox()
    if (!popupBox) {
      throw new Error('Popup bounding box is not available')
    }

    expect(popupBox.width).toBeLessThanOrEqual(viewport.width)
    expect(popupBox.height).toBeLessThanOrEqual(viewport.height)
    expect(popupBox.x).toBeGreaterThanOrEqual(0)
    expect(popupBox.y).toBeGreaterThanOrEqual(0)
    expect(popupBox.y + popupBox.height).toBeLessThanOrEqual(viewport.height)
  })
})
