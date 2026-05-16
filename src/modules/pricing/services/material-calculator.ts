import { MaterialUsage } from '../types/pricing.types'

export function calculateMaterialCost(materials: MaterialUsage[]): number {
  return materials.reduce((total, material) => {
    const materialCost = material.weight * material.costPerGram * material.quantity
    return total + materialCost
  }, 0)
}
