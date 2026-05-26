/**
 * Playwright E2E Test Configuration for SkinTwin-ASI
 *
 * Supports:
 * - CI smoke tests (fast, required for PR merge)
 * - Local development with UI mode
 * - Full browser matrix (Chromium, Firefox, WebKit)
 * - Artifact capture on failure (screenshots, videos, traces)
 */

import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;
const baseURL = process.env.BASE_URL || 'http://localhost:3000';

export default defineConfig({
  testDir: './e2e',
  outputDir: './e2e-results',

  // Run tests in parallel
  fullyParallel: true,

  // Fail build on test.only in CI
  forbidOnly: isCI,

  // Retry on CI for flaky infrastructure
  retries: isCI ? 2 : 0,

  // CI uses sharding for parallel execution
  workers: isCI ? 1 : undefined,

  // Reporters
  reporter: isCI
    ? [
        ['github'],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
        ['junit', { outputFile: 'e2e-results/junit.xml' }],
        ['json', { outputFile: 'e2e-results/results.json' }],
      ]
    : [
        ['html', { open: 'on-failure' }],
        ['list'],
      ],

  // Timeout settings
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },

  // Global setup for all tests
  use: {
    baseURL,
    locale: 'en-US',
    timezoneId: 'UTC',

    // Capture artifacts on failure
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',

    // Ignore HTTPS errors for local dev
    ignoreHTTPSErrors: true,

    // Extra HTTP headers (can inject Shopify test headers)
    extraHTTPHeaders: {
      'X-Test-Mode': 'true',
    },
  },

  // Configure projects for different browsers and test categories
  projects: [
    // Smoke tests — fast subset for PR validation
    {
      name: 'smoke',
      testMatch: /.*\.smoke\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    // Full E2E tests — all browsers
    {
      name: 'chromium',
      testIgnore: /.*\.smoke\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: /.*\.smoke\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: /.*\.smoke\.spec\.ts/,
      use: { ...devices['Desktop Safari'] },
    },

    // Responsive viewport tests
    {
      name: 'mobile-chrome',
      testMatch: /.*\.responsive\.spec\.ts/,
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'tablet',
      testMatch: /.*\.responsive\.spec\.ts/,
      use: { ...devices['iPad (gen 7)'] },
    },

    // Accessibility tests
    {
      name: 'a11y',
      testMatch: /.*\.a11y\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Dev server configuration — starts Next.js for tests
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
    env: {
      ...process.env,
      NODE_ENV: 'test',
    },
  },
});
