# auto-website-tests

[English](README.md) | [日本語](README.ja.md)

![CI](https://github.com/haili-hub/autoware-website-tests/actions/workflows/ci-e2e-tests.yml/badge.svg)
[![Test Report](https://img.shields.io/badge/Test%20Report-GitHub%20Pages-blue)](https://haili-hub.github.io/autoware-website-tests/)

Playwright end-to-end tests for the [Autoware](https://autoware.org/) website navigation workflow, covering the journey from the homepage through to the GitHub repository README.

## Test coverage

| File | Test | Target |
| ---- | ---- | ------ |
| `tests/website-github-navigation/TC001_initial-access.spec.ts` | Initial Website Access | autoware.org |
| `tests/website-github-navigation/TC002_find-github-link.spec.ts` | Homepage GitHub CTA | autoware.org → github.com/autowarefoundation |
| `tests/website-github-navigation/TC003_repository-access.spec.ts` | Homepage to Repository Journey | autoware.org → github.com/autowarefoundation/autoware |
| `tests/website-github-navigation/TC004_readme-content.spec.ts` | README Content Verification | autoware.org → github.com/autowarefoundation/autoware#readme |

## Requirements

- Node.js (LTS)
- Chromium (installed via Playwright)
- Internet access to `autoware.org` and `github.com`

## Setup

```bash
npm ci
npx playwright install chromium
```

## Running tests

```bash
# Run all tests (HTML reporter)
npm test

# Run with UI mode
npm run test:ui

# Run with debug mode
npm run test:debug

# Open last HTML report
npm run test:report
```

## Allure reporting

```bash
# Run tests and collect Allure results
npm run test:allure

# Generate and open the Allure report
npm run allure:report
```

Results are written to `reports/allure-results/` and the generated report to `reports/allure-report/`.

## Configuration

`playwright.config.ts` configures Chromium-only execution, with the following timeouts to accommodate the `autoware.org` site load:

| Setting | Value |
| ------- | ----- |
| Test timeout | 60s |
| Navigation timeout | 60s |
| Action timeout | 30s |
| Retries (CI) | 2 |
| Workers (CI) | 1 |

The HTML reporter is used by default. Set `ALLURE=true` (via `npm run test:allure`) to switch to the Allure reporter. Traces are collected on first retry.

## CI

Tests run automatically on every push and pull request to `main`.

To trigger the workflow manually:

1. Go to **Actions** → **CI — E2E Tests** on GitHub.
2. Click **Run workflow** → **Run workflow**.

Or via the GitHub CLI:

```bash
gh workflow run ci-e2e-tests.yml --repo haili-hub/autoware-website-tests
```

The latest test report is published to [GitHub Pages](https://haili-hub.github.io/autoware-website-tests/) after each run.

## Test plan

The source test plan lives at `specs/autoware-website-navigation.test-plan.md`.

## Notes

- The automated suite verifies the public homepage-to-GitHub-to-README journey only.
- **Browser translation** (right-click › Translate to Japanese) is a browser-native feature and cannot be automated via Playwright. Translation quality is documented as a manual check in the test plan.
- `autoware.org` uses background polling that prevents `networkidle` from ever resolving; tests use the default `load` event instead.
- Dependencies such as `playwright-core` stay in the local `node_modules/` directory and are not committed to GitHub. After cloning, users should run `npm ci` and `npx playwright install chromium`.
