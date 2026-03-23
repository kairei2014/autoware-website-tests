# Autoware Website Navigation Test Plan

## Application Overview

Core test plan for navigating the autoware.org website, accessing GitHub repositories, and translating README content to Japanese. This covers the primary user workflow from initial website access through GitHub repository exploration and content translation. Error handling scenarios are covered in a separate plan.

## Test Scenarios

### 1. Website Access and Navigation

**Seed:** `seed.spec.ts`

#### 1.1. Initial Website Access

**File:** `tests/website-access/initial-access.spec.ts`

**Steps:**
  1. Navigate to https://autoware.org/
    - expect: The page should load successfully with status code 200
    - expect: The autoware.org homepage should be displayed
    - expect: The page title should contain 'Autoware' or similar branding
    - expect: Main navigation elements should be visible
  2. Wait for page to fully load and check for any loading indicators
    - expect: All images and resources should load completely
    - expect: No loading spinners or placeholders should remain visible
    - expect: The page content should be fully rendered
  3. Look for and identify any tutorial window or modal that appears on page load
    - expect: If a tutorial window exists, it should be clearly visible as an overlay or modal
    - expect: The tutorial window should have identifiable close buttons (X, Close, Skip, etc.)
    - expect: The main page content may be dimmed or blocked if tutorial is modal

#### 1.2. Tutorial Window Handling

**File:** `tests/website-access/tutorial-handling.spec.ts`

**Steps:**
  1. Identify the tutorial window close mechanism (button, X icon, overlay click)
    - expect: Close button should be clearly visible and clickable
    - expect: Close mechanism should be accessible and functional
    - expect: Hover state should indicate the element is interactive
  2. Click the close button or use the identified close mechanism
    - expect: Tutorial window should close immediately or with smooth animation
    - expect: Main page content should become fully accessible
    - expect: No overlay or blocking elements should remain
    - expect: Page should return to normal interactive state
  3. Verify the main page is fully accessible after tutorial closure
    - expect: All navigation elements should be clickable
    - expect: Page scrolling should work normally
    - expect: All interactive elements should be functional

### 2. GitHub Navigation Workflow

**Seed:** `seed.spec.ts`

#### 2.1. Find and Access GitHub Link

**File:** `tests/github-navigation/find-github-link.spec.ts`

**Steps:**
  1. Search for 'AUTOMATE ON Github' or similar GitHub-related text on the page
    - expect: GitHub link should be visible in main navigation, footer, or content area
    - expect: Link text should be clear and identifiable
    - expect: Link should have proper styling indicating it's clickable
  2. Scroll through the page if GitHub link is not immediately visible
    - expect: Page should scroll smoothly
    - expect: All sections of the page should be accessible
    - expect: GitHub link should become visible in viewport
  3. Hover over the GitHub link to verify it's interactive
    - expect: Cursor should change to pointer/hand icon
    - expect: Link should show hover state (color change, underline, etc.)
    - expect: Browser status bar should show the target URL
  4. Click the GitHub link
    - expect: Browser should navigate to GitHub website
    - expect: URL should change to github.com/autowarefoundation or similar
    - expect: New page should load successfully

#### 2.2. GitHub Repository Access

**File:** `tests/github-navigation/repository-access.spec.ts`

**Steps:**
  1. Verify successful redirect to github.com/autowarefoundation
    - expect: URL should be github.com/autowarefoundation or similar
    - expect: GitHub page should load with Autoware Foundation organization
    - expect: Page should display organization information and navigation
  2. Locate the 'Repositories' tab or link
    - expect: Repositories link should be visible in the organization navigation
    - expect: Link should be clearly labeled as 'Repositories'
    - expect: Current repository count may be displayed
  3. Click the 'Repositories' link
    - expect: Page should navigate to the repositories list
    - expect: URL should include '/repositories' or similar path
    - expect: List of repositories should be displayed
    - expect: Repository search and filtering options should be available
  4. Search for or locate the 'autoware' repository
    - expect: Repository search should function properly
    - expect: Autoware repository should be visible in the list
    - expect: Repository should show basic information (description, language, stars, etc.)
  5. Click on the 'autoware' repository
    - expect: Repository page should load successfully
    - expect: README file should be visible on the main repository page
    - expect: Repository navigation (Code, Issues, Pull requests, etc.) should be available

#### 2.3. README Access and Translation

**File:** `tests/github-navigation/readme-translation.spec.ts`

**Steps:**
  1. Scroll to the README section on the repository page
    - expect: README content should be visible and properly formatted
    - expect: README should display markdown content
    - expect: Text should be readable and properly structured
  2. Identify the README content area and text selection capability
    - expect: README text should be selectable
    - expect: Content should be properly formatted with headings, paragraphs, etc.
    - expect: Any code blocks or examples should be clearly distinguished
  3. Right-click on README content to access browser context menu
    - expect: Browser context menu should appear
    - expect: Translation options should be available if browser supports translation
    - expect: Copy/select text options should be present
  4. Look for browser translation features (Chrome: right-click > Translate to Japanese)
    - expect: If browser supports translation, 'Translate to Japanese' option should appear
    - expect: Browser may show translation bar or prompt
    - expect: Page content should begin translating to Japanese
  5. Alternative: Use browser extension or external translation service
    - expect: Translation should preserve formatting and structure
    - expect: Technical terms should be appropriately handled
    - expect: Code blocks should remain untranslated
    - expect: Links and interactive elements should remain functional
  6. Verify translation quality and completeness
    - expect: All text content should be translated to Japanese
    - expect: Technical documentation should be understandable
    - expect: Original links and formatting should be preserved
    - expect: Translation should be grammatically correct
