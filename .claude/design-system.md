# ExaWatt Design System Documentation

## Overview
The ExaWatt design system provides a cohesive set of reusable components built on Tailwind CSS v4 with a dark theme optimized for power markets education. The system emphasizes professional UI patterns found in energy trading platforms like GridStatus.io.

## Color Palette

### Electric Energy Theme
The ExaWatt design system uses an "Electric Energy" theme that combines vibrant electric blue, energetic orange, and dynamic green for a modern, tech-forward energy platform aesthetic.

### Primary Colors (Electric Blue)
```css
--electric-blue-300: #7dd3fc    /* Light electric blue */
--electric-blue-400: #38bdf8    /* Electric blue text/icons */
--electric-blue-500: #0ea5e9    /* Primary electric blue */
--electric-blue-600: #0284c7    /* Electric blue hover */
--electric-blue-700: #0369a1    /* Dark electric blue */
--electric-blue-800: #075985    /* Darker electric blue */
--electric-blue-900: #0c4a6e    /* Darkest electric blue */
```

### Accent Colors (Electric Orange)
```css
--electric-orange-300: #fdba74   /* Light electric orange */
--electric-orange-400: #fb923c   /* Electric orange text/icons */
--electric-orange-500: #f97316   /* Primary electric orange */
--electric-orange-600: #ea580c   /* Electric orange hover */
--electric-orange-700: #c2410c   /* Dark electric orange */
--electric-orange-800: #9a3412   /* Darker electric orange */
--electric-orange-900: #7c2d12   /* Darkest electric orange */
```

### Secondary Colors (Electric Green)
```css
--electric-green-300: #86efac   /* Light electric green */
--electric-green-400: #4ade80   /* Electric green text/icons */
--electric-green-500: #22c55e   /* Primary electric green */
--electric-green-600: #16a34a   /* Electric green hover */
--electric-green-700: #15803d   /* Dark electric green */
--electric-green-800: #166534   /* Darker electric green */
--electric-green-900: #14532d   /* Darkest electric green */
```

### Semantic Color System
**The key to easy theme changes - modify these tokens to instantly change the entire site:**
```css
--color-primary: var(--electric-blue-500);    /* Main interactive elements */
--color-secondary: var(--electric-green-500); /* Learning/educational actions */
--color-accent: var(--electric-orange-500);   /* Action-oriented buttons */
--color-success: var(--electric-green-500);   /* Success states */
--color-warning: var(--electric-orange-500);  /* Warnings/urgent items */
--color-error: #ef4444;                       /* Error states */
```

### Visual Effects
```css
--gradient-primary: linear-gradient(135deg, var(--color-primary) 0%, var(--electric-blue-600) 100%);
--gradient-accent: linear-gradient(135deg, var(--color-accent) 0%, var(--electric-orange-600) 100%);
--glow-primary: 0 0 20px rgba(14, 165, 233, 0.3);
--glow-accent: 0 0 20px rgba(251, 146, 60, 0.3);
--glow-success: 0 0 20px rgba(34, 197, 94, 0.3);
```

### Alternative Theme Palettes
**For easy theme switching, see `src/lib/theme-presets.ts` for ready-to-use alternatives:**
```css
/* Legacy Industrial Power Theme (Conservative) */
--charcoal-400: #6b7280    /* Available as fallback */
--amber-400: #fbbf24       /* Available as fallback */
--emerald-400: #34d399     /* Available as fallback */

/* Legacy Electric Colors (Deprecated) */
--electric-400: #00d4ff    /* Old electric blue - migrate away */
--power-400: #fbbf24       /* Now --electric-orange-400 */
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
- `primary`: Electric blue gradient for main structural actions
- `secondary`: Electric green for learning/educational actions  
- `accent`: Electric orange gradient for high-energy action buttons
- `outline`: Transparent with colored borders and glow effects
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
- `primary`: Electric blue styling for main categories
- `secondary`: Electric green for learning/success states
- `accent`: Electric orange for action-related badges
- `success`: Electric green for completion/positive states
- `warning`: Electric orange for caution/urgent items
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

## Color Usage Guidelines

### Semantic Color Hierarchy
**Electric Blue (Primary):** Navigation, headers, main structural elements
**Electric Orange (Accent):** High-energy actions like simulations, launches, quick actions
**Electric Green (Secondary):** Learning-focused actions, courses, educational content
**Success/Warning/Error:** Status indicators and feedback

### Button Color Strategy
```tsx
// Simulation actions - use accent (orange) for energy
<Button variant="accent">Run Simulation</Button>
<Button variant="accent">Launch Market Analysis</Button>

// Learning actions - use secondary (green) for education  
<Button variant="secondary">Start Course</Button>
<Button variant="secondary">Continue Learning</Button>

// Primary structural actions - use primary (blue)
<Button variant="primary">Save Settings</Button>
<Button variant="primary">Submit Form</Button>
```

### Badge Color Strategy
```tsx
// Status badges
<Badge variant="success">Completed</Badge>    // Green
<Badge variant="warning">Urgent</Badge>       // Orange  
<Badge variant="error">Failed</Badge>         // Red

// Category badges
<Badge variant="accent">Simulation</Badge>    // Orange
<Badge variant="secondary">Course</Badge>     // Green
<Badge variant="primary">Analysis</Badge>     // Blue
```

### Easy Theme Switching
**To change the entire site theme, modify these 3 lines in `globals.css`:**
```css
--color-primary: var(--electric-blue-500);    /* Change to any color */
--color-accent: var(--electric-orange-500);   /* Change to any color */
--color-secondary: var(--electric-green-500); /* Change to any color */
```

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