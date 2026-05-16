import type { Dispatch, FormEvent, SetStateAction } from 'react'
import type { PricingInput, PricingType } from '../types/pricing.types'

interface PricingFormProps {
  input: PricingInput
  setInput: Dispatch<SetStateAction<PricingInput>>
  onSubmit: () => void
  loading?: boolean
}

type NumberField =
  | 'materialWeight'
  | 'materialCostPerGram'
  | 'materialQuantity'
  | 'machineHours'
  | 'machineCostPerHour'
  | 'machinePlates'
  | 'paintingHours'
  | 'paintingHourlyRate'
  | 'colorsUsed'
  | 'paintCostPerColor'
  | 'sandingCost'
  | 'primerCost'
  | 'epoxyCost'
  | 'boxCost'
  | 'bubbleWrapCost'
  | 'printCost'

const numberInputClass =
  'w-full rounded-lg border border-[#4E4E4E] bg-[#0f111a] px-3 py-2 text-sm text-white focus:border-brand focus:outline-none'

function getNumberValue(input: PricingInput, field: NumberField): number {
  const material = input.materials[0]
  const machine = input.machines[0]

  switch (field) {
    case 'materialWeight':
      return material?.weight ?? 0
    case 'materialCostPerGram':
      return material?.costPerGram ?? 0
    case 'materialQuantity':
      return material?.quantity ?? 1
    case 'machineHours':
      return machine?.hours ?? 0
    case 'machineCostPerHour':
      return machine?.costPerHour ?? 0
    case 'machinePlates':
      return machine?.plates ?? 1
    case 'paintingHours':
      return input.painting?.paintingHours ?? 0
    case 'paintingHourlyRate':
      return input.painting?.hourlyRate ?? 0
    case 'colorsUsed':
      return input.painting?.colorsUsed ?? 0
    case 'paintCostPerColor':
      return input.painting?.paintCostPerColor ?? 0
    case 'sandingCost':
      return input.finishing?.sandingCost ?? 0
    case 'primerCost':
      return input.finishing?.primerCost ?? 0
    case 'epoxyCost':
      return input.finishing?.epoxyCost ?? 0
    case 'boxCost':
      return input.packaging?.boxCost ?? 0
    case 'bubbleWrapCost':
      return input.packaging?.bubbleWrapCost ?? 0
    case 'printCost':
      return input.packaging?.printCost ?? 0
    default:
      return 0
  }
}

export default function PricingForm({ input, setInput, onSubmit, loading = false }: PricingFormProps) {
  function updateNumber(field: NumberField, value: string) {
    const numericValue = Number(value)

    setInput((current) => {
      const material = current.materials[0]
        ? { ...current.materials[0] }
        : {
        materialId: 'manual',
        materialName: 'Material',
        weight: 0,
        costPerGram: 0,
        quantity: 1,
      }

      const machine = current.machines[0]
        ? { ...current.machines[0] }
        : {
        machineId: 'manual',
        machineName: 'Impressora',
        hours: 0,
        costPerHour: 0,
        plates: 1,
      }

      const painting = current.painting ? { ...current.painting } : {
        outsourced: false,
        paintingHours: 0,
        hourlyRate: 0,
        colorsUsed: 0,
        paintCostPerColor: 0,
      }

      const finishing = current.finishing ? { ...current.finishing } : {
        sandingCost: 0,
        primerCost: 0,
        epoxyCost: 0,
      }

      const packaging = current.packaging ? { ...current.packaging } : {
        boxCost: 0,
        bubbleWrapCost: 0,
        printCost: 0,
      }

      switch (field) {
        case 'materialWeight':
          material.weight = numericValue
          break
        case 'materialCostPerGram':
          material.costPerGram = numericValue
          break
        case 'materialQuantity':
          material.quantity = numericValue
          break
        case 'machineHours':
          machine.hours = numericValue
          break
        case 'machineCostPerHour':
          machine.costPerHour = numericValue
          break
        case 'machinePlates':
          machine.plates = numericValue
          break
        case 'paintingHours':
          painting.paintingHours = numericValue
          break
        case 'paintingHourlyRate':
          painting.hourlyRate = numericValue
          break
        case 'colorsUsed':
          painting.colorsUsed = numericValue
          break
        case 'paintCostPerColor':
          painting.paintCostPerColor = numericValue
          break
        case 'sandingCost':
          finishing.sandingCost = numericValue
          break
        case 'primerCost':
          finishing.primerCost = numericValue
          break
        case 'epoxyCost':
          finishing.epoxyCost = numericValue
          break
        case 'boxCost':
          packaging.boxCost = numericValue
          break
        case 'bubbleWrapCost':
          packaging.bubbleWrapCost = numericValue
          break
        case 'printCost':
          packaging.printCost = numericValue
          break
      }

      return {
        ...current,
        materials: [material],
        machines: [machine],
        painting,
        finishing,
        packaging,
      }
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  function renderNumberField(label: string, field: NumberField, step = '0.01') {
    return (
      <label className="flex flex-col gap-2 text-sm text-gray-300">
        {label}
        <input
          type="number"
          min="0"
          step={step}
          value={getNumberValue(input, field)}
          onChange={(event) => updateNumber(field, event.target.value)}
          className={numberInputClass}
        />
      </label>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-[#4E4E4E]/40 bg-card p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-gray-300 md:col-span-2">
          Titulo
          <input
            type="text"
            value={input.title}
            onChange={(event) => setInput((current) => ({ ...current, title: event.target.value }))}
            className={numberInputClass}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-gray-300">
          Tipo de markup
          <select
            value={input.markupType}
            onChange={(event) =>
              setInput((current) => ({ ...current, markupType: event.target.value as PricingType }))
            }
            className={numberInputClass}
          >
            <option value="FINAL_CLIENT">Cliente final</option>
            <option value="RESELLER">Revenda</option>
          </select>
        </label>

        {renderNumberField('Peso do material (g)', 'materialWeight')}
        {renderNumberField('Custo por grama', 'materialCostPerGram')}
        {renderNumberField('Quantidade', 'materialQuantity', '1')}
        {renderNumberField('Horas de maquina', 'machineHours')}
        {renderNumberField('Custo por hora', 'machineCostPerHour')}
        {renderNumberField('Bandejas/placas', 'machinePlates', '1')}
        {renderNumberField('Horas de pintura', 'paintingHours')}
        {renderNumberField('Valor hora pintura', 'paintingHourlyRate')}
        {renderNumberField('Cores usadas', 'colorsUsed', '1')}
        {renderNumberField('Custo por cor', 'paintCostPerColor')}
        {renderNumberField('Lixamento', 'sandingCost')}
        {renderNumberField('Primer', 'primerCost')}
        {renderNumberField('Epoxi', 'epoxyCost')}
        {renderNumberField('Caixa', 'boxCost')}
        {renderNumberField('Plastico bolha', 'bubbleWrapCost')}
        {renderNumberField('Impressos', 'printCost')}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-brand px-6 py-2 text-sm font-semibold text-[#0f1015] transition-colors hover:bg-brandHover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Calculando...' : 'Calcular preco'}
        </button>
      </div>
    </form>
  )
}
