import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Global test timeout */
  timeout: 30 * 1000, // 30 seconds
  /* Timeout for each assertion */
  expect: {
    timeout: 10 * 1000, // 10 seconds
    // Configure visual comparison settings for our retro CRT aesthetic
    toHaveScreenshot: {
      // Slight threshold for CRT shader effects and minor font rendering differences
      threshold: 0.15,
      animations: 'disabled',
    },
    toMatchSnapshot: {
      threshold: 0.15,
    },
  },
  /* Disable git info collection to avoid timeout warnings */
  metadata: {
    'git-commit-info': process.env.CI ? false : true,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Run tests in parallel */
  workers: 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5173',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Reduce animations for more stable visual testing */
    extraHTTPHeaders: {
      // Disable animations via CSS media query override  
    },
    
    /* For visual regression testing consistency */
    launchOptions: {
      args: [
        '--disable-web-security',
        '--disable-features=TranslateUI',
        '--disable-ipc-flooding-protection',
        // Ensure consistent font rendering
        '--font-render-hinting=none',
        '--disable-font-subpixel-positioning',
      ],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: process.env.CI ? 'pnpm run dev:ci' : 'pnpm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true, // Always reuse existing server
    timeout: 60 * 1000, // Increased timeout for CI
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
