# ExaWatt Design System Documentation

## Overview
The ExaWatt design system provides a cohesive set of reusable components built on Tailwind CSS v4 with a dark theme optimized for power markets education. The system emphasizes professional UI patterns found in energy trading platforms like GridStatus.io.

## Color Palette

### Primary Colors
```css
--electric-400: #00d4ff    /* Primary electric blue */
--electric-500: #00bfea    /* Electric blue hover state */
--electric-600: #0099cc    /* Electric blue active state */
--electric-700: #007399    /* Electric blue accent */
--electric-800: #004d66    /* Electric blue border */
--electric-900: #002633    /* Electric blue background */
```

### Secondary Colors
```css
--power-400: #fbbf24      /* Power yellow accent */
--power-500: #f59e0b      /* Power yellow hover */
```

### Neutral Palette
```css
--slate-900: #0f172a      /* Primary dark background */
--slate-950: #020617      /* Darker background */
--slate-800: #1e293b      /* Card backgrounds */
--slate-700: #334155      /* Elevated surfaces */
--slate-600: #475569      /* Border colors */
--slate-300: #cbd5e1      /* Secondary text */
--slate-200: #e2e8f0      /* Primary text */
```

## Core Components

### FeatureCard
**Location:** `src/components/ui/FeatureCard.tsx`

Base container component with three variants:
- `default`: Basic card with subtle styling
- `interactive`: Hover effects for clickable content
- `highlight`: Enhanced styling for important content

```tsx
<FeatureCard variant="interactive" size="lg">
  Content here
</FeatureCard>
```

**Variants:**
- `default`: Standard gradient background
- `interactive`: Hover animations and cursor pointer
- `highlight`: Brighter borders and enhanced shadows

**Sizes:**
- `sm`: Compact padding (p-4)
- `md`: Standard padding (p-6) 
- `lg`: Spacious padding (p-8)

### Button Component
**Location:** `src/components/ui/Button.tsx`

Professional button component with consistent styling:

```tsx
<Button variant="primary" size="lg" icon={Play}>
  Launch Simulation
</Button>
```

**Variants:**
- `primary`: Electric blue background for main actions
- `secondary`: Power yellow for secondary actions
- `outline`: Transparent with colored borders
- `ghost`: Minimal styling for tertiary actions

**Features:**
- Icon support with automatic spacing
- Loading states
- Disabled states
- Full accessibility support

### Badge Component
**Location:** `src/components/ui/Badge.tsx`

Small labels for categorization and status:

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="neutral" size="sm">Beginner</Badge>
```

**Variants:**
- `default`: Electric blue styling
- `success`: Green for positive states
- `warning`: Yellow for caution
- `error`: Red for problems
- `neutral`: Gray for general info

## Specialized Components

### CourseCard
**Location:** `src/components/ui/CourseCard.tsx`

Displays course information with consistent layout:
- Course title and description
- Instructor and category information
- Difficulty level and duration
- Enrollment stats and ratings
- Call-to-action buttons

### SimulationCard  
**Location:** `src/components/ui/SimulationCard.tsx`

Interactive cards for simulation previews:
- Simulation name and description
- Feature highlights
- Difficulty and time estimates
- Launch buttons with states

### LearningPath
**Location:** `src/components/ui/LearningPath.tsx`

Visual representation of course progression:
- Connected flow design
- Course dependencies
- Progress indicators
- Responsive layout

## Layout Components

### AppLayout
**Location:** `src/components/app/AppLayout.tsx`

Professional application layout with:
- Collapsible sidebar navigation
- Fixed header with breadcrumbs
- Scrollable main content area
- Full-screen overlay behavior

### AppSidebar
**Location:** `src/components/app/AppSidebar.tsx`

Navigation sidebar featuring:
- Logo and branding
- Hierarchical navigation
- Active state indicators
- Collapse/expand functionality

### ConditionalLayout
**Location:** `src/components/ConditionalLayout.tsx`

Route-based layout switching:
- Marketing layout for public pages
- App layout for `/app/*` routes
- Automatic detection and switching

## Widget System

### BaseWidget
**Location:** `src/components/widgets/BaseWidget.tsx`

Foundation for interactive simulations:
- Progress tracking
- Step-by-step guidance
- Reset and hint functionality
- Completion states
- Timer and interaction metrics

**Usage Modes:**
- `interactive`: Full user control
- `guided`: Step-by-step instructions
- `demo`: Read-only demonstration

**Sizes:**
- `compact`: Minimal UI for embedding
- `medium`: Standard size for most use cases
- `full`: Maximum width for complex simulations

## Simulation Components

### Market Clearing Widgets
**Location:** `src/components/widgets/components/`

Specialized widgets for power market education:
- `MeritOrderWidget`: Generator dispatch visualization
- `SupplyCurveWidget`: Supply and demand curve plotting
- `MarketClearingWidget`: Complete market clearing simulation

## Usage Guidelines

### Component Selection
1. Always use existing components before creating new ones
2. Prefer composition over inheritance
3. Use FeatureCard as the base for most content containers
4. Apply Button component for all interactive elements

### Styling Conventions
1. Use design tokens instead of arbitrary values
2. Maintain consistent spacing with Tailwind's scale
3. Apply hover states to interactive elements
4. Ensure proper contrast ratios for accessibility

### Responsive Design
1. Mobile-first approach with progressive enhancement
2. Test layouts on multiple screen sizes
3. Use flexible grids and containers
4. Implement proper text scaling

### Accessibility
1. Include proper ARIA labels
2. Maintain keyboard navigation support
3. Use semantic HTML elements
4. Test with screen readers

## File Organization

```
src/components/
├── ui/                    # Core design system components
│   ├── FeatureCard.tsx    # Base container component
│   ├── Button.tsx         # Interactive buttons
│   ├── Badge.tsx          # Status labels
│   ├── CourseCard.tsx     # Course display cards
│   ├── SimulationCard.tsx # Simulation preview cards
│   └── LearningPath.tsx   # Course progression flow
├── app/                   # Application layout components
│   ├── AppLayout.tsx      # Main app container
│   ├── AppSidebar.tsx     # Navigation sidebar
│   └── AppHeader.tsx      # Application header
├── widgets/               # Interactive simulation widgets
│   ├── BaseWidget.tsx     # Widget foundation
│   └── components/        # Specialized widgets
└── simulations/           # Simulation-specific components
```

## Development Workflow

### Adding New Components
1. Follow existing naming conventions
2. Include TypeScript interfaces
3. Add variants and size options where appropriate
4. Include usage examples in component documentation
5. Test across different screen sizes

### Modifying Existing Components
1. Consider backward compatibility
2. Update all usage instances
3. Test visual consistency across the application
4. Update documentation as needed

### Testing Components
1. Verify hover and active states
2. Test keyboard navigation
3. Check mobile responsiveness
4. Validate color contrast
5. Test with different content lengths

This design system ensures visual consistency, improves development velocity, and maintains the professional appearance expected in energy market applications.