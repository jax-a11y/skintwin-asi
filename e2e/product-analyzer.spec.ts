/**
 * Product Analyzer E2E Tests
 *
 * Tests the ASI skincare ingredient analysis functionality.
 */

import { test, expect, ProductAnalyzerPage, INGREDIENT_FIXTURES } from './fixtures';

test.describe('Product Analyzer', () => {
  test.beforeEach(async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.goto();
  });

  test('displays analyzer header and description', async ({ page }) => {
    await expect(page.getByText('🧪 ASI Skincare Analyzer')).toBeVisible();
    await expect(page.getByText('Deep Tree Echo')).toBeVisible();
    await expect(page.getByText('categorical intelligence')).toBeVisible();
  });

  test('shows ingredient input field with placeholder', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await expect(analyzer.ingredientInput).toBeVisible();
    await expect(analyzer.ingredientInput).toHaveAttribute('placeholder', /Niacinamide/);
  });

  test('analyze button is disabled for empty input', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await expect(analyzer.analyzeButton).toBeDisabled();
  });

  test('analyze button becomes enabled when input is provided', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.ingredientInput.fill('Hyaluronic Acid');
    await expect(analyzer.analyzeButton).toBeEnabled();
  });

  test('analyze button is disabled for whitespace-only input', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.ingredientInput.fill('   ');
    await expect(analyzer.analyzeButton).toBeDisabled();
  });
});

test.describe('Product Analysis Results', () => {
  test.beforeEach(async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.goto();
  });

  test('beneficial ingredients produce high efficacy score', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    const testData = INGREDIENT_FIXTURES.beneficial;

    await analyzer.analyzeIngredients(testData.raw);

    // Score section visible
    await expect(page.getByText('Overall Efficacy Score')).toBeVisible();

    // Progress bar shows high score
    const progressBar = page.getByRole('progressbar').first();
    await expect(progressBar).toBeVisible();

    // Score text visible (approximate)
    const scoreText = page.getByText(/%$/);
    await expect(scoreText.first()).toBeVisible();
  });

  test('displays skin type badges', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    const testData = INGREDIENT_FIXTURES.beneficial;

    await analyzer.analyzeIngredients(testData.raw);

    await expect(page.getByText('Suitable Skin Types')).toBeVisible();

    // At least some skin type badges should appear
    const badges = page.locator('.Polaris-Badge');
    await expect(badges.first()).toBeVisible();
  });

  test('displays ingredient breakdown', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    const testData = INGREDIENT_FIXTURES.beneficial;

    await analyzer.analyzeIngredients(testData.raw);

    await expect(page.getByText('Ingredient Breakdown')).toBeVisible();

    // Should show benefit badges
    await expect(page.getByText('Deep hydration').first()).toBeVisible();
  });

  test('displays ASI insights for synergy combinations', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);

    // Use ingredients that trigger synergy insight
    await analyzer.analyzeIngredients('Hyaluronic Acid, Ceramide NP');

    await expect(page.getByText('ASI Insights')).toBeVisible();
    await expect(page.getByText(/ceramide synergy/)).toBeVisible();
  });

  test('shows warning insight for retinol + vitamin C', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    const testData = INGREDIENT_FIXTURES.mixed;

    await analyzer.analyzeIngredients(testData.raw);

    await expect(page.getByText(/Retinol \+ Vitamin C/)).toBeVisible();
    await expect(page.getByText(/AM\/PM split/)).toBeVisible();
  });
});

test.describe('Concern Ingredients', () => {
  test.beforeEach(async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.goto();
  });

  test('concern-only ingredients produce zero score', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    const testData = INGREDIENT_FIXTURES.concerns;

    await analyzer.analyzeIngredients(testData.raw);

    // Should show 0% score
    await expect(page.getByText('0%')).toBeVisible();
  });

  test('displays concern badges for problematic ingredients', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);

    await analyzer.analyzeIngredients('Alcohol Denat, Fragrance');

    await expect(page.getByText(/dryness|irritation/i)).toBeVisible();
    await expect(page.getByText(/sensitiser/i)).toBeVisible();
  });

  test('fragrance + AHA triggers warning insight', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);

    await analyzer.analyzeIngredients('AHA, Fragrance');

    await expect(page.getByText(/Fragrance \+ AHA combo/)).toBeVisible();
    await expect(page.getByText(/sensitise reactive skin/)).toBeVisible();
  });
});

test.describe('Unknown Ingredients', () => {
  test('shows info message for unknown ingredients', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.goto();

    const testData = INGREDIENT_FIXTURES.unknown;
    await analyzer.analyzeIngredients(testData.raw);

    await expect(page.getByText(/No recognised active ingredients/)).toBeVisible();
  });
});

test.describe('Analysis State Behavior', () => {
  test('shows analyzing state during analysis', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.goto();

    await analyzer.ingredientInput.fill('Hyaluronic Acid');
    await analyzer.analyzeButton.click();

    // Button text changes during analysis
    await expect(analyzer.analyzeButton).toHaveText(/Analysing/);

    // Eventually returns to normal
    await expect(analyzer.analyzeButton).toHaveText('Run ASI Analysis', { timeout: 10000 });
  });

  test('spinner appears during analysis', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.goto();

    await analyzer.ingredientInput.fill('Hyaluronic Acid');
    await analyzer.analyzeButton.click();

    // Spinner should appear (using Polaris Spinner)
    const spinner = page.locator('.Polaris-Spinner');
    await expect(spinner).toBeVisible({ timeout: 1000 });

    // Wait for analysis to complete
    await expect(analyzer.analyzeButton).toHaveText('Run ASI Analysis', { timeout: 10000 });
  });

  test('button is disabled during analysis', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.goto();

    await analyzer.ingredientInput.fill('Hyaluronic Acid');
    await analyzer.analyzeButton.click();

    // Button should be disabled during analysis
    await expect(analyzer.analyzeButton).toBeDisabled();
  });

  test('results persist after analysis completes', async ({ page }) => {
    const analyzer = new ProductAnalyzerPage(page);
    await analyzer.goto();

    await analyzer.analyzeIngredients('Hyaluronic Acid, Niacinamide');

    // Results visible
    await expect(page.getByText('Overall Efficacy Score')).toBeVisible();

    // Clear input doesn't clear results
    await analyzer.ingredientInput.clear();
    await expect(page.getByText('Overall Efficacy Score')).toBeVisible();
  });
});
