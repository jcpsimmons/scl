# SCL Comprehensive Audit Report

**Date:** 2026-02-15
**Version Audited:** 0.3.3
**Auditor:** Automated

---

## Executive Summary

The SCL is a well-architected retro terminal-themed React component library built on Radix primitives with vanilla CSS. The foundation is solid — BEM-style CSS naming, design tokens, consistent patterns, and good Radix usage. This audit identifies gaps in accessibility, usability, theming, and developer experience, then implements improvements across the board.

---

## 1. Accessibility

### ✅ What's Working
- Radix primitives handle most ARIA roles/states automatically (accordion, dialog, tabs, etc.)
- `aria-hidden="true"` on decorative SVG icons
- `role="alert"` on Alert component
- Screen reader only text (`.scl-sr-only`) for dialog close button
- Focus-visible styles on buttons, tabs, toggles, switches

### ❌ Issues Found

| Issue | Severity | Components |
|-------|----------|------------|
| No `prefers-reduced-motion` support | High | All animated components |
| Skeleton has no implicit ARIA role | Medium | Skeleton |
| Progress doesn't pass `aria-label`/`aria-valuetext` | Medium | Progress |
| Focus styles use `box-shadow !important` instead of `outline` | Medium | Checkbox, Input, RadioGroup, Select, Textarea |
| No visible focus ring on Slider thumb | High | Slider |
| Badge is a `div` — should be `span` for inline semantics | Low | Badge |
| No `aria-live` region pattern for dynamic content | Medium | Alert, Progress |

### Improvements Implemented
1. Added `@media (prefers-reduced-motion: reduce)` to globals.css — disables all animations
2. Standardized focus styles to use `outline` consistently (removed `box-shadow !important` pattern)
3. Added `role="status"` and `aria-live="polite"` to Progress label area
4. Added visible focus ring to Slider thumb
5. Skeleton now includes `role="status"` and `aria-busy="true"` by default

---

## 2. Usability / Component API

### ✅ What's Working
- Consistent `forwardRef` pattern across all components
- `displayName` set on all components
- `cx()` utility for className merging
- `asChild` support on Button via Radix Slot
- Variant props with sensible defaults

### ❌ Issues Found

| Issue | Severity | Components |
|-------|----------|------------|
| No loading/disabled visual states beyond opacity | Medium | Button, Input |
| No error/invalid state styling for form inputs | High | Input, Textarea, Select |
| Collapsible exports raw Radix with no styling hooks | Low | Collapsible |
| `@vercel/analytics` is a runtime dependency (shouldn't be) | High | Package |

### Improvements Implemented
1. Added `error` prop to Input and Textarea for validation styling
2. Added `loading` prop to Button with terminal-style spinner
3. Moved `@vercel/analytics` to devDependencies (it's only for Storybook)
4. Added proper `CollapsibleContent` className for animation

---

## 3. Styling / Design

### ✅ What's Working
- Comprehensive CSS custom properties system
- Theme variants via CSS classes (`.scl-theme-yellow`, etc.)
- No border-radius anywhere (enforced in global reset) ✓
- Consistent use of design tokens for spacing, colors, typography
- BEM-style naming convention (`scl-component__element--modifier`)

### ❌ Issues Found

| Issue | Severity |
|-------|----------|
| No dark/light mode toggle (always dark — acceptable for terminal theme) | Info |
| `borderRadius` tokens exist in JS but should all be `0` | Medium |
| Typography tokens include `sans` font family (unused, confusing) | Low |
| Shadows tokens exist but are never used (correct for terminal theme) | Info |
| No `prefers-reduced-motion` media query | High |
| Skeleton uses hardcoded HSL values instead of tokens | Low |

### Improvements Implemented
1. `borderRadius` tokens updated — all values are `'0px'` (sharp corners only)
2. Added `prefers-reduced-motion: reduce` global rule
3. Skeleton CSS now uses CSS custom properties
4. Added `prefers-color-scheme` light mode variant (optional, off by default)
5. Typography tokens: added `terminal` font family entry for BigBlueTerm437

---

## 4. Component-by-Component Audit

| Component | A11y | API | Styling | Stories | Notes |
|-----------|------|-----|---------|---------|-------|
| Accordion | ✅ | ✅ | ✅ | ✅ | Radix handles ARIA |
| Alert | ✅ | ✅ | ✅ | ✅ | Has `role="alert"` |
| Avatar | ✅ | ✅ | ✅ | ✅ | Radix fallback pattern |
| Badge | ⚠️ | ✅ | ✅ | ✅ | Changed to `span` |
| Button | ⚠️ | ✅ | ✅ | ✅ | Added loading state |
| Card | ✅ | ✅ | ✅ | ✅ | Semantic HTML |
| Checkbox | ⚠️ | ✅ | ⚠️ | ✅ | Fixed focus style |
| Collapsible | ✅ | ⚠️ | ⚠️ | ✅ | Added CSS class |
| Dialog | ✅ | ✅ | ✅ | ✅ | Focus trap via Radix |
| Input | ⚠️ | ⚠️ | ⚠️ | ✅ | Added error state |
| Label | ✅ | ✅ | ✅ | ✅ | Clean |
| Popover | ✅ | ✅ | ✅ | ✅ | Radix handles ARIA |
| Progress | ⚠️ | ✅ | ✅ | ✅ | Added aria-live |
| RadioGroup | ⚠️ | ✅ | ⚠️ | ✅ | Fixed focus style |
| ScrollArea | ✅ | ✅ | ✅ | ✅ | Custom scrollbar |
| Select | ⚠️ | ✅ | ⚠️ | ✅ | Fixed focus style |
| Separator | ✅ | ✅ | ✅ | ✅ | Decorative default |
| Skeleton | ⚠️ | ✅ | ⚠️ | ✅ | Added ARIA attrs |
| Slider | ⚠️ | ✅ | ⚠️ | ✅ | Added focus ring |
| Switch | ✅ | ✅ | ✅ | ✅ | Good focus styles |
| Table | ✅ | ✅ | ✅ | ✅ | Semantic HTML |
| Tabs | ✅ | ✅ | ✅ | ✅ | Radix handles ARIA |
| Textarea | ⚠️ | ⚠️ | ⚠️ | ✅ | Added error state |
| Toggle | ✅ | ✅ | ✅ | ✅ | Clean |
| Tooltip | ✅ | ✅ | ✅ | ✅ | Radix handles ARIA |

---

## 5. Build / DX

### ✅ What's Working
- Vite library mode with ES modules
- `preserveModules` for tree shaking
- TypeScript strict mode
- `vite-plugin-dts` for declaration files
- Biome for linting/formatting
- Storybook with a11y addon
- CSS code-split disabled (single bundle — appropriate for this lib)

### ❌ Issues Found

| Issue | Severity |
|-------|----------|
| `@vercel/analytics` in `dependencies` (should be devDep) | High |
| No JSDoc on most exported components/types | Medium |
| Stories exist for all components (good!) | ✅ |

### Improvements Implemented
1. Moved `@vercel/analytics` to `devDependencies`
2. Added JSDoc comments to all exported components and types
3. Version bumped to 0.4.0

---

## 6. New Components

Not adding new components in this release to keep scope focused. Recommended for 0.5.0:
- Toast/Notification (via Radix Toast)
- DropdownMenu (Radix already in deps)
- Sheet/Drawer (extend Dialog)
- Breadcrumb (custom)
- NavigationMenu (Radix)

---

## Changes Summary (0.3.3 → 0.4.0)

### Breaking
- None

### Added
- `prefers-reduced-motion` support globally
- `error` prop on Input and Textarea
- `loading` prop on Button
- `role="status"` + `aria-busy` on Skeleton
- `aria-live="polite"` on Progress label
- JSDoc on all exported components
- Light mode CSS custom properties (opt-in via `.scl-theme-light`)

### Fixed
- Focus styles standardized to `outline` (removed `box-shadow !important`)
- Slider thumb now has visible focus ring
- Badge changed from `div` to `span`
- Skeleton uses CSS custom properties instead of hardcoded values
- `@vercel/analytics` moved to devDependencies
- `borderRadius` tokens all return `'0px'`
- Collapsible content now has proper CSS class

### Updated
- All component stories verified
- Typography tokens include terminal font family
