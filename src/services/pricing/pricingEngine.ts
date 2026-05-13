interface PricingInput {
  materialCost: number
  machineCost: number
  paintingCost: number
  finishingCost: number
  packagingCost: number
  operationalCost: number
}

export function calculateFinalCost(data: PricingInput) {
  return (
    data.materialCost +
    data.machineCost +
    data.paintingCost +
    data.finishingCost +
    data.packagingCost +
    data.operationalCost
  )
}

export function calculateResellerPrice(cost: number) {
  return cost * 1.3
}

export function calculateClientPrice(cost: number) {
  return cost * 2
}