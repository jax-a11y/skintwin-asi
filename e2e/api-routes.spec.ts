/**
 * API Route E2E Tests
 *
 * Tests the Next.js API routes for OAuth and webhooks.
 */

import { test, expect } from '@playwright/test';

test.describe('OAuth API Routes', () => {
  test.describe('/api/auth', () => {
    test('returns 400 for missing shop parameter', async ({ request }) => {
      const response = await request.get('/api/auth');

      expect(response.status()).toBe(400);

      const body = await response.json();
      expect(body.error).toContain('shop');
    });

    test('returns 400 for empty shop parameter', async ({ request }) => {
      const response = await request.get('/api/auth?shop=');

      expect(response.status()).toBe(400);
    });

    // Note: Full OAuth flow cannot be tested without real Shopify integration
    // These tests verify the validation layer
  });

  test.describe('/api/auth/callback', () => {
    test('returns error for invalid callback request', async ({ request }) => {
      // Direct call without valid OAuth state should fail
      const response = await request.get('/api/auth/callback');

      // Should return error status (not 200)
      expect(response.status()).toBeGreaterThanOrEqual(400);
    });

    test('returns error for missing required params', async ({ request }) => {
      const response = await request.get('/api/auth/callback?code=test');

      expect(response.status()).toBeGreaterThanOrEqual(400);
    });
  });
});

test.describe('Webhook API Routes', () => {
  test.describe('/api/webhooks/[topic]', () => {
    test('returns 401 for requests without valid HMAC', async ({ request }) => {
      const response = await request.post('/api/webhooks/products', {
        data: { test: 'payload' },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Should reject without valid signature
      expect(response.status()).toBe(401);

      const body = await response.json();
      expect(body.error).toContain('signature');
    });

    test('handles app-uninstalled topic', async ({ request }) => {
      // Note: Without valid HMAC, this will return 401
      // This test verifies the route exists and responds
      const response = await request.post('/api/webhooks/app-uninstalled', {
        data: { shop: 'test-shop.myshopify.com' },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Route exists and responds (even if 401 for invalid sig)
      expect(response.status()).toBe(401);
    });

    test('handles products topic', async ({ request }) => {
      const response = await request.post('/api/webhooks/products', {
        data: { id: 123, title: 'Test Product' },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(response.status()).toBe(401);
    });

    test('handles customers topic', async ({ request }) => {
      const response = await request.post('/api/webhooks/customers', {
        data: { id: 456, email: 'test@example.com' },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(response.status()).toBe(401);
    });

    test('handles unknown topic gracefully', async ({ request }) => {
      const response = await request.post('/api/webhooks/unknown-topic', {
        data: { test: 'data' },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Should still reject for invalid signature
      expect(response.status()).toBe(401);
    });
  });
});

test.describe('API Error Handling', () => {
  test('404 for non-existent API routes', async ({ request }) => {
    const response = await request.get('/api/nonexistent');

    expect(response.status()).toBe(404);
  });

  test('API routes handle malformed JSON', async ({ request }) => {
    const response = await request.post('/api/webhooks/products', {
      data: 'not valid json{',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Should handle gracefully (either 400 or 401 for sig check first)
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});
