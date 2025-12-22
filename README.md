# SCL - Simsies Component Library

A goddamn React component library that doesn't suck. Built on [shadcn/ui](https://ui.shadcn.com/), Radix primitives, and Tailwind CSS because I'm not a masochist who writes CSS from scratch anymore.

[![Storybook](https://img.shields.io/badge/Storybook-ff4785?logo=storybook&logoColor=white)](https://jcpsimmons.github.io/scl/)

## What the hell is this?

It's my personal component library. I got tired of copy-pasting the same damn components between projects, so I made this. Now I just `npm install` and get on with my life.

## Installation

```bash
npm install @jcpsimmons/scl
```

## Usage

```tsx
import { Button, Card, Input } from '@jcpsimmons/scl'
import '@jcpsimmons/scl/globals.css'  // Don't forget this or everything looks like shit

function App() {
  return (
    <Card>
      <Input placeholder="Type some crap..." />
      <Button>Do the thing</Button>
    </Card>
  )
}
```

## Components

All the boring-but-necessary UI shit:

**Layout** - Accordion, Card, Collapsible, Scroll Area, Separator, Sheet, Tabs

**Forms** - Button, Checkbox, Input, Label, Radio Group, Select, Slider, Switch, Textarea, Toggle

**Data Display** - Avatar, Badge, Progress, Skeleton, Table, Tooltip

**Feedback** - Alert, Alert Dialog, Dialog, Popover, Dropdown Menu

**Weird Custom Shit** - Dithered Image, Statusline, Terminal Textarea

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
```

## Storybook

Check out the components at [jcpsimmons.github.io/scl](https://jcpsimmons.github.io/scl/)

## Why "Simsies"?

It's my name. Well, part of it. Don't overthink it.

## License

MIT - Do whatever the fuck you want with it.
