// spec: specs/autoware-website-navigation.test-plan.md
import { test, expect } from '@playwright/test';
import { AUTOWARE_GITHUB_ORG_URL, clickHomepageGitHubLink } from './helpers';

test.describe('GitHub Navigation Workflow', () => {
  test('Homepage GitHub CTA opens the Autoware Foundation organization', async ({ page }) => {
    const orgPage = await clickHomepageGitHubLink(page);

    await expect(orgPage).toHaveURL(new RegExp(`${AUTOWARE_GITHUB_ORG_URL}/?$`));
    await expect(orgPage.getByRole('link', { name: /repositories/i }).first()).toBeVisible();
  });
});
