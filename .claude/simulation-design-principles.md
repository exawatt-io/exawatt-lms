# Simulation Design Principles

## Core Philosophy
Each simulation should feel like a **focused, self-contained application** rather than a long webpage. Users should be able to interact with the simulation without excessive scrolling or navigation.

## Design Principles

### 1. Horizontal-First Layout
- **Use horizontal space effectively** - modern screens are wide, not tall
- **Side-by-side panels** for related information (inputs ↔ outputs, data ↔ visualizations)
- **Maximum 2-3 sections vertically** before considering tabs or horizontal expansion

### 2. App-Like Interface Patterns
- **Tabbed interfaces** for different views/modes (Overview, Analysis, Settings)
- **Collapsible panels** for optional details
- **Modal/drawer patterns** for detailed views that don't need constant visibility
- **Sticky toolbars** with primary actions always accessible

### 3. Content Density & Organization
- **Key metrics at the top** - always visible summary cards
- **Progressive disclosure** - start simple, reveal complexity on demand
- **Contextual grouping** - related controls and displays adjacent to each other

### 4. Shareable State Architecture
- **URL-based state** - entire simulation state encoded in URL parameters
- **One-click sharing** - generate shareable links for specific scenarios
- **Preset system** - common scenarios accessible via dropdown
- **Import/export** - JSON-based scenario sharing

## Layout Patterns

### Pattern 1: Side-by-Side (Default)
```
┌─────────────────┬─────────────────┐
│   Controls &    │   Results &     │
│   Inputs        │   Visualization │
│                 │                 │
├─────────────────┼─────────────────┤
│   Key Metrics (Full Width)       │
└─────────────────┴─────────────────┘
```

### Pattern 2: Tabbed Interface
```
┌─────────────────────────────────────┐
│ [Overview] [Analysis] [Settings]    │
├─────────────────────────────────────┤
│                                     │
│          Tab Content Area           │
│                                     │
└─────────────────────────────────────┘
```

### Pattern 3: Three-Column Dashboard
```
┌──────┬────────────────┬──────────┐
│Inputs│   Main View    │ Details  │
│Panel │ (Chart/Graph)  │ Panel    │
│      │                │          │
│      │                │          │
└──────┴────────────────┴──────────┘
```

## Implementation Strategy

### Phase 1: URL State Management
1. Create `useSimulationState` hook for URL-based state
2. Implement `shareSimulation()` utility function
3. Add "Share" button to all simulation interfaces

### Phase 2: Layout Refactor
1. Convert market clearing to side-by-side layout
2. Use tabbed interface for complex analyses
3. Implement collapsible detail panels

### Phase 3: Enhanced UX
1. Add preset scenario dropdown
2. Implement one-click reset/restore
3. Add keyboard shortcuts for common actions

## State Sharing Specification

### URL Structure
```
/app/simulations/market-clearing?state=<base64-encoded-json>
```

### State Format
```typescript
interface SimulationState {
  generators: Generator[];
  demandBids: DemandBid[];
  scenario: string;
  view: 'overview' | 'analysis' | 'settings';
  settings: SimulationSettings;
}
```

### Share Button Behavior
1. **Copy Link** - copies current state URL to clipboard
2. **Generate Preset** - saves current state as named scenario
3. **Export JSON** - downloads state as JSON file
4. **QR Code** - generates QR code for mobile sharing

## Implementation Components

### Required Components
- `useSimulationState` hook - URL-based state management
- `ShareSimulation` component - Sharing modal with multiple options
- `ScenarioManager` component - Preset management and import/export

### Component Integration
```tsx
// Example simulation page structure
export default function SimulationPage() {
  const { state, updateState, generateShareUrl, shareToClipboard } = useSimulationState(initialState);
  
  return (
    <AppLayout>
      {/* Key metrics - always visible */}
      <MetricsRow />
      
      {/* Tabbed interface */}
      <TabNavigation />
      
      {/* Side-by-side content */}
      <div className="grid grid-cols-2 gap-6">
        <InputPanel />
        <VisualizationPanel />
      </div>
      
      {/* Modals */}
      <ShareSimulation />
      <ScenarioManager />
    </AppLayout>
  );
}
```

## Success Metrics
- **Reduce scrolling** - 90% of interactions should require no scrolling
- **Faster comprehension** - users understand results within 10 seconds
- **Easy sharing** - scenarios shareable with single click
- **Mobile friendly** - works well on tablet-sized screens

## Anti-Patterns to Avoid
- ❌ Long vertical layouts requiring excessive scrolling
- ❌ Stacking 5+ sections vertically
- ❌ Hiding key metrics below the fold
- ❌ Complex multi-step flows without clear progress
- ❌ Non-shareable custom configurations