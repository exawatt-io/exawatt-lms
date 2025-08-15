# ExaWatt Component Patterns

## Overview
This document outlines the common patterns and architectural decisions used throughout the ExaWatt codebase. Following these patterns ensures consistency, maintainability, and optimal user experience.

## Layout Patterns

### Conditional Layout Architecture
**Location:** `src/components/ConditionalLayout.tsx`

Implements route-based layout switching for different user experiences:

```tsx
// Automatic layout detection based on URL path
function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = pathname.startsWith('/app');
  
  if (isAppRoute) {
    return <AppLayout>{children}</AppLayout>;
  }
  
  return <MarketingLayout>{children}</MarketingLayout>;
}
```

**Pattern Benefits:**
- Clean separation between marketing and application interfaces
- Automatic layout switching without manual configuration
- Consistent navigation patterns within each context
- Optimal UX for different user journeys

### App Layout Pattern
**Location:** `src/components/app/AppLayout.tsx`

Professional application layout inspired by trading platforms:

```tsx
<div className="h-screen flex bg-slate-950 fixed inset-0 z-50">
  <AppSidebar collapsed={sidebarCollapsed} />
  <div className="flex-1 flex flex-col min-w-0">
    <AppHeader title={title} subtitle={subtitle} />
    <main className="flex-1 overflow-auto">
      {children}
    </main>
  </div>
</div>
```

**Key Features:**
- Fixed full-screen layout preventing unwanted scrolling
- Collapsible sidebar for space optimization
- Proper overflow handling for large content
- Professional appearance matching industry tools

## Component Composition Patterns

### Feature Card Base Pattern
**Location:** `src/components/ui/FeatureCard.tsx`

Extensible base component with variant system:

```tsx
interface FeatureCardProps {
  variant?: 'default' | 'interactive' | 'highlight';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// Usage in specialized components
function CourseCard({ children, ...props }: CourseCardProps) {
  return (
    <FeatureCard variant="interactive" size="lg" {...props}>
      {children}
    </FeatureCard>
  );
}
```

**Pattern Benefits:**
- Consistent visual foundation across all cards
- Predictable behavior and styling
- Easy customization through variants
- Reduced code duplication

### Compound Component Pattern
Used in complex interfaces like data tables:

```tsx
// GeneratorTable compound structure
<GeneratorTable>
  <GeneratorTable.Header />
  <GeneratorTable.Body>
    {generators.map(generator => (
      <GeneratorTable.Row key={generator.id} generator={generator} />
    ))}
  </GeneratorTable.Body>
</GeneratorTable>
```

**Benefits:**
- Flexible composition while maintaining cohesion
- Clear hierarchy and relationship between components
- Easier maintenance and testing
- Better code organization

## State Management Patterns

### URL State Pattern
**Location:** `src/lib/simulation-state.ts`

Simulation state encoded in URL for shareability:

```tsx
function useSimulationState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const updateState = useCallback((newState: SimulationState) => {
    const encoded = encodeSimulationState(newState);
    router.push(`?state=${encoded}`, { scroll: false });
  }, [router]);
  
  return { state, updateState };
}
```

**Pattern Benefits:**
- Shareable simulation configurations
- Browser back/forward navigation support
- Bookmarkable application states
- No server-side state management needed

### Local State with URL Sync Pattern
Common pattern for widgets and simulations:

```tsx
function MarketClearingWidget() {
  const [localState, setLocalState] = useState(defaultState);
  const { state: urlState, updateState } = useSimulationState();
  
  // Sync local changes to URL after debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateState(localState);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [localState, updateState]);
  
  return (
    // Widget implementation
  );
}
```

## Data Flow Patterns

### Props Drilling with Context
For deeply nested component trees:

```tsx
// Context for simulation widget hierarchy
const WidgetContext = createContext<{
  scenario: WidgetScenario;
  mode: WidgetMode;
  onStepComplete: (stepId: string, data: any) => void;
}>();

// Provider at widget root
function BaseWidget({ scenario, mode, children }) {
  return (
    <WidgetContext.Provider value={{ scenario, mode, onStepComplete }}>
      {children}
    </WidgetContext.Provider>
  );
}

// Consumption in nested components
function SubWidget() {
  const { scenario, onStepComplete } = useContext(WidgetContext);
  // Component implementation
}
```

### Render Props Pattern
For flexible component composition:

```tsx
interface DataTableProps<T> {
  data: T[];
  children: (item: T, index: number) => React.ReactNode;
  emptyState?: React.ReactNode;
}

function DataTable<T>({ data, children, emptyState }: DataTableProps<T>) {
  if (data.length === 0) {
    return emptyState || <div>No data available</div>;
  }
  
  return (
    <div className="data-table">
      {data.map((item, index) => children(item, index))}
    </div>
  );
}

// Usage
<DataTable data={generators}>
  {(generator, index) => (
    <GeneratorRow key={generator.id} generator={generator} />
  )}
</DataTable>
```

## Event Handling Patterns

### Debounced Update Pattern
For real-time simulations with expensive calculations:

```tsx
function useDebounced<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage in components
function SimulationInput({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounced(localValue, 300);
  
  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);
  
  return (
    <input 
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
    />
  );
}
```

### Event Aggregation Pattern
For complex interactions with multiple related events:

```tsx
function useMarketInteractions() {
  const [interactions, setInteractions] = useState<MarketInteraction[]>([]);
  
  const trackInteraction = useCallback((type: InteractionType, data: any) => {
    setInteractions(prev => [...prev, {
      id: generateId(),
      type,
      data,
      timestamp: Date.now()
    }]);
  }, []);
  
  const clearInteractions = useCallback(() => {
    setInteractions([]);
  }, []);
  
  return { interactions, trackInteraction, clearInteractions };
}
```

## Error Handling Patterns

### Error Boundary Pattern
For graceful error recovery:

```tsx
class SimulationErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <FeatureCard className="text-center">
          <h3>Simulation Error</h3>
          <p>Something went wrong with the simulation.</p>
          <Button onClick={() => window.location.reload()}>
            Reload Simulation
          </Button>
        </FeatureCard>
      );
    }
    
    return this.props.children;
  }
}
```

### Validation Pattern
For user input validation:

```tsx
function useValidation<T>(value: T, validator: (value: T) => string | null) {
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const validationError = validator(value);
    setError(validationError);
  }, [value, validator]);
  
  return { error, isValid: error === null };
}

// Usage
function GeneratorInput({ generator, onChange }) {
  const { error, isValid } = useValidation(generator.capacity, (capacity) => {
    if (capacity <= 0) return "Capacity must be positive";
    if (capacity > 10000) return "Capacity too large";
    return null;
  });
  
  return (
    <div>
      <input value={generator.capacity} onChange={onChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

## Performance Patterns

### Memoization Pattern
For expensive computations:

```tsx
function MarketClearingResults({ generators, demandBids }) {
  const results = useMemo(() => {
    return MarketClearingEngine.clearMarket(generators, demandBids);
  }, [generators, demandBids]);
  
  return <ResultsDisplay results={results} />;
}

// For component memoization
const GeneratorRow = React.memo(function GeneratorRow({ generator, onChange }) {
  return (
    // Component implementation
  );
}, (prevProps, nextProps) => {
  // Custom comparison for optimization
  return prevProps.generator.id === nextProps.generator.id &&
         prevProps.generator.capacity === nextProps.generator.capacity;
});
```

### Virtual Scrolling Pattern
For large datasets (future implementation):

```tsx
function VirtualizedTable({ items, rowHeight = 50 }) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerHeight = 400;
  
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / rowHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / rowHeight),
      items.length
    );
    
    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index,
      top: (startIndex + index) * rowHeight
    }));
  }, [items, scrollTop, rowHeight, containerHeight]);
  
  return (
    <div 
      className="virtual-container"
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * rowHeight, position: 'relative' }}>
        {visibleItems.map(({ item, index, top }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top,
              height: rowHeight,
              width: '100%'
            }}
          >
            <ItemComponent item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Testing Patterns

### Component Testing Pattern
Using React Testing Library:

```tsx
describe('FeatureCard', () => {
  it('renders with correct variant classes', () => {
    render(
      <FeatureCard variant="interactive">
        Test content
      </FeatureCard>
    );
    
    expect(screen.getByText('Test content').parentElement)
      .toHaveClass('cursor-pointer');
  });
  
  it('handles click events in interactive mode', () => {
    const handleClick = jest.fn();
    render(
      <FeatureCard variant="interactive" onClick={handleClick}>
        Test content
      </FeatureCard>
    );
    
    fireEvent.click(screen.getByText('Test content'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Simulation Testing Pattern
```tsx
describe('MarketClearingEngine', () => {
  it('clears market correctly with simple scenario', () => {
    const generators = [
      { id: '1', marginalCost: 30, capacity: 100, availability: 1.0 },
      { id: '2', marginalCost: 50, capacity: 100, availability: 1.0 }
    ];
    
    const demandBids = [
      { id: '1', quantity: 150, maxPrice: 60 }
    ];
    
    const result = MarketClearingEngine.clearMarket(generators, demandBids);
    
    expect(result.clearingPrice).toBe(50);
    expect(result.clearedQuantity).toBe(150);
    expect(result.dispatchedGenerators).toHaveLength(2);
  });
});
```

## Documentation Patterns

### Component Documentation
```tsx
/**
 * FeatureCard provides a consistent container for content with
 * multiple visual variants and interactive behaviors.
 * 
 * @example
 * ```tsx
 * <FeatureCard variant="interactive" size="lg">
 *   <h3>Course Title</h3>
 *   <p>Course description...</p>
 * </FeatureCard>
 * ```
 */
interface FeatureCardProps {
  /** Visual variant affecting styling and behavior */
  variant?: 'default' | 'interactive' | 'highlight';
  /** Size affects padding and overall dimensions */
  size?: 'sm' | 'md' | 'lg';
  /** Content to render inside the card */
  children: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
}
```

Following these patterns ensures consistency across the codebase, improves maintainability, and provides a better developer experience for future enhancements.