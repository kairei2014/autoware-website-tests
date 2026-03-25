import { expect, type Locator, type Page } from '@playwright/test';

export const AUTOWARE_HOME_URL = 'https://autoware.org/';

export async function gotoAutowareHome(page: Page) {
  const response = await page.goto(AUTOWARE_HOME_URL);
  expect(response?.ok()).toBeTruthy();

  await expect(page).toHaveURL(/autoware\.org\/?$/);
  await expect(page).toHaveTitle(/autoware/i);
  await expect(page.locator('main, [role="main"]').first()).toBeVisible();
}

export function getHomepageGitHubLink(page: Page): Locator {
  return page.getByRole('link', { name: /autoware on github/i }).first();
}

export async function expectGitHubOrgPage(page: Page): Promise<void> {
  await expect(page).toHaveURL(/github\.com\/autowarefoundation\/?$/);
  await expect(page.getByRole('link', { name: /repositories/i }).first()).toBeVisible();
}

export async function clickAndFollow(page: Page, locator: Locator): Promise<Page> {
  const popupPromise = page.waitForEvent('popup', { timeout: 5000 }).catch(() => null);

  await locator.click();

  const popup = await popupPromise;
  const destinationPage = popup ?? page;
  await destinationPage.waitForLoadState('domcontentloaded');

  return destinationPage;
}

export async function clickHomepageGitHubLink(page: Page): Promise<Page> {
  await gotoAutowareHome(page);

  const githubLink = getHomepageGitHubLink(page);
  await expect(githubLink).toBeVisible();
  await expect(githubLink).toHaveAttribute('href', /github\.com\/autowarefoundation/i);

  const orgPage = await clickAndFollow(page, githubLink);
  await expectGitHubOrgPage(orgPage);

  return orgPage;
}

export async function openGitHubOrgFromHome(page: Page): Promise<Page> {
  await gotoAutowareHome(page);

  const githubLink = getHomepageGitHubLink(page);
  await expect(githubLink).toBeVisible();
  await expect(githubLink).toHaveAttribute('href', /github\.com\/autowarefoundation/i);

  const href = await githubLink.getAttribute('href');
  expect(href).toBeTruthy();

  const response = await page.goto(href!);
  expect(response?.ok()).toBeTruthy();

  await expectGitHubOrgPage(page);

  return page;
}

export async function openAutowareRepoFromHome(page: Page): Promise<Page> {
  const orgPage = await openGitHubOrgFromHome(page);

  const repositoriesTab = orgPage.getByRole('link', { name: /repositories/i }).first();
  await expect(repositoriesTab).toBeVisible();
  await repositoriesTab.click();
  await expect(orgPage).toHaveURL(
    /github\.com\/(orgs\/autowarefoundation\/repositories|autowarefoundation\/?\?tab=repositories)$/,
  );

  const autowareRepoLink = orgPage.locator('a[href="/autowarefoundation/autoware"]').first();
  await expect(autowareRepoLink).toBeVisible();
  const repoHref = await autowareRepoLink.getAttribute('href');
  expect(repoHref).toBeTruthy();

  // GitHub's repositories view intermittently ignores the synthetic click even
  // though the anchor is visible. Follow the resolved href directly instead.
  const response = await orgPage.goto(`https://github.com${repoHref!}`);
  expect(response?.ok()).toBeTruthy();
  await expect(orgPage).toHaveURL(/github\.com\/autowarefoundation\/autoware\/?$/);

  return orgPage;
}
