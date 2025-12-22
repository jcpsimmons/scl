import '@testing-library/jest-dom/vitest'

// Mock pointer capture APIs for Radix UI components
Element.prototype.hasPointerCapture = () => false
Element.prototype.setPointerCapture = () => {}
Element.prototype.releasePointerCapture = () => {}

// Mock scrollIntoView for jsdom
Element.prototype.scrollIntoView = () => {}

// Mock ResizeObserver for Radix UI
window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
