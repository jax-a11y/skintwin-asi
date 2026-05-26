/**
 * CustomerSkinProfile.tsx
 *
 * Polaris form for capturing and persisting a Shopify customer's skin profile.
 * The profile feeds into the ASI Relevance Realization Framework to personalise
 * product recommendations.
 */

import React, { useState, useCallback } from 'react';
import {
  Card,
  Text,
  Button,
  Select,
  Checkbox,
  TextField,
  BlockStack,
  InlineStack,
  Badge,
  Banner,
} from '@shopify/polaris';
import { useAppDispatch, useAppSelector } from '../../lib/store';
import {
  skincareActions,
  SkinProfile,
  SkinType,
  SkinConcern,
  ConcernLevel,
} from '../../lib/shopify/skincareSlice';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SKIN_TYPES: Array<{ label: string; value: SkinType }> = [
  { label: 'Normal', value: 'normal' },
  { label: 'Dry', value: 'dry' },
  { label: 'Oily', value: 'oily' },
  { label: 'Combination', value: 'combination' },
  { label: 'Sensitive', value: 'sensitive' },
];

const COMMON_CONCERNS: Array<{ name: string; label: string }> = [
  { name: 'acne', label: 'Acne / Breakouts' },
  { name: 'hyperpigmentation', label: 'Hyperpigmentation' },
  { name: 'dryness', label: 'Dryness / Dehydration' },
  { name: 'anti-aging', label: 'Anti-Aging / Fine Lines' },
  { name: 'redness', label: 'Redness / Rosacea' },
  { name: 'pores', label: 'Enlarged Pores' },
  { name: 'uneven-texture', label: 'Uneven Texture' },
  { name: 'dark-circles', label: 'Dark Circles' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface Props {
  customerId: string;
  customerName?: string;
}

const CustomerSkinProfile: React.FC<Props> = ({ customerId, customerName = 'Customer' }) => {
  const dispatch = useAppDispatch();
  const existing = useAppSelector((s) => s.skincare.skinProfiles[customerId]);

  const [skinType, setSkinType] = useState<SkinType>(existing?.skinType ?? 'normal');
  const [selectedConcerns, setSelectedConcerns] = useState<Record<string, ConcernLevel>>(
    Object.fromEntries((existing?.concerns ?? []).map((c) => [c.name, c.level])),
  );
  const [spfPreference, setSpfPreference] = useState(existing?.spfPreference ?? true);
  const [fragranceFree, setFragranceFree] = useState(existing?.fragranceFree ?? false);
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [saved, setSaved] = useState(false);

  const handleConcernToggle = useCallback((name: string) => {
    setSelectedConcerns((prev) => {
      const next = { ...prev };
      if (next[name]) {
        delete next[name];
      } else {
        next[name] = 'moderate';
      }
      return next;
    });
  }, []);

  const handleSave = useCallback(() => {
    const concerns: SkinConcern[] = Object.entries(selectedConcerns).map(([name, level]) => ({
      name,
      level,
    }));

    const profile: SkinProfile = {
      customerId,
      skinType,
      concerns,
      spfPreference,
      fragranceFree,
      notes,
      updatedAt: new Date().toISOString(),
    };

    dispatch(skincareActions.setSkinProfile(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, [customerId, skinType, selectedConcerns, spfPreference, fragranceFree, notes, dispatch]);

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">
          👤 Skin Profile — {customerName}
        </Text>

        <Text as="p" variant="bodySm" tone="subdued">
          Capture this customer&apos;s skin characteristics. The ASI Relevance Realization
          Framework uses these attributes to personalise product recommendations.
        </Text>

        {/* Skin type */}
        <Select
          label="Skin Type"
          options={SKIN_TYPES}
          value={skinType}
          onChange={(val) => setSkinType(val as SkinType)}
        />

        {/* Concerns */}
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm">Skin Concerns</Text>
          <InlineStack gap="200" wrap>
            {COMMON_CONCERNS.map(({ name, label }) => (
              <Checkbox
                key={name}
                label={label}
                checked={Boolean(selectedConcerns[name])}
                onChange={() => handleConcernToggle(name)}
              />
            ))}
          </InlineStack>
        </BlockStack>

        {/* Active concerns summary */}
        {Object.keys(selectedConcerns).length > 0 && (
          <InlineStack gap="100" wrap>
            {Object.keys(selectedConcerns).map((name) => (
              <Badge key={name} tone="info">{name}</Badge>
            ))}
          </InlineStack>
        )}

        {/* Preferences */}
        <BlockStack gap="100">
          <Text as="h3" variant="headingSm">Preferences</Text>
          <Checkbox label="SPF preferred" checked={spfPreference} onChange={setSpfPreference} />
          <Checkbox label="Fragrance-free" checked={fragranceFree} onChange={setFragranceFree} />
        </BlockStack>

        {/* Notes */}
        <TextField
          label="Additional Notes"
          value={notes}
          onChange={setNotes}
          multiline={3}
          placeholder="Allergies, medications, previous reactions…"
          autoComplete="off"
        />

        <Button variant="primary" onClick={handleSave}>Save Skin Profile</Button>

        {saved && (
          <Banner title="Profile saved" tone="success">
            <Text as="p" variant="bodySm">
              Skin profile updated successfully. ASI will use this data to personalise recommendations.
            </Text>
          </Banner>
        )}
      </BlockStack>
    </Card>
  );
};

export default CustomerSkinProfile;
