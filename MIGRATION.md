# Migration Guide: SCL 0.2.x → 0.3.0

This guide documents breaking changes when upgrading from SCL 0.2.x to 0.3.0.

## Overview

SCL 0.3.0 is a complete rebuild using pure Radix primitives and vanilla CSS. All Tailwind CSS dependencies have been removed.

## Breaking Changes

### 1. Button Variant Rename

The `default` variant has been renamed to `primary`.

**Before (0.2.x):**
```tsx
<Button variant="default">Click me</Button>
```

**After (0.3.0):**
```tsx
<Button variant="primary">Click me</Button>
```

**Migration:** Find and replace all instances of `variant="default"` with `variant="primary"` in your Button components.

### 2. CSS Class Names

All components now use BEM-like CSS class names prefixed with `scl-`.

**Before (0.2.x):** Tailwind utility classes
```html
<button class="bg-primary text-primary-foreground h-10 px-4">
```

**After (0.3.0):** SCL CSS classes
```html
<button class="scl-button scl-button--primary scl-button--default">
```

### 3. Removed Components

The following components have been removed in 0.3.0:

| Component | Reason |
|-----------|--------|
| `AlertDialog` | Depended on removed dependencies |
| `Command` | Depended on `cmdk` package |
| `Combobox` | Depended on `cmdk` package |
| `DropdownMenu` | Depended on `lucide-react` |
| `Form` | Depended on `react-hook-form` |
| `Sheet` | Depended on `vaul` and `lucide-react` |
| `DitheredImage` | Custom component removed |
| `Statusline` | Custom component removed |
| `TerminalTextarea` | Custom component removed |

### 4. Removed Exports

The following exports have been removed:

- `buttonVariants` → Use `ButtonVariant` type instead
- `badgeVariants` → Use `BadgeVariant` type instead
- `toggleVariants` → Use `ToggleSize` type instead

### 5. CSS Import

You must import the global CSS file for components to render correctly:

```tsx
import '@drjoshcsimmons/scl/dist/globals.css';
```

### 6. Removed Dependencies

The following peer dependencies are no longer required:

- `tailwindcss`
- `postcss`
- `autoprefixer`
- `class-variance-authority`
- `tailwind-merge`
- `clsx`
- `lucide-react`
- `cmdk`
- `react-hook-form`
- `@hookform/resolvers`
- `zod`
- `vaul`

## New Features

### CSS Custom Properties

All design tokens are now available as CSS custom properties:

```css
:root {
  --scl-primary: hsl(120, 100%, 50%);
  --scl-secondary: hsl(300, 100%, 50%);
  --scl-destructive: hsl(0, 100%, 50%);
  --scl-space-4: 1rem;
  /* ... */
}
```

### Theme Classes

Apply theme variants using CSS classes:

```tsx
<div className="scl-theme-yellow">
  {/* Components use yellow as primary color */}
</div>
```

Available themes: `scl-theme-yellow`, `scl-theme-blue`, `scl-theme-white`, `scl-theme-amber`, `scl-theme-hotpink`, `scl-theme-cyan`

## Full Component List (0.3.0)

The following 25 components are available:

- Accordion
- Alert
- Avatar
- Badge
- Button
- Card
- Checkbox
- Collapsible
- Dialog
- Input
- Label
- Popover
- Progress
- RadioGroup
- ScrollArea
- Select
- Separator
- Skeleton
- Slider
- Switch
- Table
- Tabs
- Textarea
- Toggle
- Tooltip
