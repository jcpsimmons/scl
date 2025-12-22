# 🧪 Testing Guide for Autism Simulator

This document explains how to run and maintain the Playwright end-to-end tests for the Autism Simulator game.

## 🚀 Quick Start

1. **Install dependencies** (if not already done):

   ```bash
   npm install
   ```

2. **Install Playwright browsers**:

   ```bash
   npm run playwright:install
   ```

3. **Run all tests**:
   ```bash
   npm run test:e2e
   ```

## 📋 Available Test Commands

| Command                      | Description                                   |
| ---------------------------- | --------------------------------------------- |
| `npm run test:validate`      | Validate test files structure without running |
| `npm run test:e2e`           | Run all tests headlessly                      |
| `npm run test:e2e:headed`    | Run tests with visible browser                |
| `npm run test:e2e:ui`        | Run tests with Playwright UI                  |
| `npm run test:e2e:debug`     | Run tests in debug mode                       |
| `npm run test:build-and-e2e` | Build app and run tests                       |

## 🧪 Test Suites

### 1. Basic Functionality (`basic.spec.ts`)

Tests fundamental game operations:

- ✅ Game loading and initial screen
- ✅ Starting a new game
- ✅ Displaying game stats (energy, masking, competence, relationships)
- ✅ Story content and choice presentation
- ✅ Making choices and story progression
- ✅ Browser refresh handling
- ✅ Responsive design across screen sizes

### 2. Multi-Day Gameplay (`multi-day-gameplay.spec.ts`)

Tests extended gameplay scenarios:

- ✅ Playing through multiple scenarios in one session
- ✅ Self-care focused choice paths
- ✅ Rushed/stressful choice paths
- ✅ Different choice paths leading to different outcomes
- ✅ Rapid clicking without breaking the game
- ✅ Game state persistence through interactions

### 3. Advanced Scenarios (`advanced-scenarios.spec.ts`)

Tests complex game interactions:

- ✅ Progression through multiple game scenarios
- ✅ Workplace scenario detection
- ✅ Stats changes based on choices
- ✅ GameHelper methods functionality throughout gameplay
- ✅ Branching storylines leading to different content
- ✅ Extended gameplay stability
- ✅ Specific choice combinations creating expected narratives

### 4. Failure Scenarios (`failure-scenarios.spec.ts`)

Tests edge cases and error handling:

- ✅ Network interruption graceful handling
- ✅ JavaScript errors survival
- ✅ Malformed local storage data handling
- ✅ Rapid user interactions without breaking
- ✅ Browser navigation events
- ✅ Tab switching and focus changes
- ✅ Device orientation changes (mobile simulation)
- ✅ Extreme viewport sizes
- ✅ Multiple page refreshes functionality

## 🛠️ GameHelper Class

The `GameHelper` class provides high-level methods for interacting with the game:

```typescript
const gameHelper = new GameHelper(page)

// Start a new game
await gameHelper.startNewGame()

// Get current stats
const stats = await gameHelper.getCurrentStats()
// Returns: { energy: number, masking: number, competence: number, relationships: number }

// Get current day
const day = await gameHelper.getCurrentDay()

// Get story text
const story = await gameHelper.getCurrentStoryText()

// Get available choices
const choices = await gameHelper.getAvailableChoices()

// Make a choice by text
await gameHelper.makeChoice('Take time for self-care this morning')

// Make a choice by index
await gameHelper.makeChoiceByIndex(0)
```

## 🎯 Key Test Selectors

The game uses these `data-testid` attributes for reliable testing:

- `[data-testid="game-container"]` - Main game container
- `[data-testid="stats-bar"]` - Stats display section
- `[data-testid="stat-energy"]` - Energy stat value
- `[data-testid="stat-masking"]` - Masking stat value
- `[data-testid="stat-competence"]` - Competence stat value
- `[data-testid="stat-relationships"]` - Relationships stat value
- `[data-testid="story-content"]` - Current story text
- `[data-testid="choice-button"]` - Choice buttons

## 📊 Test Results

When all tests pass, you should see:

- **29 total tests** across 4 test suites
- Tests covering basic functionality, multi-day gameplay, advanced scenarios, and failure cases
- Comprehensive coverage of game mechanics and edge cases

## 🐛 Troubleshooting

### Browser Installation Issues

If `npm run playwright:install` fails:

```bash
# Try installing manually
npx playwright install chromium firefox webkit
```

### Test Failures

1. **Check app is building correctly**:

   ```bash
   npm run build
   npm run preview
   ```

2. **Validate test structure**:

   ```bash
   npm run test:validate
   ```

3. **Run tests with visible browser for debugging**:

   ```bash
   npm run test:e2e:headed
   ```

4. **Use Playwright UI for interactive debugging**:
   ```bash
   npm run test:e2e:ui
   ```

### Server Issues

If the webServer fails to start:

- Check if port 4173 is available
- Ensure the build completed successfully
- Try running `npm run preview` manually first

## 📝 Writing New Tests

When adding new tests:

1. **Use the GameHelper** for common operations
2. **Use proper data-testid selectors** instead of brittle CSS selectors
3. **Follow the existing test structure** with proper describe/beforeEach blocks
4. **Add meaningful assertions** that verify actual game functionality
5. **Keep tests focused** - one concept per test
6. **Use appropriate timeouts** - short waits for UI updates, longer for complex operations

Example test structure:

```typescript
test('descriptive test name', async ({ page }) => {
  await gameHelper.startNewGame()

  // Test specific functionality
  const choices = await gameHelper.getAvailableChoices()
  expect(choices.length).toBeGreaterThan(0)

  await gameHelper.makeChoiceByIndex(0)

  // Verify expected outcome
  const newStory = await gameHelper.getCurrentStoryText()
  expect(newStory).toBeTruthy()
})
```

## 🔄 Continuous Integration

The tests are configured to run in CI environments with:

- Automatic browser installation
- Retry on failure (2 retries in CI)
- HTML report generation
- Trace collection on retry

For CI, ensure these environment variables are set:

- `CI=true` - Enables CI-specific configurations
- Build and preview steps are included in the test pipeline

---

For more details about Playwright testing, see the [official Playwright documentation](https://playwright.dev/docs/intro).
