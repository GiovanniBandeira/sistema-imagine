import type { PricingResult } from '../types/pricing.types'

interface ProfitPreviewProps {
  result: PricingResult
}

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export default function ProfitPreview({ result }: ProfitPreviewProps) {
  const items = [
    { label: 'Material', value: result.materialCost },
    { label: 'Maquina', value: result.machineCost },
    { label: 'Pintura', value: result.paintingCost },
    { label: 'Acabamento', value: result.finishingCost },
    { label: 'Embalagem', value: result.packagingCost },
    { label: 'Reserva', value: result.investmentReserve },
    { label: 'Comissao', value: result.commissionValue },
    { label: 'Lucro', value: result.profit },
  ]

  return (
    <section className="rounded-xl border border-[#4E4E4E]/40 bg-card p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-gray-400">Custo total</p>
          <p className="mt-1 text-2xl font-semibold text-white">{currency.format(result.totalCost)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Preco de venda</p>
          <p className="mt-1 text-2xl font-semibold text-brand">{currency.format(result.sellingPrice)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Markup</p>
          <p className="mt-1 text-2xl font-semibold text-white">{result.markupMultiplier.toFixed(2)}x</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-lg border border-[#4E4E4E]/30 bg-[#0f111a] p-3">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="mt-1 text-sm font-medium text-gray-100">{currency.format(item.value)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
