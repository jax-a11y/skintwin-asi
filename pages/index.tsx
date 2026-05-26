/**
 * pages/index.tsx
 *
 * Main embedded Shopify admin page for SkinTwin-ASI.
 * Renders the ASI cognitive core dashboard with Polaris layout.
 */

import React, { useState } from 'react';
import {
  Page,
  Layout,
  Tabs,
  Text,
  Banner,
  BlockStack,
} from '@shopify/polaris';
import type { NextPage } from 'next';
import SkincareProductAnalyzer from '../src/components/shopify/SkincareProductAnalyzer';
import CustomerSkinProfile from '../src/components/shopify/CustomerSkinProfile';
import ASIInsights from '../src/components/shopify/ASIInsights';

const tabs = [
  { id: 'insights',  content: 'ASI Insights' },
  { id: 'analyzer',  content: 'Product Analyzer' },
  { id: 'profiles',  content: 'Skin Profiles' },
];

const SkinTwinDashboard: NextPage = () => {
  const [selected, setSelected] = useState(0);

  return (
    <Page
      title="SkinTwin ASI"
      subtitle="Artificial Skincare Intelligence for your Shopify store"
      primaryAction={{ content: 'View Documentation', url: '#' }}
    >
      <Layout>
        <Layout.Section>
          <Banner title="Welcome to SkinTwin ASI" tone="info">
            <BlockStack gap="100">
              <Text as="p" variant="bodySm">
                The ASI core combines <strong>Deep Tree Echo</strong> (pattern recognition)
                and <strong>Marduk</strong> (categorical intelligence) to analyse your skincare
                catalogue and personalise customer journeys.
              </Text>
            </BlockStack>
          </Banner>
        </Layout.Section>

        <Layout.Section>
          <Tabs tabs={tabs} selected={selected} onSelect={setSelected}>
            {selected === 0 && <ASIInsights />}
            {selected === 1 && (
              <SkincareProductAnalyzer
                productId="demo-product"
                productTitle="Demo Product"
              />
            )}
            {selected === 2 && (
              <CustomerSkinProfile
                customerId="demo-customer"
                customerName="Demo Customer"
              />
            )}
          </Tabs>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default SkinTwinDashboard;
