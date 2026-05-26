/**
 * Smoke Tests — Fast PR validation suite
 *
 * These tests run on every PR and must pass for merge.
 * Keep this suite minimal and fast (<2 minutes).
 */

import { test, expect, DashboardPage, ProductAnalyzerPage, INGREDIENT_FIXTURES } from './fixtures';

test.describe('Smoke Tests', () => {
  test('app loads and displays main dashboard', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    // Core elements are visible
    await expect(dashboard.pageTitle).toBeVisible();
    await expect(dashboard.welcomeBanner).toBeVisible();
    await expect(dashboard.tabList).toBeVisible();

    // All tabs are present
    await expect(dashboard.insightsTab).toBeVisible();
    await expect(dashboard.analyzerTab).toBeVisible();
    await expect(dashboard.profilesTab).toBeVisible();
  });

  test('tab navigation works correctly', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    // Start on insights tab (default)
    await expect(dashboard.insightsTab).toHaveAttribute('aria-selected', 'true');

    // Switch to analyzer tab
    await dashboard.selectTab('analyzer');
    await expect(dashboard.analyzerTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('🧪 ASI Skincare Analyzer')).toBeVisible();

    // Switch to profiles tab
    await dashboard.selectTab('profiles');
    await expect(dashboard.profilesTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('👤 Skin Profile')).toBeVisible();

    // Return to insights tab
    await dashboard.selectTab('insights');
    await expect(dashboard.insightsTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('ASI Cognitive Core Status')).toBeVisible();
  });

  test('product analyzer accepts input and produces results', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.goto();

    // Button should be disabled for empty input
    await expect(analyzer.analyzeButton).toBeDisabled();

    // Enter ingredients and analyze
    const testData = INGREDIENT_FIXTURES.beneficial;
    await analyzer.ingredientInput.fill(testData.raw);
    await expect(analyzer.analyzeButton).toBeEnabled();

    await analyzer.analyzeButton.click();

    // Wait for analysis to complete
    await expect(analyzer.analyzeButton).toHaveText('Run ASI Analysis', { timeout: 10000 });

    // Results should be visible
    await expect(page.getByText('Overall Efficacy Score')).toBeVisible();
    await expect(page.getByText('Suitable Skin Types')).toBeVisible();
  });

  test('skin profile form saves successfully', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await dashboard.selectTab('profiles');

    // Fill and save profile
    const saveButton = page.getByRole('button', { name: 'Save Skin Profile' });
    await saveButton.click();

    // Success banner appears
    await expect(page.getByText('Profile saved')).toBeVisible({ timeout: 5000 });
  });
});
