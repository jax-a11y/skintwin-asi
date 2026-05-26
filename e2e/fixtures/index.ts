/**
 * Shared Playwright fixtures for SkinTwin-ASI E2E tests
 *
 * Provides:
 * - Custom test fixtures with page utilities
 * - Mock data generators
 * - Reusable assertions
 */

import { test as base, expect, Page, Locator } from '@playwright/test';

// ---------------------------------------------------------------------------
// Test data fixtures
// ---------------------------------------------------------------------------

export interface IngredientTestData {
  name: string;
  raw: string;
  expectedScore: number;
  expectedBenefits: string[];
  expectedConcerns: string[];
  expectedInsights: string[];
}

export const INGREDIENT_FIXTURES: Record<string, IngredientTestData> = {
  beneficial: {
    name: 'Beneficial Mix',
    raw: 'Aqua, Hyaluronic Acid, Niacinamide, Ceramide NP, Squalane',
    expectedScore: 90, // Approximate
    expectedBenefits: ['Deep hydration', 'Pore minimising', 'Barrier repair'],
    expectedConcerns: [],
    expectedInsights: ['Hyaluronic acid + ceramide synergy'],
  },
  concerns: {
    name: 'Concern Ingredients',
    raw: 'Aqua, Alcohol Denat, Fragrance, Sodium Lauryl Sulfate',
    expectedScore: 0,
    expectedBenefits: [],
    expectedConcerns: ['dryness', 'sensitiser', 'Strips natural oils'],
    expectedInsights: [],
  },
  mixed: {
    name: 'Mixed Product',
    raw: 'Aqua, Retinol, Vitamin C, Fragrance',
    expectedScore: 85,
    expectedBenefits: ['Anti-aging', 'Antioxidant'],
    expectedConcerns: ['sensitiser'],
    expectedInsights: ['Retinol + Vitamin C', 'AM/PM split'],
  },
  unknown: {
    name: 'Unknown Ingredients',
    raw: 'Aqua, Glycerin, Propylene Glycol',
    expectedScore: 0,
    expectedBenefits: [],
    expectedConcerns: [],
    expectedInsights: ['No recognised active ingredients'],
  },
  empty: {
    name: 'Empty Input',
    raw: '',
    expectedScore: 0,
    expectedBenefits: [],
    expectedConcerns: [],
    expectedInsights: [],
  },
};

export const SKIN_PROFILE_FIXTURES = {
  default: {
    skinType: 'normal' as const,
    concerns: [] as string[],
    spfPreference: true,
    fragranceFree: false,
    notes: '',
  },
  sensitive: {
    skinType: 'sensitive' as const,
    concerns: ['redness', 'dryness'],
    spfPreference: true,
    fragranceFree: true,
    notes: 'Allergic to parabens',
  },
  oily: {
    skinType: 'oily' as const,
    concerns: ['acne', 'pores'],
    spfPreference: true,
    fragranceFree: false,
    notes: '',
  },
};

// ---------------------------------------------------------------------------
// Page helpers
// ---------------------------------------------------------------------------

export class DashboardPage {
  readonly page: Page;

  // Main navigation
  readonly pageTitle: Locator;
  readonly welcomeBanner: Locator;
  readonly tabList: Locator;

  // Tabs
  readonly insightsTab: Locator;
  readonly analyzerTab: Locator;
  readonly profilesTab: Locator;

  // Tab content containers
  readonly insightsPanel: Locator;
  readonly analyzerPanel: Locator;
  readonly profilesPanel: Locator;

  constructor(page: Page) {
    this.page = page;

    // Main navigation - use exact match to avoid matching banner
    this.pageTitle = page.getByRole('heading', { name: 'SkinTwin ASI', exact: true });
    this.welcomeBanner = page.getByText('Welcome to SkinTwin ASI');
    this.tabList = page.getByRole('tablist');

    // Tabs
    this.insightsTab = page.getByRole('tab', { name: 'ASI Insights' });
    this.analyzerTab = page.getByRole('tab', { name: 'Product Analyzer' });
    this.profilesTab = page.getByRole('tab', { name: 'Skin Profiles' });

    // Tab content panels
    this.insightsPanel = page.locator('[data-testid="asi-insights-panel"]');
    this.analyzerPanel = page.locator('[data-testid="product-analyzer-panel"]');
    this.profilesPanel = page.locator('[data-testid="skin-profile-panel"]');
  }

  async goto() {
    await this.page.goto('/');
    await this.pageTitle.waitFor({ state: 'visible' });
  }

  async selectTab(tabName: 'insights' | 'analyzer' | 'profiles') {
    const tabMap = {
      insights: this.insightsTab,
      analyzer: this.analyzerTab,
      profiles: this.profilesTab,
    };
    await tabMap[tabName].click();
  }
}

export class ProductAnalyzerPage {
  readonly page: Page;
  readonly dashboard: DashboardPage;

  // Form elements
  readonly ingredientInput: Locator;
  readonly analyzeButton: Locator;
  readonly spinner: Locator;

  // Results elements
  readonly scoreDisplay: Locator;
  readonly progressBar: Locator;
  readonly skinTypeBadges: Locator;
  readonly insightsBanner: Locator;
  readonly ingredientBreakdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboard = new DashboardPage(page);

    // Form elements
    this.ingredientInput = page.getByLabel('Ingredient List');
    this.analyzeButton = page.getByRole('button', { name: /Run ASI Analysis|Analysing/i });
    this.spinner = page.locator('[data-testid="analyzing-spinner"]');

    // Results elements
    this.scoreDisplay = page.locator('[data-testid="efficacy-score"]');
    this.progressBar = page.getByRole('progressbar');
    this.skinTypeBadges = page.locator('[data-testid="skin-type-badges"]');
    this.insightsBanner = page.locator('[data-testid="asi-insights-banner"]');
    this.ingredientBreakdown = page.locator('[data-testid="ingredient-breakdown"]');
  }

  async goto() {
    await this.dashboard.goto();
    await this.dashboard.selectTab('analyzer');
  }

  async analyzeIngredients(ingredients: string) {
    await this.ingredientInput.fill(ingredients);
    await this.analyzeButton.click();
    // Wait for analysis to complete
    await expect(this.analyzeButton).toHaveText('Run ASI Analysis', { timeout: 10000 });
  }
}

export class SkinProfilePage {
  readonly page: Page;
  readonly dashboard: DashboardPage;

  // Form elements
  readonly skinTypeSelect: Locator;
  readonly concernCheckboxes: Locator;
  readonly spfCheckbox: Locator;
  readonly fragranceFreeCheckbox: Locator;
  readonly notesInput: Locator;
  readonly saveButton: Locator;

  // Feedback elements
  readonly successBanner: Locator;
  readonly concernBadges: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboard = new DashboardPage(page);

    // Form elements
    this.skinTypeSelect = page.getByLabel('Skin Type');
    this.concernCheckboxes = page.locator('[data-testid="concern-checkbox"]');
    this.spfCheckbox = page.getByLabel('SPF preferred');
    this.fragranceFreeCheckbox = page.getByLabel('Fragrance-free');
    this.notesInput = page.getByLabel('Additional Notes');
    this.saveButton = page.getByRole('button', { name: 'Save Skin Profile' });

    // Feedback elements
    this.successBanner = page.getByText('Profile saved');
    this.concernBadges = page.locator('[data-testid="concern-badges"]');
  }

  async goto() {
    await this.dashboard.goto();
    await this.dashboard.selectTab('profiles');
  }

  async selectConcern(concernName: string) {
    await this.page.getByLabel(concernName).check();
  }

  async saveProfile() {
    await this.saveButton.click();
    await expect(this.successBanner).toBeVisible({ timeout: 5000 });
  }
}

export class ASIInsightsPage {
  readonly page: Page;
  readonly dashboard: DashboardPage;

  // Status indicators
  readonly coreStatusBadge: Locator;
  readonly deepTreeEchoSection: Locator;
  readonly mardukSection: Locator;

  // Metrics
  readonly productsAnalyzedCount: Locator;
  readonly skinProfilesCount: Locator;
  readonly avgScoreDisplay: Locator;

  // Insights list
  readonly recentInsightsList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboard = new DashboardPage(page);

    // Status indicators
    this.coreStatusBadge = page.locator('[data-testid="core-status-badge"]');
    this.deepTreeEchoSection = page.locator('[data-testid="deep-tree-echo-status"]');
    this.mardukSection = page.locator('[data-testid="marduk-status"]');

    // Metrics
    this.productsAnalyzedCount = page.locator('[data-testid="products-analyzed-count"]');
    this.skinProfilesCount = page.locator('[data-testid="skin-profiles-count"]');
    this.avgScoreDisplay = page.locator('[data-testid="avg-efficacy-score"]');

    // Insights list
    this.recentInsightsList = page.locator('[data-testid="recent-insights-list"]');
  }

  async goto() {
    await this.dashboard.goto();
    // Insights is the default tab
  }
}

// ---------------------------------------------------------------------------
// Extended test fixture
// ---------------------------------------------------------------------------

type TestFixtures = {
  dashboardPage: DashboardPage;
  analyzerPage: ProductAnalyzerPage;
  profilePage: SkinProfilePage;
  insightsPage: ASIInsightsPage;
};

/* eslint-disable react-hooks/rules-of-hooks */
export const test = base.extend<TestFixtures>({
  dashboardPage: async ({ page }, use) => {
    const dashboard = new DashboardPage(page);
    await use(dashboard);
  },
  analyzerPage: async ({ page }, use) => {
    const analyzer = new ProductAnalyzerPage(page);
    await use(analyzer);
  },
  profilePage: async ({ page }, use) => {
    const profile = new SkinProfilePage(page);
    await use(profile);
  },
  insightsPage: async ({ page }, use) => {
    const insights = new ASIInsightsPage(page);
    await use(insights);
  },
});
/* eslint-enable react-hooks/rules-of-hooks */

export { expect } from '@playwright/test';
