import { MachineUsage } from '../types/pricing.types'

export function calculateMachineCost(machines: MachineUsage[]): number {
  return machines.reduce((total, machine) => {
    const machineCost = machine.hours * machine.costPerHour * machine.plates
    return total + machineCost
  }, 0)
}
