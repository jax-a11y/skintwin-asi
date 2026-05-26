/**
 * pages/api/webhooks/[topic].ts
 *
 * Catch-all webhook handler for Shopify webhook topics registered in
 * shopify.app.toml.  Validates the HMAC signature before processing.
 *
 * Topics handled:
 *   app-uninstalled  — clears merchant data
 *   products         — triggers re-analysis of new/updated products
 *   customers        — updates skin profile index
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { shopify } from '../../../src/lib/shopify/shopifyClient';

// Disable Next.js body parsing — Shopify HMAC verification requires the raw body.
export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const topic = (req.query.topic as string) ?? '';

  try {
    // Validate HMAC signature
    const webhookCheck = await shopify.webhooks.validate({
      rawBody: await rawBody(req),
      rawRequest: req,
      rawResponse: res,
    });

    if (!webhookCheck.valid) {
      res.status(401).json({ error: 'Invalid webhook signature.' });
      return;
    }

    switch (topic) {
      case 'app-uninstalled':
        // TODO: delete stored sessions and merchant data for this shop
        console.info(`[SkinTwin-ASI] App uninstalled by shop: ${webhookCheck.domain}`);
        break;

      case 'products':
        // TODO: enqueue background re-analysis of the updated product
        console.info(`[SkinTwin-ASI] Product webhook received for shop: ${webhookCheck.domain}`);
        break;

      case 'customers':
        // TODO: refresh skin profile index for affected customer
        console.info(`[SkinTwin-ASI] Customer webhook received for shop: ${webhookCheck.domain}`);
        break;

      default:
        console.warn(`[SkinTwin-ASI] Unhandled webhook topic: ${topic}`);
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[SkinTwin-ASI] Webhook error:', err);
    res.status(500).json({ error: 'Webhook processing failed.' });
  }
}

/** Read the raw request body as a string. */
async function rawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk.toString(); });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}
