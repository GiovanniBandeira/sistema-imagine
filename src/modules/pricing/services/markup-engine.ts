import { PricingType } from '../types/pricing.types'

export function getMarkupMultiplier(type: PricingType): number {
  switch (type) {
    case 'RESELLER':
      return 1.3
    case 'FINAL_CLIENT':
      return 2
    default:
      return 2
  }
}
