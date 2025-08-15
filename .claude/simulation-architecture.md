# ExaWatt Simulation Architecture

## Overview
The ExaWatt simulation system provides interactive educational tools for power markets learning. Built on a widget-based architecture with URL state management, simulations can be embedded, shared, and customized for different learning objectives.

## Core Architecture

### Widget-Based Design
Simulations are built as reusable widgets that can be:
- Embedded in lessons and courses
- Standalone simulation pages  
- Shared via URL with specific scenarios
- Customized for different difficulty levels

### State Management
**Location:** `src/lib/simulation-state.ts`

URL-based state encoding allows:
- Shareable simulation scenarios
- Bookmark-able configurations
- Deep linking to specific states
- Browser back/forward navigation

```typescript
// Example state encoding
const encodedState = encodeSimulationState({
  generators: [...],
  demandBids: [...],
  settings: {...}
});
// Results in: /simulation/market-clearing?state=eyJ0eXBlIjoi...
```

## Simulation Engine

### Market Clearing Engine
**Location:** `src/lib/simulations/market-clearing.ts`

Core algorithm implementing:
- **Merit Order Dispatch**: Generator sorting by marginal cost
- **Market Clearing**: Supply/demand intersection finding
- **Economic Metrics**: Consumer/producer surplus calculation
- **Results Analysis**: Detailed breakdown of dispatch decisions

```typescript
const result = MarketClearingEngine.clearMarket(generators, demandBids);
// Returns: clearing price, dispatched generators, economic surplus
```

### Key Features:
- Real-time calculations as users modify inputs
- Multiple scenarios with preset configurations
- Realistic generator characteristics (ramp rates, minimum output)
- Environmental impact calculations (CO2 emissions)

## Widget Components

### BaseWidget System
**Location:** `src/components/widgets/BaseWidget.tsx`

Foundation component providing:
- **Progress Tracking**: Step completion and timing
- **Guided Mode**: Step-by-step learning progression
- **Interactive Mode**: Free exploration
- **Demo Mode**: Read-only demonstrations
- **Reset Functionality**: Return to initial state
- **Hint System**: Contextual learning assistance

### Widget Modes

#### Interactive Mode
```tsx
<BaseWidget mode="interactive" scenario={scenario}>
  <MarketClearingWidget />
</BaseWidget>
```
- Full user control over parameters
- Real-time feedback on changes
- Educational tooltips and explanations

#### Guided Mode
```tsx
<BaseWidget mode="guided" scenario={guidedScenario}>
  <MarketClearingWidget />
</BaseWidget>
```
- Step-by-step instructions
- Progressive complexity introduction
- Validation of learning objectives
- Automatic advancement through concepts

#### Demo Mode
```tsx
<BaseWidget mode="demo" scenario={demoScenario}>
  <MarketClearingWidget />
</BaseWidget>
```
- Read-only visualization
- Animated explanations
- No user input required
- Perfect for presentations

## Specialized Widgets

### Market Clearing Widget
**Location:** `src/components/widgets/MarketClearingWidget.tsx`

Complete market simulation featuring:
- Generator table with editable parameters
- Demand bid management
- Real-time supply/demand curves
- Merit order visualization
- Economic analysis panel

### Merit Order Widget
**Location:** `src/components/widgets/components/MeritOrderWidget.tsx`

Focused on dispatch visualization:
- Generator stacking by marginal cost
- Capacity utilization display
- Fuel type color coding
- Interactive generator selection

### Supply Curve Widget
**Location:** `src/components/widgets/components/SupplyCurveWidget.tsx`

Economic curve visualization:
- Interactive supply and demand plotting
- Clearing point identification
- Surplus area calculations
- Price/quantity relationship exploration

## Scenario System

### Scenario Configuration
**Location:** `src/lib/simulations/scenarios.ts`

Predefined scenarios include:
- **Normal Conditions**: Typical market operations
- **Peak Demand**: High load stress testing
- **Renewable Integration**: Variable generation challenges
- **Emergency Reserves**: System reliability scenarios

```typescript
interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  generators: Generator[];
  demandBids: DemandBid[];
  marketConditions: {
    temperature: number;
    windSpeed: number;
    solarIrradiance: number;
  };
  guidance?: {
    steps: Step[];
    hints: Record<string, string>;
  };
}
```

### Guided Learning Steps
```typescript
interface GuidanceStep {
  id: string;
  title: string;
  description: string;
  action: 'observe' | 'interact' | 'calculate';
  highlight?: string[];  // UI elements to emphasize
  validation?: (state: any) => boolean;
}
```

## Data Types

### Generator Model
```typescript
interface Generator {
  id: string;
  name: string;
  fuelType: 'nuclear' | 'coal' | 'gas' | 'solar' | 'wind' | 'hydro';
  capacity: number;          // MW
  marginalCost: number;      // $/MWh
  minOutput: number;         // MW
  rampRate: number;          // MW/min
  availability: number;      // 0-1 (percentage available)
  co2Emissions: number;      // tons CO2/MWh
}
```

### Demand Bid Model
```typescript
interface DemandBid {
  id: string;
  name: string;
  quantity: number;          // MW
  maxPrice: number;          // $/MWh
  priority: 'high' | 'medium' | 'low';
}
```

### Market Result
```typescript
interface MarketResult {
  clearingPrice: number;
  clearedQuantity: number;
  dispatchedGenerators: DispatchResult[];
  clearedDemand: DemandResult[];
  totalRevenue: number;
  totalCost: number;
  consumerSurplus: number;
  producerSurplus: number;
}
```

## Integration with Learning Management

### Course Integration
Widgets integrate with the broader LMS through:
- **Lesson Embedding**: Widgets within course content
- **Progress Tracking**: Completion status and analytics
- **Assessment Integration**: Quiz questions based on simulation results
- **Adaptive Learning**: Difficulty adjustment based on performance

### Sanity CMS Integration
Simulation configurations stored in Sanity:
- **Default Parameters**: Base simulation setups
- **Scenario Library**: Curated learning scenarios  
- **Difficulty Progression**: Beginner to advanced variants
- **Content Linking**: Connections to course lessons

## Performance Optimization

### Real-time Calculations
- **Debounced Updates**: Prevent excessive recalculation
- **Incremental Computation**: Only recalculate changed elements
- **Memoization**: Cache expensive calculations
- **Web Workers**: Offload heavy computations (future enhancement)

### State Management
- **URL Compression**: Efficient state encoding
- **Lazy Loading**: Load scenarios on demand
- **Caching Strategy**: Browser and memory caching
- **Persistence**: Save user progress locally

## Future Enhancements

### Advanced Simulations
- **Multi-Period Optimization**: Day-ahead market clearing
- **Transmission Constraints**: Grid congestion modeling
- **Ancillary Services**: Frequency regulation markets
- **Real-time Dispatch**: 5-minute market operations

### Enhanced Interactivity
- **Multi-user Simulations**: Collaborative market participation
- **AI Opponents**: Automated market participants
- **Historical Data Integration**: Real market scenario replay
- **Prediction Challenges**: Forecast accuracy competitions

### Analytics and Assessment
- **Learning Analytics**: Detailed interaction tracking
- **Competency Mapping**: Skill progression measurement
- **Adaptive Questioning**: Dynamic assessment generation
- **Peer Comparison**: Anonymous benchmarking

## File Structure

```
src/lib/simulations/
├── market-clearing.ts     # Core market clearing algorithm
├── scenarios.ts           # Predefined simulation scenarios
├── types.ts              # TypeScript interfaces
└── widget-types.ts       # Widget-specific types

src/components/widgets/
├── BaseWidget.tsx         # Foundation widget component
├── MarketClearingWidget.tsx # Complete market simulation
└── components/
    ├── MeritOrderWidget.tsx    # Generator dispatch view
    ├── SupplyCurveWidget.tsx   # Economic curve plotting
    └── [future widgets]

src/components/simulations/
├── GeneratorTable.tsx     # Editable generator parameters
├── DemandBidTable.tsx     # Demand management interface
├── ShareSimulation.tsx    # URL sharing functionality
└── ScenarioManager.tsx    # Scenario selection interface
```

## Development Guidelines

### Creating New Widgets
1. Extend BaseWidget for consistent UX
2. Implement all three modes (interactive, guided, demo)
3. Include proper TypeScript interfaces
4. Add scenario configuration support
5. Implement URL state management

### Performance Best Practices
1. Debounce user inputs to prevent excessive calculations
2. Use React.memo for expensive components
3. Implement proper loading states
4. Test with large datasets

### Educational Design Principles
1. Progressive complexity introduction
2. Immediate feedback on user actions
3. Clear learning objective communication
4. Multiple pathways through content
5. Assessment integration opportunities

This architecture provides a scalable foundation for power markets education while maintaining flexibility for future enhancements and integrations.