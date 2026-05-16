import { PricingInput, PricingResult } from '../types/pricing.types'
import { calculateMaterialCost } from './material-calculator'
import { calculateMachineCost } from './machine-calculator'
import { calculatePaintingCost } from './painting-calculator'
import { calculateFinishingCost } from './finishing-calculator'
import { calculatePackagingCost } from './packaging-calculator'
import { calculateAffiliateCommission, calculateInvestmentReserve } from './commission-calculator'
import { getMarkupMultiplier } from './markup-engine'

export function calculatePricing(input: PricingInput): PricingResult {
  const materialCost = calculateMaterialCost(input.materials)
  const machineCost = calculateMachineCost(input.machines)
  const paintingCost = calculatePaintingCost(input.painting)
  const finishingCost = calculateFinishingCost(input.finishing)
  const packagingCost = calculatePackagingCost(input.packaging)

  const totalCost = materialCost + machineCost + paintingCost + finishingCost + packagingCost

  const markupMultiplier = getMarkupMultiplier(input.markupType)
  const sellingPrice = totalCost * markupMultiplier

  const commissionValue = calculateAffiliateCommission(sellingPrice)
  const investmentReserve = calculateInvestmentReserve(sellingPrice)

  const profit = sellingPrice - totalCost - commissionValue - investmentReserve

  return {
    materialCost,
    machineCost,
    paintingCost,
    finishingCost,
    packagingCost,
    totalCost,
    markupMultiplier,
    sellingPrice,
    investmentReserve,
    commissionValue,
    profit,
  }
}
