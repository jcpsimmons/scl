# Contributing to SCL

**USE BUN. NOT NPM. NOT PNPM. NOT YARN. BUN.**

If you use npm/pnpm/yarn, your PR will be rejected and you'll be publicly shamed (not really, but please use Bun).

## Getting Started

```bash
# Clone the repo
git clone https://github.com/jcpsimmons/scl.git
cd scl

# Install dependencies (with Bun, obviously)
bun install

# Start Storybook
bun dev
```

## Development Workflow

### Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Run Storybook on port 6006 |
| `bun test` | Run tests |
| `bun test <pattern>` | Run specific test file |
| `bun run build` | Build the library |
| `bun run lint` | Run Biome linter |
| `bun run format` | Format code with Biome |
| `bun run check` | Run all Biome checks (lint + format) |
| `bun run typecheck` | Run TypeScript type checking |

### Code Style

We use [Biome](https://biomejs.dev/) for linting and formatting. It's fast and handles both in one tool.

Before committing:

```bash
bun run check
```

This will lint and format your code. Biome is configured to:
- Use single quotes
- Use 2-space indentation
- 100 character line width
- Trailing commas (ES5 style)
- Organize imports automatically

### Component Structure

Each component lives in `src/components/ui/<component>/` with:

```
<component>/
├── <component>.tsx        # Implementation
├── <component>.test.tsx   # Tests
├── <component>.stories.tsx # Storybook stories
└── index.ts               # Re-exports
```

Components use:
- [Radix UI](https://radix-ui.com/) primitives for accessibility
- [CVA](https://cva.style/) (class-variance-authority) for variant styling
- `cn()` utility from `@/lib/utils` for class merging
- `forwardRef` for ref forwarding

### Writing Tests

Tests use Vitest + Testing Library. Every component needs tests.

```bash
# Run all tests
bun test

# Run specific test
bun test button

# Run with coverage
bun test:coverage
```

## Submitting Changes

1. Fork the repo
2. Create a branch: `git checkout -b my-feature`
3. Make your changes
4. Write/update tests
5. Run checks: `bun run check && bun test && bun run typecheck`
6. Commit with a clear message
7. Open a PR

### PR Guidelines

- Keep PRs focused - one feature/fix per PR
- Update/add tests for your changes
- Update Storybook stories if adding/modifying components
- Make sure all checks pass

## Questions?

Open an issue or ping [@jcpsimmons](https://github.com/jcpsimmons).
