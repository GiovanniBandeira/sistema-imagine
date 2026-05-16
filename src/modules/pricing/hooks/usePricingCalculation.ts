import { calculatePricing } from '../services/pricing-engine'

export function usePricingCalculation() {
  return {
    calculatePricing,
  }
}
