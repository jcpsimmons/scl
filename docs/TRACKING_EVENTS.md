# Tracking Events Documentation

This document describes the custom tracking events implemented using Vercel Analytics.

## Events

### 1. `game_started`

**Triggered when:** User clicks "Press 'y' to begin" button to start the game

**Data tracked:**

- Event name: `game_started`
- No additional properties

**Purpose:** Track how many users actually start playing the game (conversion from landing to gameplay)

---

### 2. `burnout_reached`

**Triggered when:** User's stats drop to zero and they reach a burnout state

**Data tracked:**

- Event name: `burnout_reached`
- `burnoutType`: Type of burnout (`energy`, `masking`, `competence`, or `relationships`)
- `day`: Game day when burnout occurred
- `week`: Game week when burnout occurred

**Purpose:** Understand which stats most commonly lead to burnout and how far players typically progress before burning out

---

### 3. `about_modal_opened`

**Triggered when:** User clicks the "About" button in the header

**Data tracked:**

- Event name: `about_modal_opened`
- No additional properties

**Purpose:** Track user interest in learning more about the project

---

### 4. `first_choice_made`

**Triggered when:** User makes their first gameplay choice (only tracked once per session)

**Data tracked:**

- Event name: `first_choice_made`
- `day`: Game day when first choice was made (typically day 1)
- `week`: Game week when first choice was made (typically week 1)

**Purpose:** Track user engagement beyond just viewing the intro - shows active gameplay

---

### 5. `game_reset`

**Triggered when:** User clicks the "Reset Progress" button

**Data tracked:**

- Event name: `game_reset`
- `day`: Game day at time of reset
- `week`: Game week at time of reset

**Purpose:** Understand when and why users reset (did they want to try again, or did they get stuck?)

---

## Implementation Details

All tracking uses the `track()` function from `@vercel/analytics`:

```typescript
import { track } from '@vercel/analytics'

// Simple event
track('game_started')

// Event with data
track('burnout_reached', {
  burnoutType: 'energy',
  day: 3,
  week: 1,
})
```

Analytics are only active in production (controlled by the `Analytics` component in `main.tsx`).

## Privacy Considerations

- No personally identifiable information (PII) is tracked
- All data is aggregated and anonymous
- Event data includes only game state information (days, weeks, burnout types)
- No user input or choices are stored

## Viewing Analytics

Analytics can be viewed in the Vercel dashboard:

1. Go to your Vercel project dashboard
2. Click the "Analytics" tab
3. Scroll to the "Events" panel
4. Select an event name to drill down into the data
