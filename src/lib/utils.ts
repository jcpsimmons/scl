/**
 * Combines class names, filtering out falsy values.
 * Replacement for clsx/tailwind-merge without Tailwind dependency.
 *
 * @param classes - Class values to combine (strings, undefined, null, false)
 * @returns Combined class string
 *
 * @example
 * cx('scl-button', isActive && 'scl-button--active') // 'scl-button scl-button--active'
 * cx('base', undefined, 'extra') // 'base extra'
 */
export function cx(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(' ');
}

// Keep cn as alias for backwards compatibility during migration
export const cn = cx;
