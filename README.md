# ExaWatt - Power Markets LMS Platform

ExaWatt is a comprehensive Learning Management System (LMS) designed for power markets education. The platform provides interactive courses, real-time market simulations, and AI-powered learning tools to bridge the gap between theoretical knowledge and practical application in electricity markets.

## Project Overview

A production-ready web application built to help energy professionals, finance professionals transitioning to power trading, policy analysts, and students master electricity market operations through:

- **Interactive Courses**: Structured curriculum from grid fundamentals to advanced trading strategies
- **Market Simulations**: Real-time market clearing, dispatch optimization, and LMP formation tools
- **Professional Dashboard**: Trading platform-style interface for managing learning progress
- **Content Management**: Sanity CMS integration for dynamic course and simulation content
- **Shareable Scenarios**: URL-based state management for sharing custom simulation configurations

## Architecture & Technology Stack

- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS v4 with custom design tokens
- **CMS**: Sanity Studio for content management
- **Content**: MDX and Portable Text for rich educational content
- **UI Components**: Comprehensive design system with reusable components
- **Theme**: Electric Energy theme with vibrant blue, orange, and green colors
- **State Management**: URL-based encoding for shareable simulation states

## Project Structure

```
src/
├── app/                          # App Router pages (dual-layout architecture)
│   ├── layout.tsx               # Root layout with ConditionalLayout
│   ├── page.tsx                 # Marketing homepage
│   ├── courses/                 # Public course marketing page
│   ├── simulations/            # Public simulations marketing page
│   ├── studio/                 # Sanity Studio CMS interface
│   └── app/                    # Application routes (professional UI)
│       ├── layout.tsx          # App-specific layout wrapper
│       ├── dashboard/          # User dashboard with progress tracking
│       ├── courses/            # Course catalog with Sanity integration
│       │   └── [courseId]/     # Dynamic course pages with lessons
│       └── simulations/        # Interactive simulations
│           └── market-clearing/ # Full market clearing simulation
├── components/
│   ├── ConditionalLayout.tsx   # Route-based layout switching
│   ├── app/                    # Application-specific components
│   │   ├── AppLayout.tsx       # Professional sidebar layout
│   │   ├── AppSidebar.tsx      # Navigation sidebar
│   │   └── AppHeader.tsx       # App header with breadcrumbs
│   ├── ui/                     # Design system components
│   │   ├── FeatureCard.tsx     # Base card with variants
│   │   ├── Button.tsx          # Button with multiple variants
│   │   ├── Badge.tsx           # Status and category badges
│   │   └── [other components]  # CourseCard, SimulationCard, etc.
│   ├── widgets/                # Simulation widget components
│   │   ├── BaseWidget.tsx      # Widget foundation
│   │   └── components/         # MeritOrderWidget, SupplyCurveWidget
│   └── simulations/            # Simulation-specific components
│       ├── GeneratorTable.tsx  # Editable generator parameters
│       └── DemandBidTable.tsx  # Demand bid management
├── lib/
│   ├── simulation-state.ts     # URL state management for simulations
│   └── simulations/            # Simulation engines
│       ├── market-clearing.ts  # Market clearing algorithm
│       ├── scenarios.ts        # Predefined scenarios
│       └── types.ts           # TypeScript interfaces
├── sanity/                     # Sanity CMS configuration
│   ├── lib/                   # Sanity utilities and queries
│   └── schemas/               # Content schemas
└── .claude/                   # AI agent documentation
    ├── README.md              # Documentation overview
    ├── simulation-architecture.md # Simulation system design
    ├── component-patterns.md  # Architectural patterns
    ├── design-system.md       # Component library docs
    └── sanity-*.md           # CMS documentation files
```

## Application Architecture

### Dual-Layout System

The application features a sophisticated dual-layout architecture:

1. **Marketing/Public Routes** (`/`, `/courses`, `/simulations`)
   - Clean marketing pages with hero sections
   - Feature highlights and CTAs
   - No sidebar navigation
   - Links direct users to `/app/*` routes

2. **Application Routes** (`/app/*`)
   - Professional trading platform UI (inspired by GridStatus.io)
   - Persistent sidebar navigation
   - Dashboard with progress tracking
   - Full-featured course and simulation interfaces

3. **CMS Studio** (`/studio/*`)
   - Sanity Studio for content management
   - Protected authoring environment
   - Schema-based content editing

### Design System

The application uses the **Electric Energy Theme** with semantic color tokens:

#### Color Palette
- **Primary (Electric Blue)**: `#0ea5e9` - Navigation, structure
- **Accent (Electric Orange)**: `#f97316` - High-energy actions, simulations
- **Secondary (Electric Green)**: `#22c55e` - Learning, educational content
- **Dark Backgrounds**: `#0f172a` to `#020617` range

#### Core Components
- **FeatureCard**: Base card with variants (`default`, `interactive`, `highlight`)
- **Button**: Multiple variants (`primary`, `secondary`, `accent`, `outline`, `ghost`)
- **Badge**: Status indicators with semantic colors
- **AppLayout**: Professional sidebar layout for app routes
- **ConditionalLayout**: Automatic layout switching based on route

#### Simulation Components
- **BaseWidget**: Foundation for all interactive simulations
- **MarketClearingWidget**: Complete market simulation with real-time calculations
- **MeritOrderWidget**: Generator dispatch visualization
- **SupplyCurveWidget**: Economic curve plotting

## Key Features & Implementation Status

### ✅ Completed Features

#### Content Management System
- **Sanity CMS Integration**: Full CMS for courses, simulations, and lessons
- **Portable Text Rendering**: Rich content support for course materials
- **Dynamic Data Fetching**: Server-side data fetching with caching
- **Studio Interface**: Built-in content authoring at `/studio`

#### Application Interface
- **Professional Dashboard**: Trading platform-style UI with sidebar navigation
- **Course Catalog**: Dynamic course listing with enrollment status
- **Simulation Library**: Grid of interactive simulations with progress tracking
- **User Progress Tracking**: Mock implementation ready for authentication

#### Market Simulations
- **Market Clearing Engine**: Full implementation with real-time calculations
- **URL State Management**: Shareable simulation scenarios via URL encoding
- **Tabbed Interface**: Overview, Analysis, and Data views
- **Economic Analysis**: Producer/consumer surplus calculations
- **Scenario System**: Predefined market scenarios with guided learning

#### Design & UX
- **Dual-Layout Architecture**: Separate marketing and app experiences
- **Electric Energy Theme**: Consistent color system with semantic tokens
- **Responsive Design**: Mobile-first approach with grid layouts
- **Component Library**: 20+ reusable components in design system

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 🚧 In Progress / Planned Features

#### Authentication & User Management
- User authentication system (ready for integration)
- Progress persistence across sessions
- User profiles and achievements
- Certificate generation upon course completion

#### AI-Powered Features
- Personalized learning paths based on user progress
- Adaptive assessments and quizzes
- AI tutor for answering questions
- Intelligent scenario generation for simulations

#### Advanced Simulations
- Multi-period optimization (day-ahead markets)
- Transmission constraints and congestion modeling
- Ancillary services markets
- Real-time dispatch (5-minute markets)
- Historical data replay with actual market data

#### Social & Collaborative Features
- Discussion forums for courses
- Collaborative simulations with multiple participants
- Leaderboards and competitions
- Peer review and knowledge sharing

### 🔄 Next Development Priorities

1. **User Authentication**: Implement auth system for progress tracking
2. **Real Content Migration**: Complete MDX to Sanity content migration
3. **Additional Simulations**: Build out renewable integration and risk analysis sims
4. **Quiz System**: Add assessment capabilities to lessons
5. **API Integration**: Connect to real-time market data sources
6. **Performance Optimization**: Implement caching and lazy loading strategies

## Development Guide

### Key File Locations

#### Content Management
- **Sanity Studio**: Access at `http://localhost:3000/studio`
- **Content Schemas**: `src/sanity/schemas/`
- **GROQ Queries**: `src/sanity/lib/queries.ts`
- **Data Fetching**: `src/sanity/lib/fetch.ts`

#### Application Routes
- **Marketing Pages**: `src/app/[page]/page.tsx`
- **App Dashboard**: `src/app/app/dashboard/page.tsx`
- **Course Catalog**: `src/app/app/courses/page.tsx`
- **Simulations**: `src/app/app/simulations/page.tsx`

#### Simulation Development
- **Market Clearing Logic**: `src/lib/simulations/market-clearing.ts`
- **Simulation State**: `src/lib/simulation-state.ts`
- **Scenarios**: `src/lib/simulations/scenarios.ts`
- **Widget Components**: `src/components/widgets/`

#### Design System
- **Theme Configuration**: `src/app/globals.css` (CSS variables)
- **Component Library**: `src/components/ui/`
- **App Layouts**: `src/components/app/`
- **Conditional Layout**: `src/components/ConditionalLayout.tsx`

### Development Best Practices

1. **Dual-Layout Architecture**: Maintain separation between marketing (`/`) and app (`/app/*`) routes
2. **Sanity CMS**: Use Sanity Studio for all content updates - avoid hardcoding content
3. **Component Reusability**: Always check design system before creating new components
4. **State Management**: Use URL state for shareable configurations in simulations
5. **Server Components**: Prefer server components for data fetching (better performance)
6. **TypeScript**: Maintain strict type safety - all components have proper interfaces
7. **Theme Consistency**: Use semantic color tokens from CSS variables
8. **Performance**: Monitor bundle size and use lazy loading for heavy components

### Common Development Tasks

#### Adding a New Course
1. Open Sanity Studio at `/studio`
2. Create new Course document with lessons
3. Content automatically appears in `/app/courses`

#### Creating a New Simulation
1. Add simulation engine to `src/lib/simulations/`
2. Create widget components in `src/components/widgets/`
3. Build page in `src/app/app/simulations/[name]/`
4. Add to Sanity CMS for listing

#### Modifying Theme Colors
1. Update CSS variables in `src/app/globals.css`
2. Changes apply globally via semantic tokens
3. Test both marketing and app layouts

## Project Documentation

### For Developers
- **Component Patterns**: `.claude/component-patterns.md`
- **Simulation Architecture**: `.claude/simulation-architecture.md`
- **Design System Guide**: `.claude/design-system.md`
- **Development Workflows**: `.claude/development-workflows.md`

### For Content Editors
- **Sanity Overview**: `.claude/sanity-overview.md`
- **Content Workflows**: `.claude/sanity-workflows.md`
- **Migration Guide**: `.claude/sanity-migration.md`

## Resources

- **Development Server**: `http://localhost:3000`
- **Sanity Studio**: `http://localhost:3000/studio`
- **Documentation**: `.claude/` directory
- **Design Tokens**: `src/app/globals.css`

This platform provides a robust foundation for power markets education, combining professional UI design with advanced simulation capabilities and comprehensive content management.