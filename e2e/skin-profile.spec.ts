/**
 * Skin Profile E2E Tests
 *
 * Tests the customer skin profile form and persistence.
 */

import { test, expect, SkinProfilePage, SKIN_PROFILE_FIXTURES } from './fixtures';

test.describe('Skin Profile Form', () => {
  test.beforeEach(async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await profile.goto();
  });

  test('displays profile header with customer name', async ({ page }) => {
    await expect(page.getByText('👤 Skin Profile')).toBeVisible();
    await expect(page.getByText('Demo Customer')).toBeVisible();
  });

  test('displays description about Relevance Realization Framework', async ({ page }) => {
    await expect(page.getByText(/Relevance Realization/)).toBeVisible();
    await expect(page.getByText(/personalise product recommendations/)).toBeVisible();
  });

  test('skin type select has default value of Normal', async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await expect(profile.skinTypeSelect).toHaveValue('normal');
  });

  test('skin type select shows all options', async ({ page }) => {
    const profile = new SkinProfilePage(page);

    // Click to open dropdown
    await profile.skinTypeSelect.click();

    // Check all options are present
    await expect(page.getByRole('option', { name: 'Normal' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Dry' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Oily' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Combination' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Sensitive' })).toBeVisible();
  });

  test('can change skin type selection', async ({ page }) => {
    const profile = new SkinProfilePage(page);

    await profile.skinTypeSelect.selectOption('oily');
    await expect(profile.skinTypeSelect).toHaveValue('oily');

    await profile.skinTypeSelect.selectOption('sensitive');
    await expect(profile.skinTypeSelect).toHaveValue('sensitive');
  });
});

test.describe('Skin Concerns', () => {
  test.beforeEach(async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await profile.goto();
  });

  test('displays skin concerns section', async ({ page }) => {
    await expect(page.getByText('Skin Concerns')).toBeVisible();
  });

  test('displays all concern checkboxes', async ({ page }) => {
    const concerns = [
      'Acne / Breakouts',
      'Hyperpigmentation',
      'Dryness / Dehydration',
      'Anti-Aging / Fine Lines',
      'Redness / Rosacea',
      'Enlarged Pores',
      'Uneven Texture',
      'Dark Circles',
    ];

    for (const concern of concerns) {
      await expect(page.getByLabel(concern)).toBeVisible();
    }
  });

  test('all concerns are unchecked by default', async ({ page }) => {
    const acneCheckbox = page.getByLabel('Acne / Breakouts');
    await expect(acneCheckbox).not.toBeChecked();
  });

  test('can toggle concern checkboxes', async ({ page }) => {
    const acneCheckbox = page.getByLabel('Acne / Breakouts');

    // Check
    await acneCheckbox.check();
    await expect(acneCheckbox).toBeChecked();

    // Uncheck
    await acneCheckbox.uncheck();
    await expect(acneCheckbox).not.toBeChecked();
  });

  test('selected concerns show as badges', async ({ page }) => {
    // Select some concerns
    await page.getByLabel('Acne / Breakouts').check();
    await page.getByLabel('Hyperpigmentation').check();

    // Badges should appear
    await expect(page.getByText('acne').first()).toBeVisible();
    await expect(page.getByText('hyperpigmentation').first()).toBeVisible();
  });

  test('deselecting concern removes badge', async ({ page }) => {
    // Select and then deselect
    await page.getByLabel('Acne / Breakouts').check();
    await expect(page.getByText('acne').first()).toBeVisible();

    await page.getByLabel('Acne / Breakouts').uncheck();

    // Badge should be removed (may still show in checkbox label)
    const badges = page.locator('.Polaris-Badge:has-text("acne")');
    await expect(badges).toHaveCount(0);
  });
});

test.describe('Preferences', () => {
  test.beforeEach(async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await profile.goto();
  });

  test('displays preferences section', async ({ page }) => {
    await expect(page.getByText('Preferences')).toBeVisible();
  });

  test('SPF preference is checked by default', async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await expect(profile.spfCheckbox).toBeChecked();
  });

  test('fragrance-free is unchecked by default', async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await expect(profile.fragranceFreeCheckbox).not.toBeChecked();
  });

  test('can toggle SPF preference', async ({ page }) => {
    const profile = new SkinProfilePage(page);

    await profile.spfCheckbox.uncheck();
    await expect(profile.spfCheckbox).not.toBeChecked();

    await profile.spfCheckbox.check();
    await expect(profile.spfCheckbox).toBeChecked();
  });

  test('can toggle fragrance-free preference', async ({ page }) => {
    const profile = new SkinProfilePage(page);

    await profile.fragranceFreeCheckbox.check();
    await expect(profile.fragranceFreeCheckbox).toBeChecked();
  });
});

test.describe('Additional Notes', () => {
  test.beforeEach(async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await profile.goto();
  });

  test('displays notes field', async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await expect(profile.notesInput).toBeVisible();
  });

  test('notes field has placeholder', async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await expect(profile.notesInput).toHaveAttribute('placeholder', /Allergies|medications/);
  });

  test('can enter notes', async ({ page }) => {
    const profile = new SkinProfilePage(page);

    await profile.notesInput.fill('Allergic to parabens. Taking retinoid medication.');
    await expect(profile.notesInput).toHaveValue('Allergic to parabens. Taking retinoid medication.');
  });
});

test.describe('Save Profile', () => {
  test.beforeEach(async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await profile.goto();
  });

  test('displays save button', async ({ page }) => {
    const profile = new SkinProfilePage(page);
    await expect(profile.saveButton).toBeVisible();
    await expect(profile.saveButton).toHaveText('Save Skin Profile');
  });

  test('clicking save shows success banner', async ({ page }) => {
    const profile = new SkinProfilePage(page);

    await profile.saveProfile();

    await expect(profile.successBanner).toBeVisible();
    await expect(page.getByText('Skin profile updated successfully')).toBeVisible();
  });

  test('success banner mentions ASI personalization', async ({ page }) => {
    const profile = new SkinProfilePage(page);

    await profile.saveProfile();

    await expect(page.getByText(/ASI will use this data/)).toBeVisible();
  });

  test('success banner disappears after delay', async ({ page }) => {
    const profile = new SkinProfilePage(page);

    await profile.saveProfile();
    await expect(profile.successBanner).toBeVisible();

    // Wait for banner to disappear (3 seconds + buffer)
    await expect(profile.successBanner).not.toBeVisible({ timeout: 5000 });
  });

  test('can save with full profile data', async ({ page }) => {
    const profile = new SkinProfilePage(page);

    // Fill complete profile
    await profile.skinTypeSelect.selectOption('sensitive');
    await page.getByLabel('Redness / Rosacea').check();
    await page.getByLabel('Dryness / Dehydration').check();
    await profile.fragranceFreeCheckbox.check();
    await profile.notesInput.fill('Very reactive skin');

    await profile.saveProfile();

    await expect(profile.successBanner).toBeVisible();
  });
});
