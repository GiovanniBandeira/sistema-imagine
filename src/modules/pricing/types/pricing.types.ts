export type PricingType = 'RESELLER' | 'FINAL_CLIENT'

export interface MaterialUsage {
  materialId: string
  materialName: string
  weight: number
  costPerGram: number
  quantity: number
}

export interface MachineUsage {
  machineId: string
  machineName: string
  hours: number
  costPerHour: number
  plates: number
}

export interface PaintingData {
  outsourced: boolean
  paintingHours?: number
  hourlyRate?: number
  outsourcedPrice?: number
  colorsUsed: number
  paintCostPerColor: number
}

export interface FinishingData {
  sandingCost: number
  primerCost: number
  epoxyCost: number
}

export interface PackagingData {
  boxCost: number
  bubbleWrapCost: number
  printCost: number
  customStampCost?: number
}

export interface PricingInput {
  title: string
  materials: MaterialUsage[]
  machines: MachineUsage[]
  painting?: PaintingData
  finishing?: FinishingData
  packaging?: PackagingData
  markupType: PricingType
}

export interface PricingResult {
  materialCost: number
  machineCost: number
  paintingCost: number
  finishingCost: number
  packagingCost: number
  totalCost: number
  markupMultiplier: number
  sellingPrice: number
  investmentReserve: number
  commissionValue: number
  profit: number
}
