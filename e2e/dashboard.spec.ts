/**
 * Dashboard Shell and Navigation E2E Tests
 *
 * Tests the main app shell, navigation, and routing behavior.
 */

import { test, expect, DashboardPage } from './fixtures';

test.describe('Dashboard Shell', () => {
  test.beforeEach(async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('renders page title and subtitle', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'SkinTwin ASI' })).toBeVisible();
    await expect(page.getByText('Artificial Skincare Intelligence for your Shopify store')).toBeVisible();
  });

  test('renders welcome banner with Deep Tree Echo and Marduk info', async ({ page }) => {
    const banner = page.getByText('Welcome to SkinTwin ASI');
    await expect(banner).toBeVisible();

    // Banner contains key agent names
    await expect(page.getByText('Deep Tree Echo')).toBeVisible();
    await expect(page.getByText('Marduk')).toBeVisible();
  });

  test('renders primary action button', async ({ page }) => {
    const docButton = page.getByRole('link', { name: 'View Documentation' });
    await expect(docButton).toBeVisible();
  });

  test('renders all navigation tabs', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await expect(dashboard.insightsTab).toBeVisible();
    await expect(dashboard.analyzerTab).toBeVisible();
    await expect(dashboard.profilesTab).toBeVisible();
  });

  test('insights tab is selected by default', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await expect(dashboard.insightsTab).toHaveAttribute('aria-selected', 'true');
    await expect(dashboard.analyzerTab).toHaveAttribute('aria-selected', 'false');
    await expect(dashboard.profilesTab).toHaveAttribute('aria-selected', 'false');
  });
});

test.describe('Tab Navigation', () => {
  test.beforeEach(async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('switches to Product Analyzer tab', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.selectTab('analyzer');

    await expect(dashboard.analyzerTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('🧪 ASI Skincare Analyzer')).toBeVisible();
    await expect(page.getByLabel('Ingredient List')).toBeVisible();
  });

  test('switches to Skin Profiles tab', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.selectTab('profiles');

    await expect(dashboard.profilesTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('👤 Skin Profile')).toBeVisible();
    await expect(page.getByLabel('Skin Type')).toBeVisible();
  });

  test('returns to ASI Insights tab', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    // Navigate away
    await dashboard.selectTab('analyzer');
    await dashboard.selectTab('insights');

    await expect(dashboard.insightsTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('ASI Cognitive Core Status')).toBeVisible();
  });

  test('tab content is isolated (switching tabs shows different content)', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    // Insights content
    await expect(page.getByText('ASI Cognitive Core Status')).toBeVisible();
    await expect(page.getByText('Ingredient List')).not.toBeVisible();

    // Switch to analyzer
    await dashboard.selectTab('analyzer');
    await expect(page.getByText('ASI Cognitive Core Status')).not.toBeVisible();
    await expect(page.getByLabel('Ingredient List')).toBeVisible();

    // Switch to profiles
    await dashboard.selectTab('profiles');
    await expect(page.getByLabel('Ingredient List')).not.toBeVisible();
    await expect(page.getByLabel('Skin Type')).toBeVisible();
  });

  test('keyboard navigation works for tabs', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    // Focus the tab list
    await dashboard.insightsTab.focus();

    // Navigate with arrow keys
    await page.keyboard.press('ArrowRight');
    await expect(dashboard.analyzerTab).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(dashboard.profilesTab).toBeFocused();

    // Select with Enter
    await page.keyboard.press('Enter');
    await expect(dashboard.profilesTab).toHaveAttribute('aria-selected', 'true');
  });
});
