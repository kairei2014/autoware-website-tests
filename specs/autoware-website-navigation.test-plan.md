# Autoware Website Navigation Test Plan

## Overview

| Field | Detail |
| ----- | ------ |
| Project | autoware-website-tests |
| Version | 1.0 |
| Date | 2026-03-23 |
| Author | haili.a.li |
| Status | Active |

## Scope

This test plan covers the end-to-end public user journey from the `autoware.org` homepage through to the Autoware Foundation GitHub organization, the `autoware` repository, and the repository README content.

Out of scope: browser-native translation features (e.g. right-click → Translate to Japanese). These cannot be automated via Playwright and are excluded from this suite.

## Test environment

| Item | Value |
| ---- | ----- |
| Browser | Chromium (Playwright-managed) |
| Base URL | `https://autoware.org/` |
| External dependency | `https://github.com/autowarefoundation` |
| Execution | Local and GitHub Actions CI |
| Framework | Playwright (TypeScript) |

## Pass / fail criteria

- **Pass**: all tests finish green within configured timeouts, including any configured retries.
- **Fail**: any assertion throws, a navigation returns a non-2xx response, or the test exceeds the timeout after retries.
- **Flake signal**: a run that only passes after retry should still be reviewed as unstable even if CI finishes green.

---

## Test cases

### TC001 — Initial Website Access

**File:** `tests/website-github-navigation/TC001_initial-access.spec.ts`

**Objective:** Verify that the Autoware homepage loads correctly and exposes the GitHub entry point.

**Preconditions:** Network access to `autoware.org`.

**Steps:**

1. Navigate to `https://autoware.org/`.
   - Expected: HTTP response is successful (2xx).
   - Expected: page URL resolves to `autoware.org`.
   - Expected: page title contains "Autoware".
2. Verify the main layout.
   - Expected: `<main>` or `[role="main"]` element is visible.
   - Expected: primary navigation (`<nav>` or `[role="navigation"]`) is visible.
3. Verify the GitHub entry point.
   - Expected: "AUTOWARE ON GITHUB" link is visible.
   - Expected: link `href` matches `github.com/autowarefoundation`.

---

### TC002 — Homepage GitHub CTA

**File:** `tests/website-github-navigation/TC002_find-github-link.spec.ts`

**Objective:** Verify that clicking the GitHub CTA navigates to the Autoware Foundation organization page.

**Preconditions:** Network access to `autoware.org` and `github.com`.

**Steps:**

1. Load the Autoware homepage.
2. Click the "AUTOWARE ON GITHUB" link.
   - Expected: browser navigates to `https://github.com/autowarefoundation`.
   - Expected: Autoware Foundation organization page is displayed.
   - Expected: a "Repositories" navigation link is visible on the organization page.

---

### TC003 — Homepage to Repository Journey

**File:** `tests/website-github-navigation/TC003_repository-access.spec.ts`

**Objective:** Verify the full navigation path from the homepage to the `autoware` repository.

**Preconditions:** Network access to `autoware.org` and `github.com`.

**Steps:**

1. Load the Autoware homepage and navigate to the GitHub organization (via TC002 flow).
2. Click the "Repositories" tab.
   - Expected: URL matches the repositories view of `github.com/autowarefoundation`.
3. Click the `autoware` repository link.
   - Expected: browser navigates to `https://github.com/autowarefoundation/autoware`.
   - Expected: the `#readme` or `.markdown-body` section is visible on the repository page.

---

### TC004 — README Content Verification

**File:** `tests/website-github-navigation/TC004_readme-content.spec.ts`

**Objective:** Verify that the repository README is readable and contains expected Autoware content.

**Preconditions:** Network access to `autoware.org` and `github.com`. TC003 flow must be traversable.

**Steps:**

1. Traverse the full homepage-to-repository workflow (TC001 → TC002 → TC003 flow).
2. Scroll the README section into view.
   - Expected: README body (`.markdown-body`) is visible.
   - Expected: at least one heading element (`h1`, `h2`, or `h3`) is visible within the README.
   - Expected: README body contains the text "autoware" (case-insensitive).

---

## Traceability matrix

| TC ID | Test name | File | Automated |
| ----- | --------- | ---- | --------- |
| TC001 | Initial Website Access | `TC001_initial-access.spec.ts` | Yes |
| TC002 | Homepage GitHub CTA | `TC002_find-github-link.spec.ts` | Yes |
| TC003 | Homepage to Repository Journey | `TC003_repository-access.spec.ts` | Yes |
| TC004 | README Content Verification | `TC004_readme-content.spec.ts` | Yes |

## Known constraints

- `autoware.org` uses background polling that prevents `networkidle` from resolving. All navigations use the default `load` event.
- The GitHub organization page may open in a new tab (popup) depending on the link target attribute. The helper `clickAndFollow` handles both cases transparently.
- GitHub repository-list pages are dynamic and can ignore a synthetic click intermittently even when the target anchor is visible. For destination-verification flows, automation should validate the repo link `href` and navigate directly instead of relying on `click()` alone.
- The suite runs with a single worker in both local and CI execution to reduce live-site flakiness from concurrent requests.
- CI retries are set to 2 to account for transient network latency on external sites.
