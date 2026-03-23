// spec: specs/autoware-website-navigation.plan.md
import { test, expect } from '@playwright/test';

test.describe('GitHub Navigation Workflow', () => {
  test('GitHub Repository Access', async ({ page }) => {
    // 1. Navigate directly to autowarefoundation org
    await page.goto('https://github.com/autowarefoundation');
    await expect(page).toHaveURL(/github\.com\/autowarefoundation/);

    // 2. Locate the Repositories tab
    const repoTab = page.locator('a:has-text("Repositories")').first();
    await expect(repoTab).toBeVisible();

    // 3. Click Repositories
    await repoTab.click();
    await expect(page).toHaveURL(/autowarefoundation.*repositories/);

    // 4. Find the autoware repository
    const autowareRepo = page.locator('a[href="/autowarefoundation/autoware"]').first();
    await expect(autowareRepo).toBeVisible();

    // 5. Click on the autoware repository
    await autowareRepo.click();
    await expect(page).toHaveURL(/github\.com\/autowarefoundation\/autoware/);
    await expect(page.locator('.markdown-body').first()).toBeVisible();
  });
});
