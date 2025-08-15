// Core simulation types and interfaces

export interface SimulationStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  data?: any;
}

export interface SimulationConfig {
  id: string;
  title: string;
  description: string;
  steps: SimulationStep[];
  parameters: Record<string, any>;
  results: Record<string, any>;
}

export interface SimulationController {
  reset: () => void;
  step: (stepId: string) => void;
  updateParameter: (key: string, value: any) => void;
  getCurrentStep: () => SimulationStep | null;
  getResults: () => Record<string, any>;
}

// Market Clearing Specific Types
export interface Generator {
  id: string;
  name: string;
  fuelType: 'nuclear' | 'coal' | 'gas' | 'solar' | 'wind' | 'hydro';
  capacity: number; // MW
  marginalCost: number; // $/MWh
  minOutput: number; // MW
  rampRate: number; // MW/hour
  availability: number; // 0-1 factor
  co2Emissions: number; // tons/MWh
}

export interface DemandBid {
  id: string;
  name: string;
  quantity: number; // MW
  maxPrice: number; // $/MWh
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface MarketResult {
  clearingPrice: number;
  clearedQuantity: number;
  dispatchedGenerators: Array<{
    generator: Generator;
    output: number;
    revenue: number;
  }>;
  clearedDemand: Array<{
    bid: DemandBid;
    cost: number;
  }>;
  totalRevenue: number;
  totalCost: number;
  consumerSurplus: number;
  producerSurplus: number;
}

export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  generators: Generator[];
  demandBids: DemandBid[];
  marketConditions: {
    temperature?: number;
    windSpeed?: number;
    solarIrradiance?: number;
    outages?: string[]; // generator IDs
  };
}