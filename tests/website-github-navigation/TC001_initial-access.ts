// spec: specs/autoware-website-navigation.plan.md
import { test, expect } from '@playwright/test';

test.describe('Website Access and Navigation', () => {
  test('Initial Website Access', async ({ page }) => {
    // 1. Navigate to https://autoware.org/
    await page.goto('https://autoware.org/');
    await expect(page).toHaveURL(/autoware\.org/);
    await expect(page).toHaveTitle(/[Aa]utoware/);
    await expect(page.locator('nav, [role="navigation"]').first()).toBeVisible();

    // 2. Verify page content is fully rendered
    await expect(page.locator('main, [role="main"], body > div').first()).toBeVisible();

    // 3. Look for any tutorial window or modal that appears on page load
    const tutorialSelectors = ['.modal', '.tutorial', '.onboarding', '.intro', '.overlay', '.popup'];
    for (const selector of tutorialSelectors) {
      const el = page.locator(selector).first();
      if (await el.isVisible()) {
        const closeBtn = el.locator('button:has-text("Close"), button:has-text("Skip"), [aria-label*="close" i]').first();
        await expect(closeBtn).toBeVisible();
        break;
      }
    }
  });
});
