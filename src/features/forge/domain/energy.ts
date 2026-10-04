import type { ElementKind, ForgeLayout } from './types'

const ENERGY_PER_ZOMBIE = 7

export type EnergyBalance = {
  readonly production: number
  readonly consumption: number
}

export function energyBalance(
  layout: ForgeLayout,
  findKind: (kindId: string) => ElementKind | undefined,
): EnergyBalance {
  const consumption = layout.elements.reduce(
    (total, element) => total + (findKind(element.kindId)?.energyUse ?? 0),
    0,
  )
  return { production: layout.zombieCount * ENERGY_PER_ZOMBIE, consumption }
}
