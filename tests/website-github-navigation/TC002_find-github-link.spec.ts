// spec: specs/autoware-website-navigation.test-plan.md
import { test, expect } from '@playwright/test';
import { clickHomepageGitHubLink } from './helpers';

test.describe('GitHub Navigation Workflow', () => {
  test('Homepage GitHub CTA opens the Autoware Foundation organization', async ({ page }) => {
    const orgPage = await clickHomepageGitHubLink(page);

    await expect(orgPage).toHaveURL(/github\.com\/autowarefoundation\/?$/);
    await expect(orgPage.getByRole('link', { name: /repositories/i }).first()).toBeVisible();
  });
});
