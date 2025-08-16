# ExaWatt Development Documentation

This directory contains comprehensive documentation for the ExaWatt power markets learning platform. These files are designed to help developers understand the codebase architecture, patterns, and best practices.

## Documentation Overview

### 📋 **Sanity CMS Documentation**
Complete guide to the content management system:
- **[Overview](./sanity-overview.md)** - High-level architecture and implementation status
- **[Schema Design](./sanity-schemas.md)** - Content types, fields, and relationships
- **[Content Workflows](./sanity-workflows.md)** - Content creation and management processes
- **[Technical Integration](./sanity-integration.md)** - GROQ queries, frontend integration, and performance
- **[Migration Guide](./sanity-migration.md)** - Content migration tools and troubleshooting

### 🎨 [Design System](./design-system.md)  
Comprehensive component library documentation covering:
- Color palette and design tokens
- Core UI components (FeatureCard, Button, Badge)
- Specialized components (CourseCard, SimulationCard)
- Layout components (AppLayout, ConditionalLayout)
- Widget system architecture
- Usage guidelines and best practices

### 🔬 [Simulation Architecture](./simulation-architecture.md)
Deep dive into the interactive simulation system:
- Widget-based architecture design
- Market clearing engine implementation
- State management with URL encoding
- Scenario system and guided learning
- Performance optimization strategies
- Future enhancement roadmap

### 🧩 [Component Patterns](./component-patterns.md)
Common patterns and architectural decisions:
- Layout and composition patterns
- State management approaches
- Event handling strategies
- Error handling and validation
- Performance optimization techniques
- Testing patterns and examples

### 🛠️ [Development Workflows](./development-workflows.md)
Complete development process guide:
- Project setup and development commands
- Code organization and naming conventions
- Component and simulation development workflows
- Git workflow and commit conventions
- Quality assurance and code review processes
- Deployment and troubleshooting procedures

### 🔌 [API Integration Guide](./api-integration-guide.md)
External service integration patterns:
- Sanity CMS integration and data fetching
- Real-time data and WebSocket patterns
- Authentication and user management
- External service abstractions
- Error handling and resilience strategies
- Testing and performance optimization

## Quick Reference

### Key File Locations
```
src/
├── components/ui/          # Core design system components
├── components/app/         # Application layout components  
├── components/widgets/     # Interactive simulation widgets
├── lib/simulations/        # Simulation engines and logic
├── sanity/                 # CMS configuration and schemas
└── app/                    # Next.js pages and routing
```

### Essential Commands
```bash
npm run dev                 # Start development server
npm run build              # Production build
npm run lint               # Code linting
npm run type-check         # TypeScript validation
```

### Color System
```css
--electric-400: #00d4ff    /* Primary electric blue */
--power-400: #fbbf24       /* Secondary power yellow */
--slate-900: #0f172a       /* Dark background */
```

## Getting Started

1. **New Developers**: Start with [Development Workflows](./development-workflows.md) for setup and conventions
2. **UI Development**: Reference [Design System](./design-system.md) for component usage
3. **Simulation Work**: Study [Simulation Architecture](./simulation-architecture.md) for widget patterns
4. **Content Management**: Use [Sanity CMS Documentation](./sanity-cms-documentation.md) for CMS integration
5. **API Integration**: Follow [API Integration Guide](./api-integration-guide.md) for external services

## Contributing to Documentation

When making significant changes to the codebase:

1. **Update Relevant Documentation**: Keep docs in sync with code changes
2. **Add New Patterns**: Document new architectural patterns for future reference
3. **Include Examples**: Provide practical examples for complex concepts
4. **Cross-reference**: Link related concepts across documents

## Documentation Standards

- **Code Examples**: Include complete, working code snippets
- **File Locations**: Always specify file paths for referenced code
- **TypeScript**: Use proper TypeScript interfaces in examples
- **Best Practices**: Explain not just how, but why patterns are recommended
- **Future Considerations**: Note planned enhancements and migrations

These documentation files serve as the single source of truth for ExaWatt development practices and should be consulted before implementing new features or making architectural decisions.