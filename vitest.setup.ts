import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'

// Mock window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// Global cleanup after each test
afterEach(() => {
  // Clear all mocks to prevent test interference
  vi.clearAllMocks()

  // Restore real timers to prevent leakage
  vi.useRealTimers()

  // Clear all timers to prevent hanging tests
  vi.clearAllTimers()
})
