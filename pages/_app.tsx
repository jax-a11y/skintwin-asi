/**
 * pages/_app.tsx
 *
 * Root Next.js app wrapper.  Sets up:
 * 1. Shopify App Bridge + Polaris (when running inside the Shopify admin)
 * 2. Redux store provider
 * 3. Global styles
 */

import React from 'react';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../src/lib/store';
import ShopifyProvider from '../src/components/shopify/ShopifyProvider';

export default function App({ Component, pageProps }: AppProps) {
  const apiKey = process.env.NEXT_PUBLIC_SHOPIFY_API_KEY ?? '';
  const host = typeof window !== 'undefined'
    ? (new URLSearchParams(window.location.search).get('host') ?? '')
    : '';

  return (
    <ReduxProvider store={store}>
      <ShopifyProvider apiKey={apiKey} host={host}>
        <Component {...pageProps} />
      </ShopifyProvider>
    </ReduxProvider>
  );
}
