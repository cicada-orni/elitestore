// tests/visual.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Visual Regression: Button Component', () => {
  test('should match the primary button snapshot', async ({ page }) => {
    // Storybook must be running for this test to pass locally
    await page.goto('http://localhost:6006/?path=/story/atoms-button--primary')

    // The component is rendered inside an iframe in Storybook
    const buttonLocator = page
      .frameLocator('#storybook-preview-iframe')
      .getByRole('button', { name: 'Primary Button' })

    // We wait for the button to be visible before taking a screenshot
    await expect(buttonLocator).toBeVisible()

    // Take a screenshot and compare it to the baseline
    await expect(page).toHaveScreenshot('button-primary.png', {
      maxDiffPixels: 100, // Allow for minor anti-aliasing differences
    })
  })
})
