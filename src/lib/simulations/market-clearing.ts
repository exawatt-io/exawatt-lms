import { Generator, DemandBid, MarketResult, SimulationScenario } from './types';

export class MarketClearingEngine {
  static clearMarket(generators: Generator[], demandBids: DemandBid[]): MarketResult {
    // Filter available generators and sort by marginal cost (merit order)
    const availableGenerators = generators
      .filter(g => g.availability > 0)
      .map(g => ({ ...g, availableCapacity: g.capacity * g.availability }))
      .sort((a, b) => a.marginalCost - b.marginalCost);

    // Sort demand bids by price (highest first - willingness to pay)
    const sortedDemand = [...demandBids]
      .sort((a, b) => b.maxPrice - a.maxPrice);

    // Build supply curve (cumulative generation capacity at each price level)
    const supplyCurve = this.buildSupplyCurve(availableGenerators);
    
    // Build demand curve (cumulative demand at each price level) 
    const demandCurve = this.buildDemandCurve(sortedDemand);

    // Find intersection (market clearing point)
    const clearingPoint = this.findIntersection(supplyCurve, demandCurve);
    
    if (!clearingPoint) {
      return this.createEmptyResult();
    }

    // Dispatch generators up to clearing quantity
    const dispatchedGenerators = this.dispatchGenerators(
      availableGenerators, 
      clearingPoint.quantity, 
      clearingPoint.price
    );

    // Clear demand bids at clearing price
    const clearedDemand = this.clearDemand(
      sortedDemand, 
      clearingPoint.quantity, 
      clearingPoint.price
    );

    // Calculate economic metrics
    const totalRevenue = clearingPoint.price * clearingPoint.quantity;
    const totalCost = dispatchedGenerators.reduce((sum, d) => sum + d.revenue, 0);
    const consumerSurplus = this.calculateConsumerSurplus(clearedDemand, clearingPoint.price);
    const producerSurplus = this.calculateProducerSurplus(dispatchedGenerators, clearingPoint.price);

    return {
      clearingPrice: clearingPoint.price,
      clearedQuantity: clearingPoint.quantity,
      dispatchedGenerators,
      clearedDemand,
      totalRevenue,
      totalCost,
      consumerSurplus,
      producerSurplus
    };
  }

  private static buildSupplyCurve(generators: Generator[]) {
    const curve: Array<{ price: number; quantity: number; generatorId: string }> = [];
    let cumulativeQuantity = 0;

    for (const generator of generators) {
      curve.push({
        price: generator.marginalCost,
        quantity: cumulativeQuantity + generator.availableCapacity,
        generatorId: generator.id
      });
      cumulativeQuantity += generator.availableCapacity;
    }

    return curve;
  }

  private static buildDemandCurve(demandBids: DemandBid[]) {
    const curve: Array<{ price: number; quantity: number; bidId: string }> = [];
    let cumulativeQuantity = 0;

    for (const bid of demandBids) {
      cumulativeQuantity += bid.quantity;
      curve.push({
        price: bid.maxPrice,
        quantity: cumulativeQuantity,
        bidId: bid.id
      });
    }

    return curve;
  }

  private static findIntersection(supplyCurve: any[], demandCurve: any[]) {
    // Find where supply meets or exceeds demand
    for (let i = 0; i < supplyCurve.length; i++) {
      const supply = supplyCurve[i];
      
      // Find corresponding demand at this quantity
      const demandAtQuantity = demandCurve.find(d => d.quantity >= supply.quantity);
      
      if (demandAtQuantity && demandAtQuantity.price >= supply.price) {
        return {
          price: supply.price,
          quantity: Math.min(supply.quantity, demandAtQuantity.quantity)
        };
      }
    }

    return null;
  }

  private static dispatchGenerators(generators: Generator[], clearingQuantity: number, clearingPrice: number) {
    const dispatched = [];
    let remainingQuantity = clearingQuantity;

    for (const generator of generators) {
      if (remainingQuantity <= 0) break;
      if (generator.marginalCost > clearingPrice) break;

      const output = Math.min(generator.availableCapacity, remainingQuantity);
      const revenue = output * clearingPrice;

      dispatched.push({
        generator,
        output,
        revenue
      });

      remainingQuantity -= output;
    }

    return dispatched;
  }

  private static clearDemand(demandBids: DemandBid[], clearingQuantity: number, clearingPrice: number) {
    const cleared = [];
    let remainingQuantity = clearingQuantity;

    for (const bid of demandBids) {
      if (remainingQuantity <= 0) break;
      if (bid.maxPrice < clearingPrice) break;

      const quantity = Math.min(bid.quantity, remainingQuantity);
      const cost = quantity * clearingPrice;

      cleared.push({
        bid,
        cost
      });

      remainingQuantity -= quantity;
    }

    return cleared;
  }

  private static calculateConsumerSurplus(clearedDemand: any[], clearingPrice: number): number {
    return clearedDemand.reduce((surplus, { bid }) => {
      const savings = (bid.maxPrice - clearingPrice) * bid.quantity;
      return surplus + Math.max(0, savings);
    }, 0);
  }

  private static calculateProducerSurplus(dispatchedGenerators: any[], clearingPrice: number): number {
    return dispatchedGenerators.reduce((surplus, { generator, output }) => {
      const profit = (clearingPrice - generator.marginalCost) * output;
      return surplus + Math.max(0, profit);
    }, 0);
  }

  private static createEmptyResult(): MarketResult {
    return {
      clearingPrice: 0,
      clearedQuantity: 0,
      dispatchedGenerators: [],
      clearedDemand: [],
      totalRevenue: 0,
      totalCost: 0,
      consumerSurplus: 0,
      producerSurplus: 0
    };
  }
}

// Default scenarios for the simulation
export const DEFAULT_SCENARIOS: Record<string, SimulationScenario> = {
  normal: {
    id: 'normal',
    name: 'Normal Market Conditions',
    description: 'Typical summer day with moderate demand',
    generators: [
      { id: 'nuclear1', name: 'Nuclear Plant 1', fuelType: 'nuclear', capacity: 1000, marginalCost: 15, minOutput: 800, rampRate: 50, availability: 0.95, co2Emissions: 0 },
      { id: 'coal1', name: 'Coal Plant 1', fuelType: 'coal', capacity: 800, marginalCost: 35, minOutput: 400, rampRate: 100, availability: 0.9, co2Emissions: 0.95 },
      { id: 'gas1', name: 'Gas Turbine 1', fuelType: 'gas', capacity: 500, marginalCost: 45, minOutput: 100, rampRate: 300, availability: 0.95, co2Emissions: 0.4 },
      { id: 'gas2', name: 'Gas Turbine 2', fuelType: 'gas', capacity: 400, marginalCost: 50, minOutput: 80, rampRate: 250, availability: 0.9, co2Emissions: 0.4 },
      { id: 'solar1', name: 'Solar Farm 1', fuelType: 'solar', capacity: 300, marginalCost: 0, minOutput: 0, rampRate: 300, availability: 0.7, co2Emissions: 0 },
      { id: 'wind1', name: 'Wind Farm 1', fuelType: 'wind', capacity: 250, marginalCost: 0, minOutput: 0, rampRate: 250, availability: 0.6, co2Emissions: 0 },
    ],
    demandBids: [
      { id: 'residential', name: 'Residential Load', quantity: 1200, maxPrice: 80, priority: 'high' },
      { id: 'commercial', name: 'Commercial Load', quantity: 800, maxPrice: 120, priority: 'high' },
      { id: 'industrial', name: 'Industrial Load', quantity: 600, maxPrice: 60, priority: 'medium' },
      { id: 'interruptible', name: 'Interruptible Load', quantity: 300, maxPrice: 150, priority: 'low' },
    ],
    marketConditions: {
      temperature: 75,
      windSpeed: 12,
      solarIrradiance: 0.8
    }
  },
  peakDemand: {
    id: 'peakDemand',
    name: 'Peak Demand Event',
    description: 'Hot summer afternoon with high AC load',
    generators: [
      { id: 'nuclear1', name: 'Nuclear Plant 1', fuelType: 'nuclear', capacity: 1000, marginalCost: 15, minOutput: 800, rampRate: 50, availability: 0.95, co2Emissions: 0 },
      { id: 'coal1', name: 'Coal Plant 1', fuelType: 'coal', capacity: 800, marginalCost: 35, minOutput: 400, rampRate: 100, availability: 0.9, co2Emissions: 0.95 },
      { id: 'gas1', name: 'Gas Turbine 1', fuelType: 'gas', capacity: 500, marginalCost: 45, minOutput: 100, rampRate: 300, availability: 0.95, co2Emissions: 0.4 },
      { id: 'gas2', name: 'Gas Turbine 2', fuelType: 'gas', capacity: 400, marginalCost: 50, minOutput: 80, rampRate: 250, availability: 0.9, co2Emissions: 0.4 },
      { id: 'peaker1', name: 'Peaker Plant 1', fuelType: 'gas', capacity: 200, marginalCost: 120, minOutput: 50, rampRate: 200, availability: 0.95, co2Emissions: 0.6 },
      { id: 'solar1', name: 'Solar Farm 1', fuelType: 'solar', capacity: 300, marginalCost: 0, minOutput: 0, rampRate: 300, availability: 0.9, co2Emissions: 0 },
      { id: 'wind1', name: 'Wind Farm 1', fuelType: 'wind', capacity: 250, marginalCost: 0, minOutput: 0, rampRate: 250, availability: 0.3, co2Emissions: 0 },
    ],
    demandBids: [
      { id: 'residential', name: 'Residential Load', quantity: 1800, maxPrice: 100, priority: 'high' },
      { id: 'commercial', name: 'Commercial Load', quantity: 1200, maxPrice: 140, priority: 'high' },
      { id: 'industrial', name: 'Industrial Load', quantity: 600, maxPrice: 60, priority: 'medium' },
      { id: 'interruptible', name: 'Interruptible Load', quantity: 200, maxPrice: 180, priority: 'low' },
    ],
    marketConditions: {
      temperature: 98,
      windSpeed: 5,
      solarIrradiance: 0.95
    }
  }
};