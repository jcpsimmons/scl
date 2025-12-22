# Autism Simulator Test Suite

This directory contains comprehensive Playwright end-to-end tests for the Autism Simulator game, covering basic functionality, multi-day gameplay scenarios, advanced game mechanics, and failure recovery.

## 🎯 Test Structure

### 📁 Directory Layout

```
tests/
├── e2e/
│   ├── helpers/
│   │   └── game-helpers.ts      # Reusable game interaction utilities
│   ├── basic.spec.ts            # Basic functionality tests
│   ├── multi-day-gameplay.spec.ts # Multi-day scenarios and progression
│   ├── advanced-scenarios.spec.ts # Complex game mechanics
│   └── failure-scenarios.spec.ts  # Error handling and edge cases
└── README.md                    # This file
```

## 🚀 Running Tests

### Prerequisites

```bash
# Install dependencies (if not already done)
npm install

# Install Playwright browsers
npm run playwright:install
```

### Available Test Commands

#### Basic Test Execution

```bash
# Run all tests
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests with debugging
npm run test:e2e:debug

# Build and run tests in one command
npm run test:build-and-e2e
```

#### Focused Test Execution

```bash
# Run only basic functionality tests
npm run test:e2e -- tests/e2e/basic.spec.ts

# Run a specific test by name
npm run test:e2e -- --grep "loads the game and shows initial screen"

# Run tests for specific browser
npm run test:e2e -- --project=chromium

# Run with custom timeout
npm run test:e2e -- --timeout=60000
```

## 📊 Test Categories

### 1. Basic Functionality Tests (`basic.spec.ts`)

- **Purpose**: Verify core game functionality and UI elements
- **Coverage**:
  - Game loads and displays initial screen
  - Story content and choices are visible
  - Stats are displayed correctly
  - Choices progress the story
  - Browser refresh handling
  - Responsive design across screen sizes

### 2. Multi-Day Gameplay Tests (`multi-day-gameplay.spec.ts`)

- **Purpose**: Test game progression across multiple days
- **Coverage**:
  - Self-care focused playthrough paths
  - Stressed/rushed choice consequences
  - Game state persistence between days
  - Full week (7-day) progression
  - Different choice paths leading to different outcomes
  - Rapid interaction handling
  - Stat changes over time

### 3. Advanced Scenarios Tests (`advanced-scenarios.spec.ts`)

- **Purpose**: Verify complex game mechanics and scenarios
- **Coverage**:
  - Workplace scenarios (standup, code review, office noise)
  - Sensory overload situations
  - Medication choice consequences
  - Social interaction scenarios
  - Work performance scenarios
  - Coping mechanism availability
  - Extreme stat value handling
  - Branching storyline verification

### 4. Failure Scenarios Tests (`failure-scenarios.spec.ts`)

- **Purpose**: Ensure robust error handling and edge case recovery
- **Coverage**:
  - Network interruption handling
  - Slow network conditions
  - JavaScript error survival
  - Malformed save data recovery
  - Memory pressure handling
  - Concurrent user interactions
  - Browser navigation (back/forward)
  - Long play session stability
  - Tab switching and focus changes
  - Device orientation changes
  - Corrupted game state recovery
  - Missing image asset handling
  - Temporary server error recovery

## 🛠 Test Helpers and Utilities

### GameHelper Class (`helpers/game-helpers.ts`)

A comprehensive utility class for interacting with the game:

```typescript
const gameHelper = new GameHelper(page)

// Start a new game
await gameHelper.startNewGame()

// Get current game state
const state = await gameHelper.getCurrentState()

// Make choices
await gameHelper.makeChoice('Take time for self-care this morning')
await gameHelper.makeChoiceByIndex(0)

// Play through scenarios
await gameHelper.playDay(['self-care choice', 'medication choice'])
await gameHelper.playUntilEnd()

// Get stats and state
const stats = await gameHelper.getCurrentStats()
const day = await gameHelper.getCurrentDay()
```

### Pre-defined Scenarios

```typescript
import { GameScenarios } from './helpers/game-helpers'

// Use predefined choice sequences
await gameHelper.playDay(GameScenarios.SELF_CARE_MORNING)
await gameHelper.playDay(GameScenarios.STRESS_INDUCING_CHOICES)
```

## 📈 Test Data and Assertions

### Game State Interface

```typescript
interface GameState {
  day: number
  stats: {
    energy: number
    masking: number
    competence: number
    relationships: number
  }
  currentStoryText: string
  availableChoices: string[]
}
```

### Stat Change Assertions

```typescript
await assertStatsChanged(beforeStats, afterStats, {
  energy: +5, // Should increase
  masking: -3, // Should decrease
  competence: 0, // Should stay same
})
```

## 🎮 Game Mechanics Tested

### Core Game Loop

- ✅ Story progression through choices
- ✅ Stat changes based on decisions
- ✅ Day/week progression
- ✅ Save/load functionality
- ✅ Game state persistence

### Autism Simulation Aspects

- ✅ Sensory overload scenarios
- ✅ Masking energy costs
- ✅ Workplace accommodation needs
- ✅ Medication side effects
- ✅ Social interaction challenges
- ✅ Executive function scenarios
- ✅ Burnout and recovery mechanics

### Technical Robustness

- ✅ Error recovery and graceful degradation
- ✅ Performance under stress
- ✅ Network reliability
- ✅ Cross-browser compatibility
- ✅ Mobile responsiveness
- ✅ Accessibility considerations

## 🐛 Debugging Tests

### View Test Reports

```bash
# Open the HTML report after tests run
npx playwright show-report
```

### Run Specific Failed Tests

```bash
# Run only previously failed tests
npm run test:e2e -- --last-failed

# Run with maximum detail
npm run test:e2e -- --reporter=line --verbose
```

### Test Development

```bash
# Record new tests interactively
npx playwright codegen localhost:4173

# Debug a specific test
npm run test:e2e:debug -- --grep "test name"
```

## 📝 Writing New Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test'
import { GameHelper } from './helpers/game-helpers'

test.describe('Your Test Suite', () => {
  let gameHelper: GameHelper

  test.beforeEach(async ({ page }) => {
    gameHelper = new GameHelper(page)
  })

  test('your test description', async ({ page }) => {
    await gameHelper.startNewGame()

    // Your test logic here
    const state = await gameHelper.getCurrentState()
    expect(state.day).toBe(1)
  })
})
```

### Best Practices

- Use `data-testid` attributes for reliable element selection
- Wait for game state changes with appropriate timeouts
- Test both positive and negative scenarios
- Include edge cases and error conditions
- Use the GameHelper class for consistent interactions
- Group related tests in describe blocks
- Use meaningful test descriptions

## 🔧 Configuration

The tests use the configuration from `playwright.config.ts`:

- **Browsers**: Chromium, Firefox, WebKit
- **Base URL**: http://127.0.0.1:4173 (preview server)
- **Timeouts**: 30s default (configurable)
- **Retries**: 2 on CI, 0 locally
- **Parallelization**: Enabled for faster execution

## 📊 CI/CD Integration

The test suite is designed to work in CI environments:

- Automatic browser installation
- Configurable parallelization
- HTML reports generated
- Failure screenshots captured
- Network condition simulation
- Headless execution by default

Example CI usage:

```bash
# In your CI pipeline
npm install
npm run playwright:install
npm run test:build-and-e2e
```
