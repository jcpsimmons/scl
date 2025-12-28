# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SCL (Simsies Component Library) is a React component library built on shadcn/ui, Radix primitives, and Tailwind CSS. Published as `@drjoshcsimmons/scl` on npm.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Run Storybook on port 6006
pnpm build            # Build library (tsc + vite)
pnpm test             # Run vitest tests
pnpm test <pattern>   # Run specific test file
pnpm test:coverage    # Run tests with coverage
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript type checking
pnpm build:storybook  # Build Storybook static site
```

## Architecture

### Library Structure

- **Entry point**: `src/index.ts` - exports all components, utilities, and design tokens
- **Components**: `src/components/ui/<component>/` - each component has its own directory with:
  - `<component>.tsx` - component implementation using Radix + CVA
  - `<component>.test.tsx` - vitest tests with Testing Library
  - `<component>.stories.tsx` - Storybook stories
  - `index.ts` - re-exports
- **Design tokens**: `src/tokens/` - colors, typography, spacing, animations, shadows
- **Utilities**: `src/lib/utils.ts` - `cn()` function (clsx + tailwind-merge)

### Component Pattern

Components use:
- `class-variance-authority` (CVA) for variant styling
- `@radix-ui/*` primitives for accessibility
- `cn()` utility for class merging
- `forwardRef` for ref forwarding
- Path alias `@/` maps to `src/`

### Build Configuration

- Vite library mode builds to `dist/` with ES modules and TypeScript declarations
- React and react-dom are external peer dependencies
- CSS bundled as single `globals.css` file
- Storybook uses `@storybook/react-vite`

### Styling

- Tailwind CSS with custom theme in `tailwind.config.ts`
- Retro terminal aesthetic: no border-radius, no shadows, `BigBlueTerm437` mono font
- CSS variables for theming (HSL colors defined in globals.css)
- Dark mode via class strategy

## Testing

- Vitest with jsdom environment
- `@testing-library/react` for component testing
- Setup file: `src/test-setup.ts`
- Tests colocated with components
