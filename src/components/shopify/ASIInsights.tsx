/**
 * ASIInsights.tsx
 *
 * Dashboard panel showing the live state of the ASI cognitive core —
 * Deep Tree Echo, Marduk, and the Relevance Realization Framework —
 * as applied to the merchant's skincare catalogue.
 */

import React from 'react';
import {
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  ProgressBar,
  Divider,
} from '@shopify/polaris';
import { useAppSelector } from '../../lib/store';

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function percent(val: number) {
  return Math.round(val * 100);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface MetricRowProps {
  label: string;
  value: number;
  tone?: 'success' | 'highlight' | 'critical';
}

const MetricRow: React.FC<MetricRowProps> = ({ label, value, tone = 'highlight' }) => (
  <BlockStack gap="100">
    <InlineStack gap="200" blockAlign="center">
      <Text as="span" variant="bodySm">{label}</Text>
      <Text as="span" variant="bodyXs" tone="subdued">{percent(value)}%</Text>
    </InlineStack>
    <ProgressBar progress={percent(value)} size="small" tone={tone} />
  </BlockStack>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const ASIInsights: React.FC = () => {
  const skincare = useAppSelector((s) => s.skincare);
  const deepTreeEcho = useAppSelector((s) => s.deepTreeEcho);
  const marduk = useAppSelector((s) => s.marduk);

  const analysedProducts = Object.values(skincare.productAnalyses);
  const savedProfiles = Object.values(skincare.skinProfiles);

  const avgScore =
    analysedProducts.length > 0
      ? analysedProducts.reduce((sum, p) => sum + p.overallScore, 0) / analysedProducts.length
      : 0;

  return (
    <Card>
      <BlockStack gap="400">
        {/* Header */}
        <InlineStack gap="200" blockAlign="center">
          <Text as="h2" variant="headingMd">ASI Cognitive Core Status</Text>
          <Badge tone={deepTreeEcho.isInitialized ? 'success' : 'warning'}>
            {deepTreeEcho.isInitialized ? 'Online' : 'Idle'}
          </Badge>
        </InlineStack>

        <Text as="p" variant="bodySm" tone="subdued">
          The Artificial Skincare Intelligence core monitors your catalogue and customer
          profiles in real-time, surfacing ingredient synergies, skin-type compatibility,
          and personalised routines.
        </Text>

        <Divider />

        {/* Deep Tree Echo status */}
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm">🌲 Deep Tree Echo (Right Hemisphere)</Text>
          <Text as="p" variant="bodyXs" tone="subdued">
            Pattern recognition across ingredient combinations and skin-type signals.
          </Text>
          <MetricRow
            label="Novelty threshold"
            value={deepTreeEcho.noveltyThreshold}
            tone="highlight"
          />
          <InlineStack gap="100">
            <Badge tone={deepTreeEcho.patternRecognitionActive ? 'success' : 'warning'}>
              {`Pattern recognition ${deepTreeEcho.patternRecognitionActive ? 'active' : 'inactive'}`}
            </Badge>
          </InlineStack>
        </BlockStack>

        <Divider />

        {/* Marduk status */}
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm">⚖️ Marduk (Left Hemisphere)</Text>
          <Text as="p" variant="bodyXs" tone="subdued">
            Categorical logic structures skincare data into intervention blueprints.
          </Text>
          <InlineStack gap="100">
            <Badge tone={marduk.isActive ? 'success' : 'warning'}>
              {marduk.isActive ? 'Active' : 'Standby'}
            </Badge>
            {marduk.isInitialized && <Badge tone="info">Initialised</Badge>}
          </InlineStack>
        </BlockStack>

        <Divider />

        {/* Catalogue summary */}
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm">📊 Catalogue Intelligence</Text>

          <InlineStack gap="400" wrap>
            <BlockStack gap="050">
              <Text as="span" variant="headingLg">{analysedProducts.length}</Text>
              <Text as="span" variant="bodyXs" tone="subdued">Products analysed</Text>
            </BlockStack>
            <BlockStack gap="050">
              <Text as="span" variant="headingLg">{savedProfiles.length}</Text>
              <Text as="span" variant="bodyXs" tone="subdued">Skin profiles</Text>
            </BlockStack>
            <BlockStack gap="050">
              <Text as="span" variant="headingLg">{percent(avgScore)}%</Text>
              <Text as="span" variant="bodyXs" tone="subdued">Avg efficacy score</Text>
            </BlockStack>
          </InlineStack>

          {analysedProducts.length > 0 && (
            <MetricRow
              label="Average product efficacy"
              value={avgScore}
              tone={avgScore > 0.7 ? 'success' : avgScore > 0.4 ? 'highlight' : 'critical'}
            />
          )}
        </BlockStack>

        {/* Top insights across products */}
        {analysedProducts.length > 0 && (
          <>
            <Divider />
            <BlockStack gap="200">
              <Text as="h3" variant="headingSm">💡 Recent ASI Insights</Text>
              {analysedProducts
                .flatMap((p) => p.asiInsights.map((ins) => ({ product: p.productTitle, insight: ins })))
                .slice(0, 5)
                .map(({ product, insight }, i) => (
                  <InlineStack key={i} gap="200" wrap>
                    <Badge tone="info">{product}</Badge>
                    <Text as="span" variant="bodySm">{insight}</Text>
                  </InlineStack>
                ))}
            </BlockStack>
          </>
        )}
      </BlockStack>
    </Card>
  );
};

export default ASIInsights;
