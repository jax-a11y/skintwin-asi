/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },

  // Allow Shopify admin to embed the app in an iframe.
  // The Content-Security-Policy header is set per-shop at runtime via the
  // OAuth callback; here we relax the default X-Frame-Options for dev.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            // Shopify embedded apps must disable X-Frame-Options
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
        ],
      },
    ];
  },

  // Transpile Shopify packages so Next.js can handle their ESM builds.
  transpilePackages: [
    '@shopify/app-bridge-react',
    '@shopify/polaris',
  ],
}

module.exports = nextConfig
