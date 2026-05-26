/**
 * Shopify API client configuration for SkinTwin-ASI.
 *
 * Initialises the @shopify/shopify-api instance shared across all API routes.
 * Requires SHOPIFY_API_KEY, SHOPIFY_API_SECRET, HOST, and SCOPES env vars.
 */

import { shopifyApi, ApiVersion, LogSeverity } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2024-10';

// Validate required env vars at module load time (fails fast in production).
const requiredEnv = ['SHOPIFY_API_KEY', 'SHOPIFY_API_SECRET', 'HOST', 'SCOPES'] as const;
for (const key of requiredEnv) {
  if (!process.env[key]) {
    // Only throw at runtime, not during Next.js static analysis.
    if (process.env.NODE_ENV !== 'test') {
      console.warn(`[SkinTwin-ASI] Missing environment variable: ${key}`);
    }
  }
}

export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY ?? '',
  apiSecretKey: process.env.SHOPIFY_API_SECRET ?? '',
  scopes: (process.env.SCOPES ?? '').split(','),
  hostName: (process.env.HOST ?? '').replace(/^https?:\/\//, ''),
  hostScheme: 'https',
  apiVersion: ApiVersion.October24,
  isEmbeddedApp: true,
  restResources,
  logger: {
    level: process.env.NODE_ENV === 'production' ? LogSeverity.Error : LogSeverity.Info,
  },
});

export type ShopifySession = Awaited<ReturnType<typeof shopify.auth.callback>>['session'];
