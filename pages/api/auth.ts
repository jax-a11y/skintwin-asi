/**
 * pages/api/auth.ts
 *
 * Shopify OAuth entry point.
 * Redirects the merchant to Shopify's OAuth authorisation page.
 *
 * Query params expected: shop (e.g. my-store.myshopify.com)
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { shopify } from '../../src/lib/shopify/shopifyClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const shop = typeof req.query.shop === 'string' ? req.query.shop : '';

  if (!shop) {
    res.status(400).json({ error: 'Missing `shop` query parameter.' });
    return;
  }

  await shopify.auth.begin({
    shop: shopify.utils.sanitizeShop(shop, true) as string,
    callbackPath: '/api/auth/callback',
    isOnline: false,
    rawRequest: req,
    rawResponse: res,
  });
}
