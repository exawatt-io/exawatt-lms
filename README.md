# ExaWatt - Power Markets LMS Platform

ExaWatt is a Learning Management System (LMS) designed for power markets education. The platform provides interactive courses, simulations, and AI-powered learning tools to bridge the gap between theoretical knowledge and practical application in electricity markets.

## Project Overview

This is an MVP web application built to help energy professionals, finance professionals transitioning to power trading, policy analysts, and students master electricity market operations through:

- **Interactive Courses**: Structured curriculum from grid fundamentals to advanced trading strategies
- **Market Simulations**: Real-time market clearing, dispatch optimization, and LMP formation tools
- **AI-Powered Learning**: Personalized tutoring, adaptive assessments, and intelligent scenario generation

## Architecture & Technology Stack

- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Content**: MDX for educational content rendering
- **UI Components**: Custom design system with reusable components
- **Theme**: Dark theme with electric blue (#00d4ff) and power yellow (#fbbf24) accents
- **Effects**: Canvas-based particle animation system for electricity background

## Project Structure

```
src/
├── app/                          # App Router pages
│   ├── layout.tsx               # Root layout with theme and background
│   ├── page.tsx                 # Homepage with hero and features
│   ├── courses/                 # Course listing and details
│   │   ├── page.tsx            # Course catalog page
│   │   └── [courseId]/         # Dynamic course pages
│   └── simulations/            # Market simulation pages
├── components/
│   ├── ui/                     # Design system components
│   │   ├── FeatureCard.tsx     # Base card component with variants
│   │   ├── Section.tsx         # Page layout components
│   │   ├── FeatureIcon.tsx     # Styled icon component
│   │   ├── Button.tsx          # Button component with variants
│   │   ├── Badge.tsx           # Label/tag component
│   │   ├── CourseCard.tsx      # Specialized course card
│   │   ├── LearningPath.tsx    # Learning path flow component
│   │   └── SimulationCard.tsx  # Specialized simulation card
│   ├── Navigation.tsx          # Main navigation with logo
│   └── ElectricityBackground.tsx # Particle animation system
├── lib/
│   └── utils.ts               # Utility functions (cn for className merging)
└── content/                   # MDX course content and data
```

## Design System

The application uses a comprehensive design system with shared components to ensure consistency:

### Core Components

- **FeatureCard**: Base card component with variants (`default`, `interactive`, `highlight`)
- **Section/SectionHeader**: Page layout and header components
- **FeatureIcon**: Icon component with themed variants (`electric`, `power`, `mixed`)
- **Button**: Button component with variants (`primary`, `secondary`, `outline`, `ghost`)
- **Badge**: Small label component for tags and difficulty levels

### Specialized Components

- **CourseCard**: Course display cards with stats, descriptions, and CTA buttons
- **SimulationCard**: Simulation display cards with features and launch buttons
- **LearningPath**: Displays recommended course progression flow

### Theme Configuration

Custom Tailwind theme with:
- **Electric Blue**: `#00d4ff` (primary accent)
- **Power Yellow**: `#fbbf24` (secondary accent)
- **Dark Backgrounds**: Slate 900-950 range
- **Gradients**: Electric to power color combinations

## Recent Development History

### Phase 1: Initial Setup (Completed)
- ✅ Next.js project setup with TypeScript and Tailwind CSS
- ✅ Basic course navigation and content rendering
- ✅ MDX content system implementation
- ✅ SEO optimization and metadata management

### Phase 2: Theming & Visual Design (Completed)
- ✅ Dark theme implementation with electric color scheme
- ✅ ExaWatt logo integration in navigation
- ✅ Electricity particle background effects using Canvas API
- ✅ All pages updated to use consistent dark theme styling

### Phase 3: Design System Refactoring (Completed)
- ✅ Created comprehensive shared component library
- ✅ Refactored homepage to use shared components
- ✅ Refactored courses page to use CourseCard and LearningPath components
- ✅ Refactored simulations page to use SimulationCard components
- ✅ Eliminated code duplication across all main pages

### Phase 4: Bug Fixes (Completed)
- ✅ Fixed course lesson navigation (converted divs to Link components)
- ✅ Resolved syntax errors in course detail pages
- ✅ Replaced transparent cards with solid dark gradient backgrounds

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

## Current State & Implementation Status

### ✅ Completed Features
- Responsive homepage with hero section and feature highlights
- Course catalog with grid view and detailed course pages
- Simulations page with interactive simulation cards
- Working navigation between all pages
- Course lesson navigation (clickable lesson items)
- Dark theme with electric particle background
- Complete design system with shared components
- Professional UI/UX with consistent styling

### 🚧 Known Limitations (MVP Scope)
- No authentication system (intentionally excluded for MVP)
- Course content is placeholder data (not real course material)
- Simulations are UI mockups (no actual market clearing logic)
- No user progress tracking or certificates
- No AI-powered features implemented yet

### 🔄 Next Development Priorities
1. **Course Content**: Replace placeholder content with real educational material
2. **Simulation Logic**: Implement actual market clearing algorithms
3. **User Authentication**: Add login/signup when ready to move beyond MVP
4. **Progress Tracking**: Implement lesson completion and user progress
5. **AI Integration**: Add personalized tutoring and assessment features

## File Locations for Common Tasks

### Adding New Courses
- Course data: `src/app/courses/page.tsx` (courses array)
- Course detail pages: `src/app/courses/[courseId]/page.tsx`
- Course content: `src/content/` directory (for MDX files)

### Modifying Design/Styling
- Theme colors: Tailwind config and component variant definitions
- Shared components: `src/components/ui/` directory
- Page layouts: Individual page files in `src/app/`

### Adding New Simulations
- Simulation data: `src/app/simulations/page.tsx` (simulations array)
- Simulation components: `src/components/ui/SimulationCard.tsx`
- Simulation pages: `src/app/simulations/[simulationId]/` (to be created)

## Important Notes for Future Development

1. **Component Consistency**: Always use shared components from `src/components/ui/` rather than creating inline styles
2. **Color Scheme**: Maintain the electric blue and power yellow theme throughout
3. **Responsive Design**: All components are mobile-first responsive
4. **TypeScript**: Maintain type safety - all components have proper TypeScript interfaces
5. **Performance**: The particle background is optimized but monitor performance on lower-end devices

## Contact & Resources

- Original project plan: `exawatt_plan.md` (in parent directory)
- Logo asset: `exawatt.png` (in parent directory)
- Development server runs on: `http://localhost:3000`

This application serves as a solid foundation for a power markets education platform with room for significant feature expansion while maintaining the established design system and architecture.