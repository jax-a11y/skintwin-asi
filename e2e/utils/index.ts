/**
 * E2E utility functions for SkinTwin-ASI tests
 *
 * Provides:
 * - Accessibility testing helpers
 * - API mocking utilities
 * - Viewport helpers
 */

import { Page, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// ---------------------------------------------------------------------------
// Accessibility testing
// ---------------------------------------------------------------------------

export interface A11yViolation {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  description: string;
  helpUrl: string;
  nodes: Array<{ html: string; target: string[] }>;
}

export async function checkAccessibility(
  page: Page,
  options?: {
    includedImpacts?: ('minor' | 'moderate' | 'serious' | 'critical')[];
    excludeSelectors?: string[];
  }
): Promise<A11yViolation[]> {
  const includedImpacts = options?.includedImpacts ?? ['serious', 'critical'];

  let builder = new AxeBuilder({ page });

  if (options?.excludeSelectors) {
    builder = builder.exclude(options.excludeSelectors);
  }

  const results = await builder.analyze();

  const violations = results.violations
    .filter((v) => includedImpacts.includes(v.impact as any))
    .map((v) => ({
      id: v.id,
      impact: v.impact as A11yViolation['impact'],
      description: v.description,
      helpUrl: v.helpUrl,
      nodes: v.nodes.map((n) => ({
        html: n.html,
        target: n.target as string[],
      })),
    }));

  return violations;
}

export async function expectNoA11yViolations(
  page: Page,
  options?: Parameters<typeof checkAccessibility>[1]
) {
  const violations = await checkAccessibility(page, options);

  if (violations.length > 0) {
    const formatted = violations
      .map(
        (v) =>
          `[${v.impact}] ${v.id}: ${v.description}\n` +
          `  Help: ${v.helpUrl}\n` +
          v.nodes.map((n) => `  - ${n.html}`).join('\n')
      )
      .join('\n\n');

    throw new Error(`Accessibility violations found:\n\n${formatted}`);
  }
}

// ---------------------------------------------------------------------------
// Viewport helpers
// ---------------------------------------------------------------------------

export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
  widescreen: { width: 1920, height: 1080 },
};

export async function setViewport(
  page: Page,
  viewport: keyof typeof VIEWPORTS | { width: number; height: number }
) {
  const size = typeof viewport === 'string' ? VIEWPORTS[viewport] : viewport;
  await page.setViewportSize(size);
}

// ---------------------------------------------------------------------------
// Wait helpers
// ---------------------------------------------------------------------------

export async function waitForHydration(page: Page) {
  // Wait for Next.js hydration to complete
  await page.waitForFunction(() => {
    return document.querySelector('[data-nextjs-scroll-focus-boundary]') !== null ||
           !document.querySelector('[data-nextjs-build-indicator]');
  }, { timeout: 10000 }).catch(() => {
    // Fallback: wait for network idle
  });

  // Additional stabilization wait
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
    // Network may not fully idle in some scenarios
  });
}

export async function waitForTabContent(page: Page, tabName: string) {
  // Wait for tab content to be visible after switching
  const tabPanel = page.locator(`[role="tabpanel"]:visible`);
  await expect(tabPanel).toBeVisible({ timeout: 5000 });
}

// ---------------------------------------------------------------------------
// API mocking helpers
// ---------------------------------------------------------------------------

export async function mockShopifyAuth(page: Page) {
  // Mock the OAuth endpoints for testing without real Shopify
  await page.route('/api/auth', async (route) => {
    const url = new URL(route.request().url());
    const shop = url.searchParams.get('shop');

    if (!shop) {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Missing `shop` query parameter.' }),
      });
    } else {
      // Simulate redirect to Shopify OAuth (mock it)
      await route.fulfill({
        status: 302,
        headers: {
          Location: `https://${shop}/admin/oauth/authorize?client_id=test`,
        },
      });
    }
  });

  await page.route('/api/auth/callback', async (route) => {
    const url = new URL(route.request().url());
    const shop = url.searchParams.get('shop') || 'test-shop.myshopify.com';
    const host = url.searchParams.get('host') || 'encoded-host';

    await route.fulfill({
      status: 302,
      headers: {
        Location: `/?shop=${shop}&host=${host}`,
      },
    });
  });
}

export async function mockWebhooks(page: Page) {
  await page.route('/api/webhooks/*', async (route) => {
    const topic = route.request().url().split('/').pop();

    // Simulate webhook validation failure for tests
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, topic }),
    });
  });
}

// ---------------------------------------------------------------------------
// Assertion helpers
// ---------------------------------------------------------------------------

export async function expectBadgeCount(page: Page, selector: string, count: number) {
  const badges = page.locator(selector);
  await expect(badges).toHaveCount(count);
}

export async function expectProgressBarValue(page: Page, expectedPercent: number, tolerance = 5) {
  const progressBar = page.getByRole('progressbar');
  const value = await progressBar.getAttribute('aria-valuenow');
  const numValue = parseFloat(value || '0');

  expect(numValue).toBeGreaterThanOrEqual(expectedPercent - tolerance);
  expect(numValue).toBeLessThanOrEqual(expectedPercent + tolerance);
}
