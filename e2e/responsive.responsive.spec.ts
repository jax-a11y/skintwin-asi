/**
 * Responsive Viewport E2E Tests
 *
 * Tests app behavior across different screen sizes.
 */

import { test, expect } from '@playwright/test';
import { setViewport, VIEWPORTS } from './utils';
import { DashboardPage, ProductAnalyzerPage, SkinProfilePage } from './fixtures';

test.describe('Desktop Viewport', () => {
  test.beforeEach(async ({ page }) => {
    await setViewport(page, 'desktop');
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('dashboard renders correctly on desktop', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await expect(dashboard.pageTitle).toBeVisible();
    await expect(dashboard.tabList).toBeVisible();
    await expect(dashboard.welcomeBanner).toBeVisible();
  });

  test('all tabs are visible without scrolling', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await expect(dashboard.insightsTab).toBeInViewport();
    await expect(dashboard.analyzerTab).toBeInViewport();
    await expect(dashboard.profilesTab).toBeInViewport();
  });

  test('content has adequate width on desktop', async ({ page }) => {
    const content = page.locator('.Polaris-Page');
    const box = await content.boundingBox();

    expect(box?.width).toBeGreaterThan(600);
  });
});

test.describe('Tablet Viewport', () => {
  test.beforeEach(async ({ page }) => {
    await setViewport(page, 'tablet');
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('dashboard renders correctly on tablet', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await expect(dashboard.pageTitle).toBeVisible();
    await expect(dashboard.tabList).toBeVisible();
  });

  test('tabs are accessible on tablet', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    // All tabs should be interactable
    await dashboard.selectTab('analyzer');
    await expect(dashboard.analyzerTab).toHaveAttribute('aria-selected', 'true');

    await dashboard.selectTab('profiles');
    await expect(dashboard.profilesTab).toHaveAttribute('aria-selected', 'true');
  });

  test('form elements are usable on tablet', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    const dashboard = new DashboardPage(page);

    await dashboard.selectTab('analyzer');

    // Input should be visible and usable
    await expect(analyzer.ingredientInput).toBeVisible();
    await analyzer.ingredientInput.fill('Test ingredients');
    await expect(analyzer.ingredientInput).toHaveValue('Test ingredients');
  });

  test('badges wrap appropriately on tablet', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    const dashboard = new DashboardPage(page);

    await dashboard.selectTab('analyzer');
    await analyzer.analyzeIngredients('Hyaluronic Acid, Niacinamide, Ceramide');

    // Badges should be visible (may wrap)
    const badges = page.locator('.Polaris-Badge');
    await expect(badges.first()).toBeVisible();
  });
});

test.describe('Mobile Viewport', () => {
  test.beforeEach(async ({ page }) => {
    await setViewport(page, 'mobile');
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('dashboard renders on mobile', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    // Core elements should be visible
    await expect(dashboard.pageTitle).toBeVisible();
  });

  test('tabs are scrollable or stacked on mobile', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    // Tab navigation should be accessible
    await dashboard.insightsTab.scrollIntoViewIfNeeded();
    await expect(dashboard.insightsTab).toBeVisible();
  });

  test('product analyzer form is usable on mobile', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    const dashboard = new DashboardPage(page);

    await dashboard.selectTab('analyzer');

    // Scroll to input if needed
    await analyzer.ingredientInput.scrollIntoViewIfNeeded();
    await expect(analyzer.ingredientInput).toBeVisible();

    // Input should accept text
    await analyzer.ingredientInput.fill('Hyaluronic Acid');
    await expect(analyzer.ingredientInput).toHaveValue('Hyaluronic Acid');

    // Button should be visible
    await analyzer.analyzeButton.scrollIntoViewIfNeeded();
    await expect(analyzer.analyzeButton).toBeVisible();
  });

  test('skin profile form is usable on mobile', async ({ page }) => {
    const profile = new SkinProfilePage(page);
    const dashboard = new DashboardPage(page);

    await dashboard.selectTab('profiles');

    // Select should be usable
    await profile.skinTypeSelect.scrollIntoViewIfNeeded();
    await expect(profile.skinTypeSelect).toBeVisible();

    // Save button should be accessible
    await profile.saveButton.scrollIntoViewIfNeeded();
    await expect(profile.saveButton).toBeVisible();
  });

  test('results display correctly on mobile', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    const dashboard = new DashboardPage(page);

    await dashboard.selectTab('analyzer');
    await analyzer.analyzeIngredients('Hyaluronic Acid');

    // Results should be visible
    await expect(page.getByText('Overall Efficacy Score')).toBeVisible();

    // Progress bar should be visible
    const progressBar = page.getByRole('progressbar').first();
    await progressBar.scrollIntoViewIfNeeded();
    await expect(progressBar).toBeVisible();
  });
});

test.describe('Responsive Layout Transitions', () => {
  test('layout adjusts when viewport changes', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    // Start at desktop
    await setViewport(page, 'desktop');
    await expect(dashboard.pageTitle).toBeVisible();

    // Resize to tablet
    await setViewport(page, 'tablet');
    await expect(dashboard.pageTitle).toBeVisible();

    // Resize to mobile
    await setViewport(page, 'mobile');
    await expect(dashboard.pageTitle).toBeVisible();
  });

  test('tab state persists across viewport changes', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    // Select tab on desktop
    await setViewport(page, 'desktop');
    await dashboard.selectTab('analyzer');
    await expect(dashboard.analyzerTab).toHaveAttribute('aria-selected', 'true');

    // Resize to mobile - tab should still be selected
    await setViewport(page, 'mobile');
    await dashboard.analyzerTab.scrollIntoViewIfNeeded();
    await expect(dashboard.analyzerTab).toHaveAttribute('aria-selected', 'true');
  });
});

test.describe('Touch Interactions (Mobile)', () => {
  test.beforeEach(async ({ page }) => {
    await setViewport(page, 'mobile');
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('buttons have adequate touch target size', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.selectTab('profiles');

    const saveButton = page.getByRole('button', { name: 'Save Skin Profile' });
    const box = await saveButton.boundingBox();

    // Minimum recommended touch target is 44x44px
    expect(box?.height).toBeGreaterThanOrEqual(40);
  });

  test('checkboxes are tappable', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.selectTab('profiles');

    const checkbox = page.getByLabel('SPF preferred');
    await checkbox.scrollIntoViewIfNeeded();

    // Should be interactable via tap
    await checkbox.tap();
    // State should toggle
    await expect(checkbox).not.toBeChecked();
  });
});
