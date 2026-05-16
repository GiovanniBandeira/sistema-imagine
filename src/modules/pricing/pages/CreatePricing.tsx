'use client'

import { useState } from 'react'
import { calculatePricing } from '../services/pricing-engine'
import { PricingResult } from '../types/pricing.types'

export default function CreatePricing() {
  const [result, setResult] = useState<PricingResult | null>(null)

  function handleTestCalculation() {
    const response = calculatePricing({
      title: 'Teste',
      markupType: 'FINAL_CLIENT',
      materials: [
        {
          materialId: '1',
          materialName: 'PLA',
          weight: 300,
          costPerGram: 0.12,
          quantity: 1,
        },
      ],
      machines: [
        {
          machineId: '1',
          machineName: 'Bambu Lab',
          hours: 14,
          costPerHour: 1.5,
          plates: 2,
        },
      ],
      painting: {
        outsourced: false,
        paintingHours: 3,
        hourlyRate: 5,
        colorsUsed: 4,
        paintCostPerColor: 3,
      },
      finishing: {
        sandingCost: 3,
        primerCost: 5,
        epoxyCost: 4,
      },
      packaging: {
        boxCost: 3,
        bubbleWrapCost: 2,
        printCost: 1,
      },
    })

    setResult(response)
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Nova Precificação</h1>

      <button
        onClick={handleTestCalculation}
        className="rounded-xl bg-purple-600 px-6 py-3 text-white font-medium hover:bg-purple-700 transition"
      >
        Calcular
      </button>

      {result && (
        <div className="mt-6 rounded-2xl bg-zinc-900 p-6">
          <pre className="text-sm text-green-400">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </main>
  )
}
