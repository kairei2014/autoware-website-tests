// spec: specs/autoware-website-navigation.test-plan.md
import { test, expect } from '@playwright/test';
import { openAutowareRepoFromHome } from './helpers';

test.describe('GitHub Navigation Workflow', () => {
  test('README content is reachable and readable from the homepage flow', async ({ page }) => {
    const repoPage = await openAutowareRepoFromHome(page);

    const readmeBody = repoPage.locator('#readme .markdown-body, article.markdown-body').first();
    await expect(readmeBody).toBeVisible();

    await expect(readmeBody.locator('h1, h2, h3').first()).toBeVisible();
    await expect(readmeBody).toContainText(/autoware/i);
  });
});
