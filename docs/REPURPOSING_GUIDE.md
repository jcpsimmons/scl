# Repurposing Guide: Building Your Own Interactive Story

This guide explains how to use the Autism Simulator engine to create your own interactive narrative experiences. The engine is designed to be story-agnostic, allowing you to build any stat-based, choice-driven narrative game.

## Table of Contents

- [Overview](#overview)
- [Understanding the Architecture](#understanding-the-architecture)
- [The Ink Narrative System](#the-ink-narrative-system)
- [Creating Your Story](#creating-your-story)
- [Configuring Game Stats](#configuring-game-stats)
- [Connecting Assets to Narrative](#connecting-assets-to-narrative)
- [Burnout/Ending Scenarios](#burnoutending-scenarios)
- [Testing Your Story](#testing-your-story)
- [Advanced Customization](#advanced-customization)

## Overview

The Autism Simulator engine consists of three main layers:

1. **Narrative Engine**: Powered by [Ink](https://github.com/inkle/ink), a scripting language for interactive stories
2. **Game State Management**: Using [XState](https://xstate.js.org/) for predictable state transitions
3. **UI Layer**: React components that render the story and handle player interaction

You can replace the story content while keeping the engine intact, or customize the engine itself for more significant changes.

## Understanding the Architecture

### Core Files

- **`src/content/main.ink`**: The source narrative file (Ink format)
- **`src/content/build/main.ink.json`**: Compiled narrative (auto-generated)
- **`src/content/burnoutScenarios.json`**: Ending scenarios configuration
- **`src/storyConfig.ts`**: Story-specific configuration (stats, paths, initial values)
- **`src/loopMachine.ts`**: XState state machine managing game flow
- **`src/narrative.ts`**: Ink story wrapper and interface

### How It Works

1. Player makes a choice in the UI
2. XState machine processes the choice
3. Narrative system (Ink) advances the story
4. Tags in the story content trigger stat changes
5. UI updates to reflect new story state and stats
6. Process repeats until an ending condition is met

## The Ink Narrative System

### What is Ink?

[Ink](https://www.inklestudios.com/ink/) is a powerful scripting language for writing interactive narratives. It supports:

- Branching storylines with choices
- Variables and conditional logic
- Tags for metadata
- State persistence

### Installing Ink Tools

For writing Ink stories, we recommend:

- **[Inky](https://github.com/inkle/inky)**: Official Ink editor with live preview
- **VS Code Extension**: Ink syntax highlighting

### Learning Ink

- **Official Tutorial**: https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md
- **Example Stories**: https://github.com/inkle/ink-library

## Creating Your Story

### Step 1: Write Your Ink Story

Replace or modify `src/content/main.ink`:

```ink
=== start_here ===
Welcome to your story!

This is the beginning of your adventure.

+ [Make the brave choice] -> brave_path
+ [Make the cautious choice] -> cautious_path

=== brave_path ===
#delta:courage=+10 #delta:safety=-5
You chose bravery!

Your courage increases, but you feel less safe.

+ [Continue] -> next_scene

=== cautious_path ===
#delta:courage=-5 #delta:safety=+10
You chose caution!

You feel safer, but wonder about missed opportunities.

+ [Continue] -> next_scene

=== next_scene ===
The story continues...

-> END
```

**Important Conventions:**

- **Starting Point**: Your story must have a knot named `start_here` - this is where the game begins
- **Choices**: Use `+` for one-time choices, `*` for once-only choices
- **Navigation**: Use `->` to jump between knots (story sections)
- **Tags**: Use `#` for metadata (see below)

### Step 2: Define Custom Tags

The engine recognizes these tag types:

#### Stat Delta Tags

Format: `#delta:statName=value`

```ink
* [Work hard] #delta:energy=-10 #delta:competence=+5
    You push yourself to excel.
```

#### Flag Tags

Format: `#flag:set:flagName` or `#flag:clear:flagName`

```ink
* [Tell the truth] #flag:set:honest
    You decide to be honest.
```

#### Navigation Tags

Format: `#goto:knotName`

```ink
Some story text. #goto:special_scene
```

#### Event Tags

Format: `#event:eventName` (for analytics)

```ink
* [Critical choice] #event:major_decision
    This is tracked for analytics.
```

### Step 3: Compile Your Ink Story

After writing your `.ink` file:

```bash
pnpm run compile:ink
```

This generates `src/content/build/main.ink.json`, which the game engine reads.

**Troubleshooting**: If compilation fails, check for:

- Syntax errors in your Ink file
- Missing `->` transitions
- Unclosed knots or stitches

## Configuring Game Stats

### Step 1: Define Your Stats

Edit or create `src/storyConfig.ts`:

```typescript
export const storyConfig = {
  title: 'My Interactive Story',

  // Stats used in your game
  stats: {
    courage: {
      name: 'Courage',
      description: 'Your bravery and willingness to take risks.',
      initial: 50,
    },
    safety: {
      name: 'Safety',
      description: 'How secure and protected you feel.',
      initial: 70,
    },
    wisdom: {
      name: 'Wisdom',
      description: 'Your accumulated knowledge and insight.',
      initial: 60,
    },
  },

  // Paths to content files
  inkFile: 'content/build/main.ink.json',
  burnoutScenarios: 'content/burnoutScenarios.json',
  imagePath: '/images/generated/',

  // Story settings
  daysInCycle: 5, // How many days before a "week" review
  weeksToPlay: 4, // Total game duration
}
```

### Step 2: Update Type Definitions

Update `src/types.ts` to match your stats:

```typescript
export type StatKey = 'courage' | 'safety' | 'wisdom'
export type Stats = Record<StatKey, number>
```

### Step 3: Update the Narrative Class

Modify `src/narrative.ts` to use your configuration:

```typescript
import { storyConfig } from './storyConfig'

// Replace hardcoded path with:
import inkJson from `./${storyConfig.inkFile}`
```

## Connecting Assets to Narrative

### Image Generation System

The engine includes a script to generate images for story beats using AI.

#### Step 1: Name Your Scenes

Each major story section should have a unique identifier. The convention is:

```ink
=== office_morning_001 ===
#hash:office_morning_001
You arrive at the office.
```

The hash is used to link images to story beats.

#### Step 2: Generate Images

```bash
# Test mode (first 3 scenes only)
pnpm run generate:images:test

# Full generation
pnpm run generate:images

# Aggressive mode (faster, for many scenes)
pnpm run generate:images:aggressive
```

Images are saved to `public/images/generated/[hash].jpg`

#### Step 3: Manual Image Placement

Alternatively, place images manually:

1. Name them using the scene hash: `office_morning_001.jpg`
2. Place in `public/images/generated/`
3. The engine automatically loads them based on current scene hash

### Audio and Other Assets

Place audio files in `public/audio/` and reference them in your components:

```typescript
const audio = new Audio('/audio/ambient.mp3')
```

## Burnout/Ending Scenarios

### Defining Endings

Edit `src/content/burnoutScenarios.json`:

```json
{
  "courage": "Courage Ending: Your bravery led you to take one risk too many. You learned an important lesson about balance.",
  "safety": "Safety Ending: You played it so safe that opportunities passed you by. Sometimes risks are necessary.",
  "wisdom": "Wisdom Ending: Your accumulated knowledge reached a breaking point. Even the wisest need rest."
}
```

**Keys must match your stat names** - when a stat reaches 0, the corresponding ending is triggered.

### Customizing Ending Logic

Edit `src/loopMachine.ts` to change when endings trigger:

```typescript
// Current: triggers when any stat hits 0
// Modify the burnout guard:
guards: {
  isBurnout: ({ context }) => {
    const { stats } = context
    return Object.values(stats).some(val => val <= 0)
  }
}
```

## Testing Your Story

### Manual Testing

1. Start the dev server: `pnpm run dev`
2. Play through your story
3. Use the DevMenu (if enabled) to:
   - Jump to specific scenes
   - Modify stats
   - Test different paths

### Automated Testing

Add E2E tests in `tests/`:

```typescript
import { test, expect } from '@playwright/test'
import { GameHelper } from './helpers/game-helpers'

test('my story path works', async ({ page }) => {
  const gameHelper = new GameHelper(page)
  await gameHelper.startNewGame()

  // Make specific choices
  await gameHelper.makeChoice('Make the brave choice')

  // Verify stats changed
  const stats = await gameHelper.getCurrentStats()
  expect(stats.courage).toBeGreaterThan(50)
})
```

### Validating Ink Content

Run the validation script:

```bash
pnpm run validate:ink
```

This checks for:

- Proper stat delta syntax
- Valid stat names
- Unreachable content
- Potential infinite loops

## Advanced Customization

### Changing the UI

The UI is built with React components in `src/components/`:

- **`StoryBeat.tsx`**: Displays story text
- **`ChoiceList.tsx`**: Shows available choices
- **`StatsBar.tsx`**: Displays current stats
- **`CRTImage.tsx`**: Shows scene images with effects

Modify these to change the look and feel of your game.

### Custom Game Mechanics

#### Adding New Stat Types

1. Update `src/types.ts` with new stat type
2. Add to `src/storyConfig.ts` configuration
3. Update `src/loopMachine.ts` to handle new stat
4. Create UI components to display it

#### Weekly/Daily Reviews

The game currently has a "weekly review" system that applies drift to stats:

```typescript
// In loopMachine.ts
actions: {
  applyWeeklyDrift: assign({
    stats: ({ context }) => {
      const { stats } = context
      return {
        ...stats,
        // High masking costs energy over time
        energy: Math.max(0, stats.energy - Math.floor(stats.masking / 10)),
      }
    },
  })
}
```

Customize this for your own narrative needs.

### State Persistence

The game automatically saves state to IndexedDB. To customize what's saved:

Edit `src/storage.ts`:

```typescript
export async function save(state: PlayerState) {
  const db = await openDB()
  await db.put('gameState', state, 'currentGame')
}
```

### Internationalization

To add multiple languages:

1. Create translation files in `src/locales/`
2. Use a library like `react-i18next`
3. Update `src/storyConfig.ts` to include locale settings
4. Write separate Ink files for each language

## Common Issues and Solutions

### Issue: Compilation Fails

**Solution**: Check your Ink syntax. Common issues:

- Missing `->` transitions
- Unclosed choices or knots
- Invalid tag syntax

### Issue: Stats Don't Update

**Solution**: Verify your tags match the stat names in `src/types.ts` exactly:

```ink
#delta:courage=+10  ✅ Correct
#delta:Courage=+10  ❌ Wrong (capitalization)
#delta:brave=+10    ❌ Wrong (stat doesn't exist)
```

### Issue: Images Don't Load

**Solution**:

1. Check that image files are in `public/images/generated/`
2. Verify filenames match scene hashes exactly
3. Check browser console for 404 errors

### Issue: Game State Doesn't Persist

**Solution**:

1. Check browser storage quotas
2. Verify IndexedDB is enabled
3. Check for errors in browser console
4. The game falls back to localStorage if IndexedDB fails

## Examples and Templates

### Minimal Story Template

See `examples/minimal-story.ink` (to be added) for a basic story structure.

### Complete Game Template

See `examples/complete-game/` (to be added) for a full example with multiple stats, endings, and scenes.

## Getting Help

- **Issues**: Open a GitHub issue with the `question` label
- **Discussions**: Check GitHub Discussions for community help
- **Documentation**: Review the [Copilot Instructions](.github/copilot-instructions.md) for technical details
- **Ink Help**: See the [official Ink documentation](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md)

## Contributing Your Story

If you create something cool with this engine, consider:

- Sharing it with the community
- Contributing improvements back to the engine
- Writing about your experience

See [CONTRIBUTING.md](../CONTRIBUTING.md) for details.

---

**Happy storytelling!** We can't wait to see what you create with this engine.
