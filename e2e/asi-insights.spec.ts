/**
 * ASI Insights E2E Tests
 *
 * Tests the cognitive core status dashboard and metrics display.
 */

import { test, expect, DashboardPage, ProductAnalyzerPage } from './fixtures';

test.describe('ASI Insights Panel', () => {
  test.beforeEach(async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    // Insights is the default tab
  });

  test('displays ASI Cognitive Core Status header', async ({ page }) => {
    await expect(page.getByText('ASI Cognitive Core Status')).toBeVisible();
  });

  test('displays core description', async ({ page }) => {
    await expect(page.getByText(/Artificial Skincare Intelligence core/)).toBeVisible();
    await expect(page.getByText(/ingredient synergies/)).toBeVisible();
  });
});

test.describe('Deep Tree Echo Status', () => {
  test.beforeEach(async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('displays Deep Tree Echo section', async ({ page }) => {
    await expect(page.getByText('🌲 Deep Tree Echo (Right Hemisphere)')).toBeVisible();
  });

  test('displays pattern recognition description', async ({ page }) => {
    await expect(page.getByText(/Pattern recognition across ingredient combinations/)).toBeVisible();
  });

  test('displays novelty threshold metric', async ({ page }) => {
    await expect(page.getByText('Novelty threshold')).toBeVisible();
    // Should show percentage
    await expect(page.getByText(/\d+%/).first()).toBeVisible();
  });

  test('displays pattern recognition status badge', async ({ page }) => {
    await expect(page.getByText(/Pattern recognition (active|inactive)/)).toBeVisible();
  });

  test('default state shows Idle status', async ({ page }) => {
    // In initial state, core should be idle
    await expect(page.getByText('Idle')).toBeVisible();
  });
});

test.describe('Marduk Status', () => {
  test.beforeEach(async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('displays Marduk section', async ({ page }) => {
    await expect(page.getByText('⚖️ Marduk (Left Hemisphere)')).toBeVisible();
  });

  test('displays categorical logic description', async ({ page }) => {
    await expect(page.getByText(/Categorical logic structures skincare data/)).toBeVisible();
  });

  test('displays Marduk status badge', async ({ page }) => {
    await expect(page.getByText(/Active|Standby/)).toBeVisible();
  });

  test('default state shows Standby status', async ({ page }) => {
    await expect(page.getByText('Standby')).toBeVisible();
  });
});

test.describe('Catalogue Intelligence Metrics', () => {
  test.beforeEach(async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('displays Catalogue Intelligence section', async ({ page }) => {
    await expect(page.getByText('📊 Catalogue Intelligence')).toBeVisible();
  });

  test('displays products analyzed count', async ({ page }) => {
    await expect(page.getByText('Products analysed')).toBeVisible();
  });

  test('displays skin profiles count', async ({ page }) => {
    await expect(page.getByText('Skin profiles')).toBeVisible();
  });

  test('displays average efficacy score', async ({ page }) => {
    await expect(page.getByText('Avg efficacy score')).toBeVisible();
  });

  test('default state shows zero counts', async ({ page }) => {
    // Initial state should have 0 products and profiles
    const counts = page.locator('text=/^0$/');
    await expect(counts.first()).toBeVisible();
  });
});

test.describe('Post-Analysis Metrics Update', () => {
  test('products analyzed count increases after analysis', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const analyzer = new ProductAnalyzerPage(page);

    // Go to analyzer and run analysis
    await analyzer.goto();
    await analyzer.analyzeIngredients('Hyaluronic Acid, Niacinamide');

    // Return to insights
    await dashboard.selectTab('insights');

    // Products analyzed should be 1
    await expect(page.getByText('1')).toBeVisible();
    await expect(page.getByText('Products analysed')).toBeVisible();
  });

  test('average efficacy score updates after analysis', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const analyzer = new ProductAnalyzerPage(page);

    // Run analysis
    await analyzer.goto();
    await analyzer.analyzeIngredients('Hyaluronic Acid, Niacinamide');

    // Return to insights
    await dashboard.selectTab('insights');

    // Should show non-zero average score
    await expect(page.getByText('Average product efficacy')).toBeVisible();
  });

  test('skin profiles count updates after saving profile', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    // Save a skin profile
    await dashboard.goto();
    await dashboard.selectTab('profiles');
    await page.getByRole('button', { name: 'Save Skin Profile' }).click();
    await expect(page.getByText('Profile saved')).toBeVisible();

    // Return to insights
    await dashboard.selectTab('insights');

    // Profiles count should be 1
    await expect(page.getByText('1')).toBeVisible();
    await expect(page.getByText('Skin profiles')).toBeVisible();
  });
});

test.describe('Recent ASI Insights List', () => {
  test('no insights shown when no analyses performed', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    // Recent insights section should not be visible initially
    await expect(page.getByText('💡 Recent ASI Insights')).not.toBeVisible();
  });

  test('insights appear after analysis with synergy detection', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const analyzer = new ProductAnalyzerPage(page);

    // Run analysis with synergy combo
    await analyzer.goto();
    await analyzer.analyzeIngredients('Hyaluronic Acid, Ceramide NP');

    // Return to insights
    await dashboard.selectTab('insights');

    // Should show recent insights
    await expect(page.getByText('💡 Recent ASI Insights')).toBeVisible();
    await expect(page.getByText(/ceramide synergy/)).toBeVisible();
  });

  test('insights show product name badge', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const analyzer = new ProductAnalyzerPage(page);

    // Run analysis
    await analyzer.goto();
    await analyzer.analyzeIngredients('Hyaluronic Acid, Ceramide NP');

    // Return to insights
    await dashboard.selectTab('insights');

    // Product badge should be visible
    await expect(page.getByText('Demo Product')).toBeVisible();
  });
});
