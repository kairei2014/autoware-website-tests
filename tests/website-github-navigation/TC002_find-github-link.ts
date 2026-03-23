// spec: specs/autoware-website-navigation.plan.md
import { test, expect } from '@playwright/test';

test.describe('GitHub Navigation Workflow', () => {
  test('Find and Access GitHub Link', async ({ page }) => {
    await page.goto('https://autoware.org/');

    // 1. Search for GitHub link on the page
    const githubLink = page.locator('a[href*="github.com"]').first();

    // 2. Scroll to find it if not immediately visible
    await githubLink.scrollIntoViewIfNeeded();
    await expect(githubLink).toBeVisible();

    // 3. Verify it points to GitHub
    const href = await githubLink.getAttribute('href');
    expect(href).toContain('github.com');

    // 4. Click the GitHub link
    await githubLink.click();
    await expect(page).toHaveURL(/github\.com/);
  });
});
