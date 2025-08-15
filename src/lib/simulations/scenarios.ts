import { WidgetScenario } from './widget-types';
import { Generator, DemandBid } from './types';

// Educational scenarios for market clearing widget
export const MARKET_CLEARING_SCENARIOS: Record<string, WidgetScenario> = {
  'intro-merit-order': {
    id: 'intro-merit-order',
    name: 'Introduction to Merit Order',
    description: 'Learn how generators are dispatched in order of increasing cost',
    learningObjectives: [
      'Understand merit order dispatch',
      'Identify how marginal cost determines dispatch order',
      'See the relationship between cost and generation'
    ],
    difficulty: 'beginner',
    estimatedTime: 5,
    data: {
      generators: [
        { id: 'nuclear1', name: 'Nuclear Plant', fuelType: 'nuclear', capacity: 1000, marginalCost: 15, minOutput: 800, rampRate: 50, availability: 1, co2Emissions: 0 },
        { id: 'coal1', name: 'Coal Plant', fuelType: 'coal', capacity: 600, marginalCost: 35, minOutput: 300, rampRate: 100, availability: 1, co2Emissions: 0.95 },
        { id: 'gas1', name: 'Gas Plant', fuelType: 'gas', capacity: 400, marginalCost: 55, minOutput: 100, rampRate: 300, availability: 1, co2Emissions: 0.4 }
      ] as Generator[],
      demandBids: [
        { id: 'load1', name: 'System Load', quantity: 1200, maxPrice: 80, priority: 'high' }
      ] as DemandBid[]
    },
    constraints: {
      locked: ['demand-bids'],
      editable: [],
      showComponents: ['merit-order', 'supply-curve', 'dispatch-table']
    },
    guidance: {
      steps: [
        {
          id: 'observe-order',
          title: 'Observe Generator Order',
          description: 'Notice how generators are arranged by marginal cost (lowest to highest)',
          highlight: ['merit-order'],
          action: 'observe'
        },
        {
          id: 'see-dispatch',
          title: 'See Dispatch Process',
          description: 'Watch how generators are dispatched to meet the 1200 MW demand',
          highlight: ['dispatch-table'],
          action: 'observe'
        },
        {
          id: 'understand-marginal',
          title: 'Understand Marginal Pricing',
          description: 'The last generator dispatched sets the market price for everyone',
          highlight: ['supply-curve'],
          action: 'observe'
        }
      ],
      hints: {
        'merit-order': 'Cheapest generators always run first - this is called "merit order"',
        'supply-curve': 'The supply curve steps up as more expensive generators are needed'
      }
    }
  },

  'supply-demand-intersection': {
    id: 'supply-demand-intersection',
    name: 'Supply & Demand Intersection',
    description: 'Understand how market clearing price is determined by curve intersection',
    learningObjectives: [
      'Visualize supply and demand curves',
      'Identify market equilibrium point',
      'Understand price formation mechanism'
    ],
    difficulty: 'beginner',
    estimatedTime: 8,
    data: {
      generators: [
        { id: 'nuclear1', name: 'Nuclear Plant', fuelType: 'nuclear', capacity: 800, marginalCost: 15, minOutput: 600, rampRate: 50, availability: 1, co2Emissions: 0 },
        { id: 'coal1', name: 'Coal Plant', fuelType: 'coal', capacity: 600, marginalCost: 35, minOutput: 300, rampRate: 100, availability: 1, co2Emissions: 0.95 },
        { id: 'gas1', name: 'Gas Plant 1', fuelType: 'gas', capacity: 400, marginalCost: 50, minOutput: 100, rampRate: 300, availability: 1, co2Emissions: 0.4 },
        { id: 'gas2', name: 'Gas Plant 2', fuelType: 'gas', capacity: 300, marginalCost: 75, minOutput: 80, rampRate: 250, availability: 1, co2Emissions: 0.4 }
      ] as Generator[],
      demandBids: [
        { id: 'residential', name: 'Residential', quantity: 600, maxPrice: 90, priority: 'high' },
        { id: 'commercial', name: 'Commercial', quantity: 500, maxPrice: 70, priority: 'medium' },
        { id: 'industrial', name: 'Industrial', quantity: 400, maxPrice: 60, priority: 'medium' }
      ] as DemandBid[]
    },
    constraints: {
      locked: [],
      editable: ['demand-quantities'],
      showComponents: ['supply-curve', 'demand-curve', 'intersection-point', 'market-results']
    },
    guidance: {
      steps: [
        {
          id: 'identify-curves',
          title: 'Identify Supply & Demand Curves',
          description: 'The green line shows supply (generation costs), blue shows demand (willingness to pay)',
          highlight: ['supply-curve', 'demand-curve']
        },
        {
          id: 'find-intersection',
          title: 'Find the Intersection',
          description: 'Where the curves cross determines the market clearing price and quantity',
          highlight: ['intersection-point']
        },
        {
          id: 'adjust-demand',
          title: 'Adjust Demand',
          description: 'Try changing residential demand to see how it affects the clearing price',
          action: 'edit'
        }
      ],
      hints: {
        'intersection-point': 'This point represents market equilibrium - where supply meets demand'
      }
    }
  },

  'peak-demand-pricing': {
    id: 'peak-demand-pricing',
    name: 'Peak Demand Pricing',
    description: 'Explore how high demand drives up electricity prices',
    learningObjectives: [
      'Understand peak demand scenarios',
      'See how expensive "peaker" plants affect pricing',
      'Learn about price volatility in electricity markets'
    ],
    difficulty: 'intermediate',
    estimatedTime: 10,
    data: {
      generators: [
        { id: 'nuclear1', name: 'Nuclear Plant', fuelType: 'nuclear', capacity: 1000, marginalCost: 15, minOutput: 800, rampRate: 50, availability: 0.95, co2Emissions: 0 },
        { id: 'coal1', name: 'Coal Plant', fuelType: 'coal', capacity: 800, marginalCost: 35, minOutput: 400, rampRate: 100, availability: 0.9, co2Emissions: 0.95 },
        { id: 'gas1', name: 'Gas Plant 1', fuelType: 'gas', capacity: 500, marginalCost: 45, minOutput: 100, rampRate: 300, availability: 0.95, co2Emissions: 0.4 },
        { id: 'gas2', name: 'Gas Plant 2', fuelType: 'gas', capacity: 400, marginalCost: 60, minOutput: 80, rampRate: 250, availability: 0.9, co2Emissions: 0.4 },
        { id: 'peaker1', name: 'Peaker Plant 1', fuelType: 'gas', capacity: 200, marginalCost: 120, minOutput: 50, rampRate: 200, availability: 0.95, co2Emissions: 0.6 },
        { id: 'peaker2', name: 'Peaker Plant 2', fuelType: 'gas', capacity: 150, marginalCost: 180, minOutput: 30, rampRate: 150, availability: 0.9, co2Emissions: 0.7 }
      ] as Generator[],
      demandBids: [
        { id: 'residential', name: 'Residential (AC Load)', quantity: 1800, maxPrice: 200, priority: 'high' },
        { id: 'commercial', name: 'Commercial', quantity: 1200, maxPrice: 150, priority: 'high' },
        { id: 'industrial', name: 'Industrial', quantity: 400, maxPrice: 100, priority: 'medium' }
      ] as DemandBid[]
    },
    constraints: {
      locked: ['base-generators'],
      editable: ['peaker-costs', 'demand-levels'],
      showComponents: ['all']
    },
    guidance: {
      steps: [
        {
          id: 'observe-high-demand',
          title: 'Observe High Demand',
          description: 'Notice the total demand (3400 MW) exceeds baseload generation capacity',
          highlight: ['demand-curve', 'dispatch-table']
        },
        {
          id: 'see-peaker-dispatch',
          title: 'See Peaker Plant Dispatch',
          description: 'Expensive "peaker" plants must run to meet demand, driving up prices',
          highlight: ['merit-order', 'market-results']
        },
        {
          id: 'experiment-costs',
          title: 'Experiment with Costs',
          description: 'Try changing peaker plant costs to see the price impact',
          action: 'edit'
        }
      ],
      hints: {
        'peaker-plants': 'Peaker plants only run during high demand - they set very high prices but are essential for reliability'
      }
    }
  },

  'renewable-integration': {
    id: 'renewable-integration',
    name: 'Renewable Energy Integration',
    description: 'Explore how solar and wind affect market clearing',
    learningObjectives: [
      'Understand zero marginal cost renewables',
      'See renewable intermittency effects',
      'Learn about renewable energy displacement'
    ],
    difficulty: 'intermediate',
    estimatedTime: 12,
    data: {
      generators: [
        { id: 'nuclear1', name: 'Nuclear Plant', fuelType: 'nuclear', capacity: 800, marginalCost: 15, minOutput: 600, rampRate: 50, availability: 0.95, co2Emissions: 0 },
        { id: 'coal1', name: 'Coal Plant', fuelType: 'coal', capacity: 600, marginalCost: 35, minOutput: 300, rampRate: 100, availability: 0.9, co2Emissions: 0.95 },
        { id: 'gas1', name: 'Gas Plant', fuelType: 'gas', capacity: 500, marginalCost: 50, minOutput: 100, rampRate: 300, availability: 0.95, co2Emissions: 0.4 },
        { id: 'solar1', name: 'Solar Farm 1', fuelType: 'solar', capacity: 400, marginalCost: 0, minOutput: 0, rampRate: 400, availability: 0.8, co2Emissions: 0 },
        { id: 'solar2', name: 'Solar Farm 2', fuelType: 'solar', capacity: 300, marginalCost: 0, minOutput: 0, rampRate: 300, availability: 0.8, co2Emissions: 0 },
        { id: 'wind1', name: 'Wind Farm 1', fuelType: 'wind', capacity: 350, marginalCost: 0, minOutput: 0, rampRate: 350, availability: 0.6, co2Emissions: 0 },
        { id: 'wind2', name: 'Wind Farm 2', fuelType: 'wind', capacity: 250, marginalCost: 0, minOutput: 0, rampRate: 250, availability: 0.4, co2Emissions: 0 }
      ] as Generator[],
      demandBids: [
        { id: 'residential', name: 'Residential Load', quantity: 1200, maxPrice: 100, priority: 'high' },
        { id: 'commercial', name: 'Commercial Load', quantity: 800, maxPrice: 120, priority: 'high' },
        { id: 'industrial', name: 'Industrial Load', quantity: 600, maxPrice: 80, priority: 'medium' }
      ] as DemandBid[]
    },
    constraints: {
      locked: ['fossil-generators'],
      editable: ['renewable-availability'],
      showComponents: ['all'],
      hideComponents: ['economic-surplus']
    },
    guidance: {
      steps: [
        {
          id: 'observe-zero-cost',
          title: 'Observe Zero Marginal Cost',
          description: 'Solar and wind have $0 marginal cost - they always dispatch first when available',
          highlight: ['merit-order']
        },
        {
          id: 'see-displacement',
          title: 'See Fossil Displacement',
          description: 'Renewables displace higher-cost fossil generators, lowering market prices',
          highlight: ['supply-curve', 'market-results']
        },
        {
          id: 'adjust-availability',
          title: 'Adjust Renewable Availability',
          description: 'Change wind/solar availability to simulate weather conditions',
          action: 'edit'
        }
      ],
      hints: {
        'renewable-availability': 'Renewable availability varies with weather - low availability simulates cloudy/calm conditions'
      }
    }
  }
};

// Quick access to scenario lists by difficulty
export const SCENARIOS_BY_DIFFICULTY = {
  beginner: ['intro-merit-order', 'supply-demand-intersection'],
  intermediate: ['peak-demand-pricing', 'renewable-integration'],
  advanced: []
};