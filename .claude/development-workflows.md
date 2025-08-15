# ExaWatt Development Workflows

## Overview
This document outlines the development workflows, conventions, and best practices for contributing to the ExaWatt platform. Following these workflows ensures code quality, consistency, and smooth collaboration.

## Project Setup and Development

### Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd exawatt

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Development Commands
```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting (run before commits)
npm run lint

# Type checking
npm run type-check

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Code Organization

### File Structure Conventions
```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── (marketing)/             # Marketing route group
│   └── app/                     # App route group
│       ├── layout.tsx           # App-only layout
│       ├── courses/             # Course management
│       ├── simulations/         # Simulation pages
│       └── dashboard/           # User dashboard
├── components/
│   ├── ui/                      # Core design system
│   ├── app/                     # App-specific layouts
│   ├── simulations/             # Simulation components
│   ├── widgets/                 # Interactive widgets
│   └── [feature]/               # Feature-specific components
├── lib/
│   ├── utils.ts                 # Utility functions
│   ├── simulation-state.ts      # State management
│   ├── simulations/             # Simulation engines
│   └── [feature]/               # Feature-specific logic
├── sanity/                      # Sanity CMS configuration
│   ├── lib/                     # Client and utilities
│   ├── schemaTypes/             # Content schemas
│   └── structure.ts             # Studio structure
└── content/                     # Static content (MDX)
```

### Naming Conventions

#### Files and Directories
- **Components**: PascalCase (`FeatureCard.tsx`, `AppLayout.tsx`)
- **Hooks**: camelCase starting with "use" (`useSimulationState.ts`)
- **Utilities**: camelCase (`simulation-state.ts`, `market-clearing.ts`)
- **Pages**: lowercase with hyphens (`market-clearing/page.tsx`)
- **Directories**: kebab-case (`app-layout/`, `market-clearing/`)

#### Variables and Functions
- **Variables**: camelCase (`clearingPrice`, `dispatchedGenerators`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_SCENARIOS`, `MAX_CAPACITY`)
- **Types/Interfaces**: PascalCase (`Generator`, `MarketResult`)
- **Enums**: PascalCase (`FuelType`, `DifficultyLevel`)

```typescript
// Good examples
interface SimulationScenario {
  id: string;
  name: string;
  generators: Generator[];
}

const DEFAULT_GENERATOR_CAPACITY = 1000;

function clearMarket(generators: Generator[]): MarketResult {
  // Implementation
}

const useMarketClearing = () => {
  // Hook implementation
};
```

## Component Development Workflow

### Creating New Components

1. **Plan the Component**
   - Define the component's purpose and scope
   - Identify required props and variants
   - Consider reusability and composition

2. **Create the Component File**
   ```typescript
   // src/components/ui/NewComponent.tsx
   import React from 'react';
   import { cn } from '@/lib/utils';
   
   interface NewComponentProps {
     variant?: 'default' | 'primary';
     size?: 'sm' | 'md' | 'lg';
     children: React.ReactNode;
     className?: string;
   }
   
   export function NewComponent({
     variant = 'default',
     size = 'md',
     children,
     className,
     ...props
   }: NewComponentProps) {
     return (
       <div 
         className={cn(
           'base-styles',
           variantStyles[variant],
           sizeStyles[size],
           className
         )}
         {...props}
       >
         {children}
       </div>
     );
   }
   ```

3. **Add to Design System**
   - Export from appropriate index file
   - Update design system documentation
   - Add usage examples

4. **Test the Component**
   ```typescript
   // src/components/ui/__tests__/NewComponent.test.tsx
   import { render, screen } from '@testing-library/react';
   import { NewComponent } from '../NewComponent';
   
   describe('NewComponent', () => {
     it('renders children correctly', () => {
       render(<NewComponent>Test content</NewComponent>);
       expect(screen.getByText('Test content')).toBeInTheDocument();
     });
     
     it('applies variant classes correctly', () => {
       render(<NewComponent variant="primary">Content</NewComponent>);
       expect(screen.getByText('Content')).toHaveClass('primary-variant-class');
     });
   });
   ```

### Modifying Existing Components

1. **Assess Impact**
   - Check all usage instances across the codebase
   - Consider backward compatibility
   - Plan migration strategy if needed

2. **Make Changes**
   - Update component implementation
   - Maintain existing prop interfaces when possible
   - Add new props with sensible defaults

3. **Update Usage**
   - Update all component instances if needed
   - Test visual consistency across the app
   - Update documentation

4. **Test Thoroughly**
   - Run existing tests
   - Add new tests for new functionality
   - Visual regression testing

## Simulation Development Workflow

### Creating New Simulations

1. **Define Learning Objectives**
   ```typescript
   const simulationScenario: SimulationScenario = {
     id: 'new-simulation',
     name: 'New Market Concept',
     description: 'Learn about...',
     learningObjectives: [
       'Understand concept A',
       'Apply technique B',
       'Analyze result C'
     ],
     // ... other properties
   };
   ```

2. **Implement Engine Logic**
   ```typescript
   // src/lib/simulations/new-simulation.ts
   export class NewSimulationEngine {
     static calculate(params: SimulationParams): SimulationResult {
       // Core algorithm implementation
     }
     
     static validateInputs(params: SimulationParams): ValidationResult {
       // Input validation logic
     }
   }
   ```

3. **Create Widget Component**
   ```typescript
   // src/components/widgets/NewSimulationWidget.tsx
   export function NewSimulationWidget({
     scenario,
     widgetState,
     onStepComplete,
     mode
   }: WidgetProps) {
     // Widget implementation using BaseWidget patterns
   }
   ```

4. **Add to Widget System**
   - Register widget with BaseWidget
   - Create guided learning steps
   - Add scenario configurations
   - Implement URL state management

### Testing Simulations

1. **Unit Tests for Engines**
   ```typescript
   describe('NewSimulationEngine', () => {
     it('calculates results correctly', () => {
       const params = { /* test parameters */ };
       const result = NewSimulationEngine.calculate(params);
       expect(result).toEqual(expectedResult);
     });
     
     it('handles edge cases', () => {
       const edgeCaseParams = { /* edge case */ };
       const result = NewSimulationEngine.calculate(edgeCaseParams);
       expect(result).toBeDefined();
     });
   });
   ```

2. **Integration Tests for Widgets**
   ```typescript
   describe('NewSimulationWidget', () => {
     it('renders scenario correctly', () => {
       render(<NewSimulationWidget scenario={testScenario} />);
       expect(screen.getByText(testScenario.name)).toBeInTheDocument();
     });
     
     it('handles user interactions', () => {
       const onStepComplete = jest.fn();
       render(
         <NewSimulationWidget 
           scenario={testScenario}
           onStepComplete={onStepComplete}
         />
       );
       // Simulate user interaction
       // Assert onStepComplete was called
     });
   });
   ```

## Content Management Workflow

### Sanity CMS Development

1. **Schema Design**
   ```typescript
   // src/sanity/schemaTypes/newContentType.ts
   export const newContentType = defineType({
     name: 'newContentType',
     title: 'New Content Type',
     type: 'document',
     fields: [
       defineField({
         name: 'title',
         title: 'Title',
         type: 'string',
         validation: (rule) => rule.required(),
       }),
       // Additional fields
     ],
     groups: [
       { name: 'content', title: 'Content', default: true },
       { name: 'seo', title: 'SEO' },
     ],
   });
   ```

2. **Frontend Integration**
   ```typescript
   // src/sanity/lib/queries.ts
   export const newContentQuery = groq`
     *[_type == "newContentType" && slug.current == $slug][0] {
       title,
       content,
       // Additional fields
     }
   `;
   
   // Usage in components
   export async function getNewContent(slug: string) {
     return await sanityFetch({
       query: newContentQuery,
       params: { slug },
       revalidate: 60,
     });
   }
   ```

3. **Studio Configuration**
   - Add to schema types index
   - Update studio structure
   - Configure field groups and validation

### Content Creation Process

1. **Planning**
   - Define content structure and relationships
   - Plan SEO strategy
   - Identify reusable components

2. **Implementation**
   - Create content in Sanity Studio
   - Add proper metadata and SEO fields
   - Link to related content

3. **Integration**
   - Create frontend pages/components
   - Implement proper error handling
   - Add loading states

4. **Testing**
   - Test content rendering
   - Verify links and relationships
   - Check SEO metadata

## Git Workflow

### Branch Naming
- **Features**: `feature/description` (`feature/market-clearing-widget`)
- **Fixes**: `fix/description` (`fix/navigation-mobile-layout`)
- **Content**: `content/description` (`content/course-materials`)
- **Refactor**: `refactor/description` (`refactor/simulation-architecture`)

### Commit Messages
Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Examples:
```
feat(simulations): add market clearing widget
fix(navigation): resolve mobile menu overlay issue
docs(readme): update setup instructions
refactor(components): extract common card patterns
content(courses): add grid fundamentals lesson
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-simulation
   ```

2. **Make Changes**
   - Follow code conventions
   - Add tests for new functionality
   - Update documentation

3. **Pre-commit Checks**
   ```bash
   npm run lint
   npm run type-check
   npm test
   npm run build
   ```

4. **Create Pull Request**
   - Use descriptive title and description
   - Link related issues
   - Add screenshots for UI changes
   - Request appropriate reviewers

5. **Address Review Feedback**
   - Make requested changes
   - Respond to comments
   - Re-request review when ready

6. **Merge**
   - Squash commits if needed
   - Delete feature branch after merge

## Quality Assurance

### Code Review Checklist

#### General
- [ ] Code follows established patterns
- [ ] TypeScript types are properly defined
- [ ] Error handling is implemented
- [ ] Performance considerations addressed

#### Components
- [ ] Props interface is well-defined
- [ ] Component is properly exported
- [ ] Styling follows design system
- [ ] Accessibility requirements met

#### Simulations
- [ ] Algorithm logic is correct
- [ ] Edge cases are handled
- [ ] URL state management works
- [ ] Learning objectives are clear

#### Testing
- [ ] Unit tests cover core functionality
- [ ] Integration tests verify user flows
- [ ] Tests are reliable and fast
- [ ] Test coverage is adequate

### Performance Guidelines

1. **Bundle Size**
   - Monitor bundle size impact
   - Use dynamic imports for large components
   - Avoid unnecessary dependencies

2. **Runtime Performance**
   - Profile expensive operations
   - Implement proper memoization
   - Use debouncing for user inputs

3. **Loading States**
   - Show loading indicators
   - Implement skeleton screens
   - Handle error states gracefully

## Deployment Workflow

### Staging Environment
1. **Automatic Deployment**
   - All PRs deploy to preview URLs
   - Main branch deploys to staging
   - Automatic testing on deployment

2. **Testing Process**
   - Functional testing on staging
   - Cross-browser compatibility
   - Mobile responsiveness check

### Production Deployment
1. **Release Preparation**
   - Create release branch
   - Update version numbers
   - Generate changelog

2. **Deployment Process**
   - Deploy to production
   - Monitor for errors
   - Rollback plan ready

3. **Post-deployment**
   - Verify functionality
   - Monitor performance metrics
   - Update documentation

## Troubleshooting Common Issues

### Development Environment
- **Node version conflicts**: Use `.nvmrc` file
- **Package installation issues**: Clear `node_modules` and reinstall
- **TypeScript errors**: Check for missing type definitions

### Simulation Issues
- **State management**: Verify URL encoding/decoding
- **Performance**: Check for unnecessary re-renders
- **Calculation errors**: Add debugging logs and unit tests

### Content Management
- **Sanity connection**: Check environment variables
- **Schema changes**: Restart development server
- **GROQ queries**: Use Sanity Vision for testing

Following these workflows ensures consistent, high-quality development and smooth collaboration across the ExaWatt platform.