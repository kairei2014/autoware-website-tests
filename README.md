# autoware-website-tests

[English](README.md) | [日本語](README.ja.md)

![CI](https://github.com/haili-hub/autoware-website-tests/actions/workflows/ci-e2e-tests.yml/badge.svg)
[![Test Report](https://img.shields.io/badge/Test%20Report-GitHub%20Pages-blue)](https://haili-hub.github.io/autoware-website-tests/)

## Summary

Playwright end-to-end tests for the [Autoware](https://autoware.org/) website navigation workflow, covering the journey from the homepage through to the GitHub repository README.

## Requirements

- Node.js (LTS)
- Chromium (installed via Playwright)
- Internet access to `autoware.org` and `github.com`

## Test plan

The source test plan lives at `specs/autoware-website-navigation.test-plan.md`.

## Test coverage

| File | Test | Target |
| ---- | ---- | ------ |
| `TC001_initial-access.ts` | Initial Website Access | autoware.org |
| `TC002_find-github-link.ts` | Homepage GitHub CTA | autoware.org → github.com/autowarefoundation |
| `TC003_repository-access.ts` | Homepage to Repository Journey | autoware.org → github.com/autowarefoundation/autoware |
| `TC004_readme-content.ts` | README Content Verification | autoware.org → github.com/autowarefoundation/autoware#readme |

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

`playwright.config.ts` configures execution across Chromium, Firefox and WebKit (Safari), with the following timeouts to accommodate the `autoware.org` site load:

| Setting | Value |
| ------- | ----- |
| Test timeout | 60s |
| Navigation timeout | 60s |
| Action timeout | 30s |
| Retries (CI) | 2 |
| Workers | 1 |
| Parallel | off |

The HTML reporter is used by default. Set `ALLURE=true` (via `npm run test:allure`) to switch to the Allure reporter. Traces are collected on first retry. Single-worker serial execution reduces flake against live third-party sites.

## CI

Every commit pushed to `main` automatically triggers the CI workflow — no separate step needed. Tests also run on pull requests to `main`.

After a push to `main`, the workflow proceeds in this order:

1. `git push origin main` starts **CI — E2E Tests**.
2. The `test` job runs the Playwright suite on GitHub Actions.
3. The `deploy` job runs after `test` and publishes the latest HTML report to GitHub Pages.

To trigger the workflow manually without a new commit:

1. Go to **Actions** → **CI — E2E Tests** on GitHub.
2. Click **Run workflow** → **Run workflow**.

Or via the GitHub CLI:

```bash
gh workflow run ci-e2e-tests.yml --repo <your-username>/autoware-website-tests
```

The latest test report is published to GitHub Pages after each CI run on `main`.

## Using this project with your own account

1. **Fork** this repository on GitHub.

2. **Enable GitHub Pages** in your fork:
   **Settings → Pages → Source → GitHub Actions**

3. **Update the badge URLs** in `README.md` and `README.ja.md` — replace `haili-hub` with your GitHub username in the CI badge and Test Report badge lines at the top of each file.

4. **Trigger the first run** by pushing any commit to `main`, or manually via GitHub CLI:

   ```bash
   gh workflow run ci-e2e-tests.yml --repo <your-username>/autoware-website-tests
   ```

After the first run the CI badge resolves and the test report is live at `https://<your-username>.github.io/autoware-website-tests/`.

## Notes

- The automated suite verifies the public homepage-to-GitHub-to-README journey only.
- In sandboxed macOS AI-agent sessions, Chromium can fail before launch with a Mach port permission error. Treat that as an execution-environment issue; run the suite in CI or a non-sandboxed local session instead.
- `autoware.org` uses background polling that prevents `networkidle` from ever resolving; tests use the default `load` event instead.
- For third-party pages such as GitHub, prefer validating the anchor `href` and navigating directly when the requirement is destination reachability. Use `click()` only when the click interaction itself is what the test must verify.
- Dependencies such as `playwright-core` stay in the local `node_modules/` directory and are not committed to GitHub. After cloning, users should run `npm ci` and `npx playwright install chromium`.
