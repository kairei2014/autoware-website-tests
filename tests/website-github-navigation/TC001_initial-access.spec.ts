// spec: specs/autoware-website-navigation.test-plan.md
import { test, expect } from '@playwright/test';
import { getHomepageGitHubLink, gotoAutowareHome } from './helpers';

test.describe('Website Access and Navigation', () => {
  test('Initial Website Access', async ({ page }) => {
    await gotoAutowareHome(page);
    await expect(page.locator('nav, [role="navigation"]').first()).toBeVisible();

    const githubLink = getHomepageGitHubLink(page);
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', /github\.com\/autowarefoundation/i);
  });
});
