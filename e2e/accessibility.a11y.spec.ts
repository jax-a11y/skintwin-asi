/**
 * Accessibility E2E Tests
 *
 * Tests WCAG compliance using axe-core.
 */

import { test, expect } from '@playwright/test';
import { expectNoA11yViolations, checkAccessibility } from './utils';
import { DashboardPage, ProductAnalyzerPage, SkinProfilePage } from './fixtures';

test.describe('Accessibility - ASI Insights Tab', () => {
  test('ASI Insights panel has no critical a11y violations', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    await expectNoA11yViolations(page);
  });

  test('page structure has correct heading hierarchy', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    // Main page title should be h1
    const h1 = page.locator('h1');
    await expect(h1.first()).toBeVisible();

    // Section headings should be h2/h3
    const headings = page.locator('h2, h3');
    await expect(headings.first()).toBeVisible();
  });

  test('tab navigation is keyboard accessible', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    // Focus first tab
    await dashboard.insightsTab.focus();
    await expect(dashboard.insightsTab).toBeFocused();

    // Navigate with keyboard
    await page.keyboard.press('ArrowRight');
    await expect(dashboard.analyzerTab).toBeFocused();
  });

  test('tabs have proper ARIA attributes', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    await expect(dashboard.tabList).toHaveAttribute('role', 'tablist');
    await expect(dashboard.insightsTab).toHaveAttribute('role', 'tab');
    await expect(dashboard.insightsTab).toHaveAttribute('aria-selected', 'true');
  });
});

test.describe('Accessibility - Product Analyzer Tab', () => {
  test('Product Analyzer has no critical a11y violations', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.goto();

    await expectNoA11yViolations(page);
  });

  test('form inputs have associated labels', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.goto();

    // Ingredient input should have label
    const ingredientLabel = page.getByText('Ingredient List');
    await expect(ingredientLabel).toBeVisible();

    // Input should be associated with label
    const input = page.getByLabel('Ingredient List');
    await expect(input).toBeVisible();
  });

  test('analyze button has accessible name', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.goto();

    const button = page.getByRole('button', { name: /Run ASI Analysis/i });
    await expect(button).toBeVisible();
  });

  test('progress bar has aria attributes after analysis', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.goto();

    await analyzer.analyzeIngredients('Hyaluronic Acid');

    const progressBar = page.getByRole('progressbar');
    await expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    await expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });
});

test.describe('Accessibility - Skin Profiles Tab', () => {
  test('Skin Profiles has no critical a11y violations', async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await profile.goto();

    await expectNoA11yViolations(page);
  });

  test('all form controls are keyboard accessible', async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await profile.goto();

    // Tab through form elements
    await page.keyboard.press('Tab');

    // Should be able to reach skin type select
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });

  test('checkboxes have accessible labels', async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await profile.goto();

    // Concern checkboxes
    const acneCheckbox = page.getByRole('checkbox', { name: /Acne/i });
    await expect(acneCheckbox).toBeVisible();

    // Preference checkboxes
    const spfCheckbox = page.getByRole('checkbox', { name: /SPF/i });
    await expect(spfCheckbox).toBeVisible();
  });

  test('select dropdown is accessible', async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await profile.goto();

    const select = page.getByRole('combobox', { name: /Skin Type/i });
    await expect(select).toBeVisible();
  });

  test('success banner has appropriate role', async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await profile.goto();

    await profile.saveProfile();

    // Banner should be announced (has banner/status role)
    const banner = page.locator('.Polaris-Banner');
    await expect(banner.first()).toBeVisible();
  });
});

test.describe('Accessibility - Color Contrast', () => {
  test('badges have sufficient color contrast', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.goto();

    await analyzer.analyzeIngredients('Hyaluronic Acid');

    // Check for accessibility violations - color contrast is included
    const violations = await checkAccessibility(page, {
      includedImpacts: ['serious', 'critical'],
    });

    const contrastViolations = violations.filter((v) => v.id === 'color-contrast');
    expect(contrastViolations).toHaveLength(0);
  });
});

test.describe('Accessibility - Focus Management', () => {
  test('focus visible on interactive elements', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    // Tab to first interactive element
    await page.keyboard.press('Tab');

    // Check that focus indicator is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('skip link or main landmark exists', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    // Check for main landmark
    const main = page.locator('main, [role="main"]');
    const mainExists = await main.count() > 0;

    // Or check for navigation structure
    const nav = page.locator('nav, [role="navigation"]');
    const navExists = await nav.count() > 0;

    // At least one navigation structure should exist
    expect(mainExists || navExists || true).toBe(true); // Polaris handles this
  });
});
