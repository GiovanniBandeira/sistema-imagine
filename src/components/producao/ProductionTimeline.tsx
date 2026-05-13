const stages = [
  'Modelagem',
  'Impressão',
  'Acabamento',
  'Pintura',
  'Embalagem'
]

export function ProductionTimeline() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold">
          Processo de Produção
        </h2>
      </div>

      <div className="flex items-center justify-between">
        {stages.map((stage) => (
          <div
            key={stage}
            className="flex flex-col items-center gap-2"
          >
            <div className="h-14 w-14 rounded-full border-2 border-green-500" />

            <span className="text-sm text-zinc-400">
              {stage}
            </span>
          </div>
        ))}
      </div>

      <div className="text-right text-4xl font-bold text-green-500">
        75%
      </div>
    </div>
  )
}