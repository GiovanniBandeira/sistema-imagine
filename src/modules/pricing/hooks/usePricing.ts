import { useCallback, useEffect, useState } from 'react'
import { createPricing, getPricings } from '../firebase/pricing.repository'
import { calculatePricing } from '../services/pricing-engine'
import type { PricingInput, PricingResult } from '../types/pricing.types'

export interface PricingHistoryItem extends PricingResult {
  id?: string
  title: string
  createdAt?: string
}

const initialPricingInput: PricingInput = {
  title: '',
  markupType: 'FINAL_CLIENT',
  materials: [
    {
      materialId: 'manual',
      materialName: 'Material',
      weight: 0,
      costPerGram: 0,
      quantity: 1,
    },
  ],
  machines: [
    {
      machineId: 'manual',
      machineName: 'Impressora',
      hours: 0,
      costPerHour: 0,
      plates: 1,
    },
  ],
  painting: {
    outsourced: false,
    paintingHours: 0,
    hourlyRate: 0,
    colorsUsed: 0,
    paintCostPerColor: 0,
  },
  finishing: {
    sandingCost: 0,
    primerCost: 0,
    epoxyCost: 0,
  },
  packaging: {
    boxCost: 0,
    bubbleWrapCost: 0,
    printCost: 0,
  },
}

export function usePricing() {
  const [pricingInput, setPricingInput] = useState<PricingInput>(initialPricingInput)
  const [result, setResult] = useState<PricingResult | null>(null)
  const [history, setHistory] = useState<PricingHistoryItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadHistory = useCallback(async () => {
    try {
      const data = await getPricings()
      setHistory(data as PricingHistoryItem[])
    } catch {
      setError('Nao foi possivel carregar o historico.')
    }
  }, [])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  function calculate() {
    setError(null)
    setResult(calculatePricing(pricingInput))
  }

  async function savePricing() {
    if (!result) return

    setLoading(true)
    setError(null)

    try {
      const entry: PricingHistoryItem = {
        ...result,
        title: pricingInput.title || 'Orcamento sem titulo',
        createdAt: new Date().toISOString(),
      }

      await createPricing(entry)
      setHistory((current) => [entry, ...current])
    } catch {
      setError('Nao foi possivel salvar o orcamento.')
    } finally {
      setLoading(false)
    }
  }

  return {
    pricingInput,
    setPricingInput,
    result,
    calculate,
    savePricing,
    loading,
    error,
    history,
  }
}
