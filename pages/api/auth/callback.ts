/**
 * pages/api/auth/callback.ts
 *
 * Shopify OAuth callback handler.
 * Exchanges the one-time OAuth code for a permanent access token and
 * then redirects the merchant to the embedded app home page.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { shopify } from '../../../src/lib/shopify/shopifyClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const callback = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const { session } = callback;
    const host = req.query.host as string;
    const shop = session.shop;

    // In production: persist the session to a database here.
    // For now we log success and redirect to the embedded app.
    console.info(`[SkinTwin-ASI] OAuth complete for shop: ${shop}`);

    const redirectUrl = `/?shop=${shop}&host=${host}`;
    res.redirect(302, redirectUrl);
  } catch (err) {
    console.error('[SkinTwin-ASI] OAuth callback error:', err);
    res.status(500).json({ error: 'OAuth callback failed. Please try reinstalling the app.' });
  }
}
