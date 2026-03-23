// spec: specs/autoware-website-navigation.plan.md
import { test, expect } from '@playwright/test';

test.describe('GitHub Navigation Workflow', () => {
  test('README Access', async ({ page }) => {
    // 1. Navigate to the autoware repository
    await page.goto('https://github.com/autowarefoundation/autoware');

    // 2. Locate and scroll to the README content
    const readmeBody = page.locator('.markdown-body').first();
    await readmeBody.scrollIntoViewIfNeeded();
    await expect(readmeBody).toBeVisible();

    // 3. Verify README content is present and structured
    await expect(readmeBody.locator('h1, h2, h3').first()).toBeVisible();

    // Note: Browser-native translation (right-click > Translate to Japanese) is not
    // automatable via Playwright. Translation quality requires manual verification.
  });
});
