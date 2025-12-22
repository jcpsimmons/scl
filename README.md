# @drj/ui

A React component library built with [shadcn/ui](https://ui.shadcn.com/), Radix UI primitives, and Tailwind CSS.

[![Storybook](https://img.shields.io/badge/Storybook-View%20Components-ff4785?logo=storybook&logoColor=white)](https://simsies.github.io/scl/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Installation

```bash
npm install @drj/ui
```

## Usage

Import components and the required CSS:

```tsx
import { Button, Card, Input } from '@drj/ui'
import '@drj/ui/globals.css'

function App() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Submit</Button>
    </Card>
  )
}
```

## Components

| Category | Components |
|----------|------------|
| **Layout** | Accordion, Card, Collapsible, Scroll Area, Separator, Sheet, Tabs |
| **Forms** | Button, Checkbox, Input, Label, Radio Group, Select, Slider, Switch, Textarea, Toggle |
| **Data Display** | Avatar, Badge, Progress, Skeleton, Table, Tooltip |
| **Feedback** | Alert, Alert Dialog, Dialog, Popover |
| **Navigation** | Dropdown Menu |
| **Custom** | Dithered Image, Statusline, Terminal Textarea |

## Development

```bash
# Install dependencies
pnpm install

# Start Storybook dev server
pnpm dev

# Run tests
pnpm test

# Build library
pnpm build

# Build Storybook
pnpm build:storybook
```

## Documentation

View the live component documentation at [simsies.github.io/scl](https://simsies.github.io/scl/)

## License

MIT
