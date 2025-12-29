```
  ____   ____  _
 / ___| / ___|| |
 \___ \| |    | |
  ___) | |___ | |___
 |____/ \____||_____|

SIMSIES COMPONENT LIBRARY
"because copy-pasting is for normies"
```

# SCL - Simsies Component Library

[![Storybook](https://img.shields.io/badge/Storybook-ff4785?logo=storybook&logoColor=white)](https://jcpsimmons.github.io/scl/)
[![npm](https://img.shields.io/npm/v/@drjoshcsimmons/scl)](https://www.npmjs.com/package/@drjoshcsimmons/scl)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A BASED React component library that doesn't suck. Built on [shadcn/ui](https://ui.shadcn.com/), Radix primitives, and Tailwind CSS because I'm not a masochist who writes CSS from scratch anymore.

```
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║   > npm install @drjoshcsimmons/scl                          ║
    ║                                                              ║
    ║   [████████████████████████████████████████] 100%            ║
    ║                                                              ║
    ║   ✓ installed 1 package                                      ║
    ║   ✓ your code now has TASTE                                  ║
    ║   ✓ maidens acquired                                         ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
```

## What the hell is this?

It's my personal component library. I got tired of copy-pasting the same damn components between projects, so I made this. Now I just `npm install` and get on with my life like a functional adult.

```
                    ┌─────────────────────┐
                    │   VIRGIN DEVS:      │
                    │   "Let me just      │
                    │    copy this file   │
                    │    real quick..."   │
                    └─────────┬───────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │   *3 hours later*   │
                    │   "Why doesn't this │
                    │    work anymore"    │
                    └─────────────────────┘

        vs.

                    ┌─────────────────────┐
                    │   CHAD SCL USERS:   │
                    │   npm install       │
                    │   *ships product*   │
                    │   *goes outside*    │
                    └─────────────────────┘
```

## Installation

```bash
npm install @drjoshcsimmons/scl
# or
pnpm add @drjoshcsimmons/scl
# or
yarn add @drjoshcsimmons/scl
# (we don't discriminate against package managers here)
```

## Usage

```tsx
import { Button, Card, Input } from "@drjoshcsimmons/scl";
import "@drjoshcsimmons/scl/globals.css"; // Don't forget this or everything looks like shit

function App() {
  return (
    <Card>
      <Input placeholder="Type some crap..." />
      <Button>Do the thing</Button>
    </Card>
  );
}
```

## Components

```
┌────────────────────────────────────────────────────────────────┐
│                       COMPONENT ARSENAL                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─ LAYOUT ─────────────────────────────────────────────────┐  │
│  │ Accordion • Card • Collapsible • Scroll Area             │  │
│  │ Separator • Sheet • Tabs • Resizable                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─ FORMS ──────────────────────────────────────────────────┐  │
│  │ Button • Checkbox • Input • Label • Radio Group          │  │
│  │ Select • Slider • Switch • Textarea • Toggle             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─ DATA DISPLAY ───────────────────────────────────────────┐  │
│  │ Avatar • Badge • Progress • Skeleton • Table • Tooltip   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─ FEEDBACK ───────────────────────────────────────────────┐  │
│  │ Alert • Alert Dialog • Dialog • Popover • Dropdown Menu  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─ WEIRD CUSTOM SHIT ──────────────────────────────────────┐  │
│  │ Dithered Image • Statusline • Terminal Textarea          │  │
│  │ Code Editor (with VIM MODE because we're not animals)    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## Development

```bash
# Install dependencies
pnpm install

# Run Storybook (this is where the magic happens)
pnpm dev

# Run tests (yes I actually write tests, fuck off)
pnpm test

# Build the library
pnpm build

# Type check (for the paranoid)
pnpm typecheck
```

## Storybook

Check out the components at [jcpsimmons.github.io/scl](https://jcpsimmons.github.io/scl/)

```
         ┌─────────────────────────────────────┐
         │                                     │
         │   STORYBOOK PREVIEW:                │
         │                                     │
         │   ┌─────────────────────────────┐   │
         │   │  [=========]  Button        │   │
         │   │  [    ●    ]  Toggle        │   │
         │   │  [████░░░░░]  Progress      │   │
         │   │  ┌─────────┐  Card          │   │
         │   │  │ Content │                │   │
         │   │  └─────────┘                │   │
         │   └─────────────────────────────┘   │
         │                                     │
         │   (but cooler because retro theme) │
         │                                     │
         └─────────────────────────────────────┘
```

## The Aesthetic

```
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║   This library has a RETRO TERMINAL AESTHETIC because:             ║
║                                                                    ║
║   • No border-radius (corners are for cowards)                     ║
║   • No shadows (we live in FLATLAND)                               ║
║   • BigBlueTerm437 monospace font (embrace the CRT vibes)          ║
║   • CSS variables for theming (HSL colors because we're not        ║
║     savages who use hex in 2099)                                   ║
║   • Dark mode (obviously)                                          ║
║                                                                    ║
║   If you want rounded corners and drop shadows, Material UI is     ║
║   ──────────────────────────────────────────────>  that way        ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

## Why "Simsies"?

It's my name. Well, part of it. Don't overthink it.

```
             ___________________
            < Simmons -> Simsies >
             -------------------
                    \   ^__^
                     \  (oo)\_______
                        (__)\       )\/\
                            ||----w |
                            ||     ||
```

## Tech Stack

```
    ┌────────────────────────────────────────────────────────┐
    │                                                        │
    │   React ──────────────► Because it's 2099              │
    │      │                                                 │
    │      ▼                                                 │
    │   Radix UI ──────────► Accessibility handled           │
    │      │                                                 │
    │      ▼                                                 │
    │   Tailwind CSS ──────► Utility classes go brrrr        │
    │      │                                                 │
    │      ▼                                                 │
    │   CVA ────────────────► Variants without the pain      │
    │      │                                                 │
    │      ▼                                                 │
    │   TypeScript ─────────► Red squiggles save lives       │
    │      │                                                 │
    │      ▼                                                 │
    │   Vite ───────────────► Fast AF builds                 │
    │      │                                                 │
    │      ▼                                                 │
    │   Vitest ─────────────► Tests that don't take forever  │
    │                                                        │
    └────────────────────────────────────────────────────────┘
```

## Contributing

```
    ┌───────────────────────────────────────────────┐
    │                                               │
    │   1. Fork the repo                            │
    │   2. Make your changes                        │
    │   3. Write tests (non-negotiable)             │
    │   4. Open a PR                                │
    │   5. ???                                      │
    │   6. Profit                                   │
    │                                               │
    └───────────────────────────────────────────────┘
```

## License

MIT - Do whatever the fuck you want with it.

```
    ████████████████████████████████████████████████████████████
    █                                                          █
    █   "I used to copy-paste components like a peasant.       █
    █    Now I npm install SCL and actually touch grass."      █
    █                                                          █
    █                              - Some developer, probably  █
    █                                                          █
    ████████████████████████████████████████████████████████████
```

---

<p align="center">
  <sub>Made with ☕ and mass quantities of mass quantities by <a href="https://github.com/jcpsimmons">@jcpsimmons</a></sub>
</p>
