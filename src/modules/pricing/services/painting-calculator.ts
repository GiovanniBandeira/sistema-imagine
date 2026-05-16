import { PaintingData } from '../types/pricing.types'

export function calculatePaintingCost(painting?: PaintingData): number {
  if (!painting) return 0

  const paintCost = painting.colorsUsed * painting.paintCostPerColor

  if (painting.outsourced) {
    return paintCost + (painting.outsourcedPrice || 0)
  }

  return paintCost + (painting.paintingHours || 0) * (painting.hourlyRate || 0)
}
