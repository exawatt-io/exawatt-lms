# ExaWatt - Power Markets Learning Platform

## Project Overview
ExaWatt is an LMS platform focused on power markets education with interactive simulations and AI-powered learning. Built with Next.js 15, TypeScript, and Tailwind CSS v4.

## Architecture
- **Frontend**: Next.js 15 with App Router and Turbopack
- **Styling**: Tailwind CSS v4 with custom design tokens  
- **Content**: MDX for educational content
- **Simulations**: Widget-based architecture with URL state management
- **Theme**: Dark theme with electric blue (#00d4ff) and power yellow (#fbbf24)

## Key Features
- **Conditional Layout**: Separate marketing site vs app experience (`/app/*` routes)
- **Professional App UI**: Sidebar navigation, dashboard layouts similar to GridStatus.io
- **Interactive Simulations**: Market clearing, grid fundamentals with real-time calculations
- **Shareable Scenarios**: URL-based state encoding for custom simulation sharing
- **Design System**: Comprehensive shared components (FeatureCard, Button, Badge, etc.)

## Simulation Design
See detailed simulation design principles in `.claude/simulation-design-principles.md`. Key points:
- Horizontal-first layouts to minimize scrolling
- Tabbed interfaces for complex simulations
- URL-based state sharing for custom scenarios
- Always-visible key metrics

## File Structure
```
src/
├── app/
│   ├── layout.tsx                    # Root layout with ConditionalLayout
│   ├── app/                         # App routes (no marketing nav)
│   │   ├── layout.tsx               # App-only layout
│   │   └── simulations/
│   │       └── market-clearing/     # Redesigned with new principles
├── components/
│   ├── ConditionalLayout.tsx        # Route-based layout switching
│   ├── app/                         # App-specific layouts
│   │   ├── AppLayout.tsx            # Main app container
│   │   ├── AppSidebar.tsx           # Professional sidebar nav
│   │   └── AppHeader.tsx            # App header with controls
│   ├── simulations/                 # Simulation components
│   │   ├── ShareSimulation.tsx      # Sharing modal
│   │   └── ScenarioManager.tsx      # Preset management
│   ├── widgets/                     # Embeddable simulation widgets
│   └── ui/                          # Design system components
├── lib/
│   ├── simulation-state.ts          # URL state management
│   └── simulations/                 # Simulation engines
```

## Running the Project
```bash
npm run dev    # Development server
npm run build  # Production build
npm run lint   # Linting (run before commits)
```

## Design Tokens
```css
:root {
  --electric-400: #00d4ff;    /* Primary electric blue */
  --electric-500: #00bfea;    /* Electric blue hover */
  --power-400: #fbbf24;       /* Power yellow */
  --dark-900: #0f172a;        /* Dark background */
  --dark-950: #020617;        /* Darker background */
  --slate-*: /* Neutral grays */
}
```

## Development Guidelines
- Always use the design system components
- Follow simulation design principles in `.claude/simulation-design-principles.md`
- Use URL state management for shareable simulations
- Implement tabbed interfaces for complex analyses
- Test on different screen sizes to ensure no excessive scrolling