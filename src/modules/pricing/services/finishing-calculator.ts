import { FinishingData } from '../types/pricing.types'

export function calculateFinishingCost(finishing?: FinishingData): number {
  if (!finishing) return 0
  return finishing.sandingCost + finishing.primerCost + finishing.epoxyCost
}
