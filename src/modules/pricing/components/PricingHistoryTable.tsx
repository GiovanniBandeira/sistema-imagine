import type { PricingHistoryItem } from '../hooks/usePricing'

interface PricingHistoryTableProps {
  data: PricingHistoryItem[]
  loading?: boolean
}

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

function formatDate(value?: string) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default function PricingHistoryTable({ data, loading = false }: PricingHistoryTableProps) {
  if (loading && data.length === 0) {
    return <p className="text-sm text-gray-400">Carregando historico...</p>
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#4E4E4E]/50 p-6 text-center text-sm text-gray-400">
        Nenhuma precificacao salva ainda.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#4E4E4E]/40">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#0f111a] text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3 font-medium">Titulo</th>
            <th className="px-4 py-3 font-medium">Custo</th>
            <th className="px-4 py-3 font-medium">Venda</th>
            <th className="px-4 py-3 font-medium">Lucro</th>
            <th className="px-4 py-3 font-medium">Data</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#4E4E4E]/30 bg-card text-gray-200">
          {data.map((item, index) => (
            <tr key={item.id ?? `${item.title}-${index}`}>
              <td className="px-4 py-3">{item.title}</td>
              <td className="px-4 py-3">{currency.format(item.totalCost)}</td>
              <td className="px-4 py-3 text-brand">{currency.format(item.sellingPrice)}</td>
              <td className="px-4 py-3">{currency.format(item.profit)}</td>
              <td className="px-4 py-3 text-gray-400">{formatDate(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
