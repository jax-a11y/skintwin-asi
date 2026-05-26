# Contributing to SkinTwin-ASI

Thank you for your interest in contributing to SkinTwin-ASI! This document outlines our development workflow, CI/CD pipeline, and quality standards.

## Development Setup

### Prerequisites

- **Node.js 22.x** or higher
- npm or pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/skintwin-ai/skintwin-asi.git
cd skintwin-asi

# Install dependencies (--legacy-peer-deps required for React 19/Polaris compatibility)
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Shopify credentials

# Start development server
npm run dev
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run all E2E tests |
| `npm run test:e2e:smoke` | Run smoke tests (fast) |
| `npm run test:e2e:ui` | Run E2E tests with Playwright UI |
| `npm run test:e2e:debug` | Debug E2E tests |
| `npm run test:e2e:chromium` | Run E2E tests in Chromium only |
| `npm run test:e2e:firefox` | Run E2E tests in Firefox only |
| `npm run test:e2e:webkit` | Run E2E tests in WebKit only |
| `npm run test:e2e:a11y` | Run accessibility tests |
| `npm run test:e2e:responsive` | Run responsive viewport tests |
| `npm run test:e2e:report` | View last E2E test report |

## Continuous Integration

### CI Pipeline Overview

Our CI pipeline runs on every pull request and push to `main`. It consists of:

```
┌─────────────────┐
│    Install      │ ── Cache dependencies
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐
│Type   │ │ Lint  │ │ Build │
│Check  │ │       │ │       │
└───┬───┘ └───────┘ └───┬───┘
    │                   │
    └────────┬──────────┘
             ▼
      ┌────────────┐
      │ E2E Smoke  │ ── Required for merge
      └────────────┘
```

### Required Checks for PR Merge

The following checks must pass before a PR can be merged:

1. **Type Check** - `npm run type-check`
2. **Build** - `npm run build`
3. **E2E Smoke Tests** - Fast subset of E2E tests

### Full E2E Test Suite

On `main` branch pushes, the full E2E suite runs:

- **Browser Matrix**: Chromium, Firefox, WebKit
- **Accessibility Tests**: WCAG compliance via axe-core
- **Responsive Tests**: Mobile and tablet viewports

### Nightly Tests

Scheduled nightly at 3:00 AM UTC:

- Full sharded E2E suite across all browsers
- Optional Shopify integration smoke tests (when secrets are configured)

## Writing Tests

### Test Structure

```
e2e/
├── fixtures/           # Shared test fixtures and page objects
│   └── index.ts
├── utils/              # Test utilities (a11y, viewport, API mocks)
│   └── index.ts
├── dashboard.smoke.spec.ts     # Smoke tests (fast, required)
├── dashboard.spec.ts           # Full dashboard tests
├── product-analyzer.spec.ts    # Product analyzer tests
├── skin-profile.spec.ts        # Skin profile tests
├── asi-insights.spec.ts        # ASI insights tests
├── api-routes.spec.ts          # API route tests
├── accessibility.a11y.spec.ts  # Accessibility tests
└── responsive.responsive.spec.ts # Responsive viewport tests
```

### Using Page Objects

We use the Page Object pattern for stable, maintainable tests:

```typescript
import { test, expect, DashboardPage, ProductAnalyzerPage } from './fixtures';

test('analyze ingredients', async ({ page }) => {
  const analyzer = new ProductAnalyzerPage(page);
  await analyzer.goto();
  await analyzer.analyzeIngredients('Hyaluronic Acid, Niacinamide');
  
  await expect(page.getByText('Overall Efficacy Score')).toBeVisible();
});
```

### Test IDs

Use `data-testid` attributes for stable element selection:

```typescript
// In component
<div data-testid="efficacy-score">...</div>

// In test
const score = page.locator('[data-testid="efficacy-score"]');
```

### Accessibility Testing

```typescript
import { expectNoA11yViolations } from './utils';

test('page has no critical a11y violations', async ({ page }) => {
  await page.goto('/');
  await expectNoA11yViolations(page);
});
```

## Code Style

### TypeScript

- Use strict TypeScript (`"strict": true`)
- Define interfaces for all props and state
- Use meaningful variable names

### Component Guidelines

- Use Shopify Polaris components for UI consistency
- Add `data-testid` attributes to interactive elements
- Include JSDoc comments for complex functions

### Commit Messages

Follow conventional commits:

```
feat: add ingredient synergy detection
fix: resolve OAuth callback redirect issue
docs: update CI documentation
test: add skin profile form tests
chore: update dependencies
```

## Branch Protection

The `main` branch is protected with:

- Required status checks (type-check, build, e2e-smoke)
- Required PR reviews
- No direct pushes

## Troubleshooting

### E2E Tests Failing Locally

1. Ensure dependencies are installed: `npm install --legacy-peer-deps`
2. Install Playwright browsers: `npx playwright install chromium`
3. Copy CI environment: `cp .env.ci .env.local`
4. Run tests: `npm run test:e2e:smoke`

### Build Errors

1. Clear Next.js cache: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules && npm install --legacy-peer-deps`
3. Run type check: `npm run type-check`

### CI Pipeline Issues

- Check workflow runs in the Actions tab
- Download test artifacts for failed runs
- Review traces and screenshots for E2E failures

## Getting Help

- Open an issue for bugs or feature requests
- Join discussions for questions
- Review existing documentation in the repository
