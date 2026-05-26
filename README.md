# SkinTwin-ASI: Cognitive Alchemist Workbench — Shopify App

**An AI-driven beauty-tech Shopify app featuring the ASI (Artificial Skincare Intelligence) cognitive core**

## Overview

SkinTwin-ASI is a **Shopify embedded app** that brings the ASI skincare intelligence core directly into the Shopify merchant admin. The platform implements a dual-hemisphere cognitive architecture with Deep Tree Echo and Marduk agents to analyse skincare product ingredients, build customer skin profiles, and surface personalised recommendations — all within Shopify.

## Shopify App Features

### Embedded Admin Dashboard
The app embeds seamlessly in the Shopify Admin via Shopify App Bridge, using **Polaris** for a native Shopify look and feel. Three main panels are available:

1. **ASI Insights** — Live status of the cognitive core; catalogue-wide intelligence summary
2. **Product Analyzer** — Paste an INCI ingredient list; the ASI core scores efficacy, identifies synergies, and flags concerns
3. **Skin Profiles** — Capture and manage per-customer skin types, concerns, and preferences

### ASI Skincare Intelligence Core
ASI = **Artificial Skincare Intelligence**. The cognitive architecture powers:

- **Deep Tree Echo** (Right Hemisphere): Pattern recognition across ingredient combinations and skin-type compatibility signals
- **Marduk** (Left Hemisphere): Categorical logic that structures data into actionable intervention blueprints
- **Relevance Realization Framework**: Context-sensitive personalisation of recommendations per customer profile
- **PLingua Membrane Computing**: Biological modelling of skin-barrier processes

### Shopify Integration
- OAuth 2.0 installation flow (`/api/auth`, `/api/auth/callback`)
- Webhook handling for `products/create`, `products/update`, `customers/create`, `customers/update`, and `app/uninstalled`
- Shopify App Bridge v4 for session tokens and embedded navigation

## Key Features

### Dual-Hemisphere Cognitive Architecture

The system is built around two complementary AI agents that mirror the hemispheric specialization of human cognition:

- **Deep Tree Echo** (Right Hemisphere): Aligned with novelty, primes, and pure simplex of a system. Handles pattern recognition, creative exploration, and emergent insights.

- **Marduk** (Left Hemisphere): Brings the metric tensor and orthoplex (measure polytope) that transforms raw essence into categorical logic and prepares blueprints for practical productive capacity.

### JAX CEO Enhancement

The **JAX CEO** (Cognitive Execution Orchestration) serves as the executive layer in Marduk's Memory Subsystem, providing:

- High-performance numerical computing with hardware acceleration
- Automatic differentiation for gradient-based optimization
- Neural network capabilities for skin modeling and intervention prediction
- Composable function transformations for flexible computational pipelines

### PLingua Membrane Computing

Integration of P-systems and membrane computing for formal biological modeling:

- Hierarchical membrane structures representing biological, computational, and conceptual boundaries
- Object evolution rules for simulating biological processes
- Communication protocols between membrane compartments
- Translation between biological and computational representations

### Relevance Realization Framework

Implementation of triadic polarities and axis mundi alignment based on cognitive science research:

- Dynamic balancing of complementary cognitive aspects
- Context-sensitive relevance determination
- Meta-cognitive monitoring and adjustment
- Vertical integration along the axis mundi

## Architecture

The SkinTwin-ASI workbench consists of five core applications:

1. **Flow Designer**: Visual interface for creating and managing cognitive flows
2. **Analysis Studio**: Data analysis and visualization tools
3. **Intervention Planner**: Skincare intervention modeling and optimization
4. **Membrane Modeler**: P-system design and simulation environment
5. **Collaboration Hub**: Team coordination and knowledge sharing

## Dashboard Visualization

The interactive dashboard provides comprehensive visualization of:

- **Dynamic Flows**: Real-time visualization of data, control, feedback, and meta-cognitive flows between architecture components
- **Membrane Nesting Topologies**: Hierarchical representation of biological, computational, and conceptual membranes
- **Component Status**: Live monitoring of all system components and their interactions
- **Performance Metrics**: Real-time tracking of system performance and resource utilization

## Technology Stack

- **Shopify**: App Bridge React v4, Polaris v13, Shopify API v13
- **Frontend**: React 19, TypeScript, Next.js 15
- **State Management**: Redux Toolkit
- **Visualization**: D3.js
- **Membrane Computing**: PLingua framework

## Getting Started

### Prerequisites

- Node.js 22.x or higher
- npm or pnpm
- A [Shopify Partner account](https://partners.shopify.com/) with a registered app

### Installation

```bash
# Clone the repository
git clone https://github.com/skintwin-ai/skintwin-asi.git
cd skintwin-asi

# Install dependencies
npm install

# Copy and fill in your environment variables
cp .env.example .env.local
# Edit .env.local with your SHOPIFY_API_KEY, SHOPIFY_API_SECRET, and HOST

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

See `.env.example` for all required configuration. Key variables:

| Variable | Description |
|---|---|
| `SHOPIFY_API_KEY` | Your app's client ID from the Shopify Partner dashboard |
| `SHOPIFY_API_SECRET` | Your app's client secret |
| `HOST` | The public URL of your deployed app (used for OAuth redirect) |
| `SCOPES` | Comma-separated Shopify API scopes |
| `NEXT_PUBLIC_SHOPIFY_API_KEY` | Same as `SHOPIFY_API_KEY` — exposed to the browser for App Bridge |

### Shopify App Setup

1. Create a new app in your Shopify Partner dashboard
2. Set the **App URL** to `https://your-host.com` and the **Allowed redirection URL** to `https://your-host.com/api/auth/callback`
3. Copy the API key and secret into `.env.local`
4. Install the app on a development store via `https://your-host.com/api/auth?shop=your-store.myshopify.com`

### Deployment

The app is a standard Next.js app and can be deployed to:

- **Vercel**: Optimized for Next.js — recommended
- **Netlify**: Supports server-side rendering
- **AWS Amplify**: Full-stack deployment
- **Self-hosted**: Any Node.js environment

## Documentation

Comprehensive documentation is available in the repository:

- `skintwin_asi_comprehensive_report.md`: Executive summary and overview
- `implementation_documentation.md`: Technical implementation details
- `usage_guidelines.md`: User guide and best practices
- `workbench_architecture.md`: System architecture documentation
- `ai_agents_roles.md`: AI agents specifications
- `jax_ceo_enhancement.md`: JAX CEO integration details
- `dashboard_requirements.md`: Dashboard visualization specifications

## Theoretical Foundations

The SkinTwin-ASI framework is grounded in several theoretical frameworks:

- **Relevance Realization**: Based on Jaeger et al.'s triadic polarities framework
- **Membrane Computing**: P-systems and biological computing paradigms
- **Cognitive Architecture**: Dual-process theory and hemispheric specialization
- **Category Theory**: Mathematical foundations for system integration

## Project Structure

```
skintwin-asi/
├── pages/                       # Next.js pages (Shopify app routes)
│   ├── _app.tsx                 # App wrapper (Redux + Polaris providers)
│   ├── index.tsx                # Main embedded admin dashboard
│   └── api/
│       ├── auth.ts              # OAuth install entry point
│       ├── auth/callback.ts     # OAuth callback handler
│       └── webhooks/[topic].ts  # Shopify webhook receiver
├── src/
│   ├── agents/                  # ASI cognitive core agents
│   │   ├── deepTreeEcho/        # Deep Tree Echo — pattern recognition
│   │   ├── marduk/              # Marduk — categorical intelligence
│   │   ├── plinguaMembrane/     # PLingua — biological membrane computing
│   │   └── relevanceRealization/# Relevance Realization Framework
│   ├── components/
│   │   ├── shopify/             # Shopify-integrated UI components
│   │   │   ├── ShopifyProvider.tsx       # Polaris app provider wrapper
│   │   │   ├── SkincareProductAnalyzer.tsx # ASI ingredient analysis UI
│   │   │   ├── CustomerSkinProfile.tsx   # Skin profile capture form
│   │   │   └── ASIInsights.tsx           # ASI core status dashboard
│   │   ├── dashboard/           # Original dashboard visualisation
│   │   ├── flows/               # Flow visualisation
│   │   └── membranes/           # Membrane visualisation
│   ├── lib/
│   │   ├── store.ts             # Redux store (includes skincare slice)
│   │   └── shopify/
│   │       ├── shopifyClient.ts # @shopify/shopify-api initialisation
│   │       └── skincareSlice.ts # Redux slice for skincare state
│   └── styles/                  # Global styles and theme
├── shopify.app.toml             # Shopify app configuration
├── .env.example                 # Environment variable template
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## Contributing

We welcome contributions to the SkinTwin-ASI project. Please read our contributing guidelines before submitting pull requests.

## License

[License information to be added]

## Acknowledgments

This project integrates concepts from:

- Jaeger et al. (2024) - Relevance Realization Framework
- PLingua Project - Membrane Computing
- JAX Team - High-performance numerical computing
- The cognitive science and AI research communities

## Contact

For questions and support, please open an issue on GitHub or contact the development team.

---

**SkinTwin-ASI**: Where cognitive science meets beauty-tech innovation.
