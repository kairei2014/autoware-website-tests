// spec: specs/autoware-website-navigation.test-plan.md
import { test, expect } from '@playwright/test';
import { openAutowareRepoFromHome } from './helpers';

test.describe('GitHub Navigation Workflow', () => {
  test('Homepage workflow reaches the Autoware repository', async ({ page }) => {
    const repoPage = await openAutowareRepoFromHome(page);

    await expect(repoPage).toHaveURL(/github\.com\/autowarefoundation\/autoware\/?$/);
    await expect(repoPage.locator('#readme, article.markdown-body').first()).toBeVisible();
  });
});
