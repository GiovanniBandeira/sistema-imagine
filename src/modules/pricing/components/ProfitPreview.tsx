interface Props {
  totalCost: number
  sellingPrice: number
  profit: number
}

export function ProfitPreview({ totalCost, sellingPrice, profit }: Props) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-6">
      <h2 className="text-xl font-bold">Resultado</h2>
      <div className="mt-4 space-y-2">
        <p>Custo: R$ {totalCost.toFixed(2)}</p>
        <p>Venda: R$ {sellingPrice.toFixed(2)}</p>
        <p>Lucro: R$ {profit.toFixed(2)}</p>
      </div>
    </div>
  )
}
