/**
 * skincareSlice.ts — Redux slice for the Shopify-integrated ASI skincare core.
 *
 * Manages product skincare analysis, customer skin profiles, and ASI-generated
 * recommendations fetched from / persisted to the merchant's Shopify store.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SkinType = 'normal' | 'dry' | 'oily' | 'combination' | 'sensitive';
export type ConcernLevel = 'low' | 'moderate' | 'high';

export interface SkinConcern {
  name: string;
  level: ConcernLevel;
}

export interface SkinProfile {
  customerId: string;
  skinType: SkinType;
  concerns: SkinConcern[];
  spfPreference: boolean;
  fragranceFree: boolean;
  notes: string;
  updatedAt: string;
}

export interface IngredientAnalysis {
  ingredient: string;
  benefit: string;
  concern: string | null;
  efficacyScore: number; // 0–1
}

export interface ProductAnalysis {
  productId: string;
  productTitle: string;
  overallScore: number; // 0–1
  skinTypes: SkinType[];
  ingredients: IngredientAnalysis[];
  asiInsights: string[];
  analysedAt: string;
}

export interface SkincareRecommendation {
  id: string;
  customerId: string;
  products: Array<{ productId: string; reason: string }>;
  routine: { morning: string[]; evening: string[] };
  generatedAt: string;
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

interface SkincareState {
  /** Skin profiles keyed by Shopify customer ID */
  skinProfiles: Record<string, SkinProfile>;
  /** Product analyses keyed by Shopify product ID */
  productAnalyses: Record<string, ProductAnalysis>;
  /** Recommendations keyed by Shopify customer ID */
  recommendations: Record<string, SkincareRecommendation>;
  /** UI state */
  isAnalysing: boolean;
  selectedCustomerId: string | null;
  selectedProductId: string | null;
  error: string | null;
}

const initialState: SkincareState = {
  skinProfiles: {},
  productAnalyses: {},
  recommendations: {},
  isAnalysing: false,
  selectedCustomerId: null,
  selectedProductId: null,
  error: null,
};

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const skincareSlice = createSlice({
  name: 'skincare',
  initialState,
  reducers: {
    setSkinProfile(state, action: PayloadAction<SkinProfile>) {
      state.skinProfiles[action.payload.customerId] = action.payload;
    },

    setProductAnalysis(state, action: PayloadAction<ProductAnalysis>) {
      state.productAnalyses[action.payload.productId] = action.payload;
    },

    setRecommendation(state, action: PayloadAction<SkincareRecommendation>) {
      state.recommendations[action.payload.customerId] = action.payload;
    },

    selectCustomer(state, action: PayloadAction<string | null>) {
      state.selectedCustomerId = action.payload;
    },

    selectProduct(state, action: PayloadAction<string | null>) {
      state.selectedProductId = action.payload;
    },

    setAnalysing(state, action: PayloadAction<boolean>) {
      state.isAnalysing = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    resetSkincare() {
      return initialState;
    },
  },
});

export const skincareActions = skincareSlice.actions;
export default skincareSlice.reducer;
