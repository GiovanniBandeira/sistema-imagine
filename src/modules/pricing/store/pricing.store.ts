import { create } from 'zustand'
import { PricingInput, PricingResult } from '../types/pricing.types'

interface PricingStore {
  currentPricing?: PricingInput
  result?: PricingResult
  setPricing: (pricing: PricingInput) => void
  setResult: (result: PricingResult) => void
}

export const usePricingStore = create<PricingStore>((set) => ({
  setPricing: (pricing) => set({ currentPricing: pricing }),
  setResult: (result) => set({ result }),
}))
