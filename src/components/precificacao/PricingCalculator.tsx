'use client'

import { useState } from 'react'

import {
  calculateClientPrice,
  calculateFinalCost,
  calculateResellerPrice
} from '@/services/pricing/pricingEngine'

export function PricingCalculator() {
  const [cost, setCost] = useState(0)

  const reseller = calculateResellerPrice(cost)
  const client = calculateClientPrice(cost)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Precificação
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <input
            type="number"
            placeholder="Custo total"
            className="w-full rounded-lg bg-zinc-950 p-4"
            onChange={(e) => setCost(Number(e.target.value))}
          />
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-center text-lg font-medium">
            Revenda
          </div>
          <div className="text-2xl font-bold text-green-400">
            {reseller.toLocaleString()} USD
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-center text-lg font-medium">
            Cliente
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {client.toLocaleString()} USD
          </div>
        </div>
      </div>
    </div>
  );
}
