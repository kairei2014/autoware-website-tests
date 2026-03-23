# Autoware Website Navigation Test Plan

## Scope

This plan covers the public user journey from the `autoware.org` homepage to the Autoware Foundation GitHub organization, the `autoware` repository, and the repository README.

Browser-native translation to Japanese is explicitly treated as a manual check. Playwright automation only validates that the README is reachable and readable before any browser translation feature is used.

## Automated Scenarios

### 1. Initial Website Access

**File:** `tests/website-github-navigation/TC001_initial-access.spec.ts`

**Steps:**
1. Navigate to `https://autoware.org/`
   - expect: the response is successful
   - expect: the page URL remains on the public Autoware homepage
   - expect: the page title includes Autoware branding
2. Confirm the main layout is available
   - expect: the main content area is visible
   - expect: the primary navigation is visible
3. Confirm the homepage exposes the GitHub entry point used by the workflow
   - expect: the `AUTOWARE ON GITHUB` link is visible
   - expect: the link points to the Autoware Foundation GitHub organization

### 2. Homepage GitHub CTA

**File:** `tests/website-github-navigation/TC002_find-github-link.spec.ts`

**Steps:**
1. Open the Autoware homepage
2. Locate the `AUTOWARE ON GITHUB` call-to-action
   - expect: the CTA is visible and actionable
3. Activate the CTA
   - expect: the browser reaches `github.com/autowarefoundation`
   - expect: the Autoware Foundation organization page is displayed
   - expect: the GitHub organization navigation includes a `Repositories` tab

### 3. Homepage to Repository Journey

**File:** `tests/website-github-navigation/TC003_repository-access.spec.ts`

**Steps:**
1. Follow the homepage GitHub CTA to the Autoware Foundation organization page
2. Open the `Repositories` tab
   - expect: the repositories view is displayed
3. Locate the `autoware` repository entry
   - expect: the repository link is visible in the organization listing
4. Open the repository
   - expect: the browser reaches `github.com/autowarefoundation/autoware`
   - expect: the repository page loads successfully
   - expect: the README section is visible on the repository landing page

### 4. README Content Verification

**File:** `tests/website-github-navigation/TC004_readme-content.spec.ts`

**Steps:**
1. Traverse the homepage-to-repository workflow
2. Scroll to the README section
   - expect: the README body is visible
   - expect: the README contains visible heading structure
   - expect: the README contains Autoware content
