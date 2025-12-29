# Next.js Example

This example demonstrates how to use `@drjoshcsimmons/scl` in a Next.js app.

## Quick Start

```bash
cd examples/nextjs
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Usage

Import components and the global CSS:

```tsx
// app/globals.css
@import '@drjoshcsimmons/scl/globals.css';

// app/page.tsx
import { Button, Card, Input } from '@drjoshcsimmons/scl'
```

## Local Development

To test against the local library build instead of npm:

```bash
# From repo root
bun run build

# From examples/nextjs
bun link ../../
bun dev
```
