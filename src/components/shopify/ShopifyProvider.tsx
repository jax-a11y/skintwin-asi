/**
 * ShopifyProvider.tsx
 *
 * Wraps the app with Shopify App Bridge and Polaris providers.
 * Must be used in pages/_app.tsx as the outermost provider.
 *
 * In App Bridge React v4, the bridge auto-initialises from the Shopify Admin
 * URL — no explicit <Provider> wrapper is required.  We only need to set up
 * the Polaris AppProvider for the design-system context.
 */

import React from 'react';
import { AppProvider as PolarisProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';

interface ShopifyProviderProps {
  apiKey: string;
  host: string;
  children: React.ReactNode;
}

/**
 * ShopifyProvider composes:
 * 1. Polaris AppProvider — Shopify design system + i18n
 *
 * App Bridge React v4 initialises automatically from the host/shop URL params
 * injected by the Shopify Admin — no manual <Provider> component needed.
 */
const ShopifyProvider: React.FC<ShopifyProviderProps> = ({ children }) => {
  return (
    <PolarisProvider i18n={enTranslations}>
      {children}
    </PolarisProvider>
  );
};

export default ShopifyProvider;
