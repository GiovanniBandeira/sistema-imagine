import { PackagingData } from '../types/pricing.types'

export function calculatePackagingCost(packaging?: PackagingData): number {
  if (!packaging) return 0
  return (
    packaging.boxCost +
    packaging.bubbleWrapCost +
    packaging.printCost +
    (packaging.customStampCost || 0)
  )
}
