import type { ElementKind, PlacedElement } from './types'

export const ENERGY_PER_ZOMBIE = 7

export type EnergyBalance = {
  readonly production: number
  readonly consumption: number
}

export function energyBalance(
  elements: readonly PlacedElement[],
  findKind: (kindId: string) => ElementKind | undefined,
): EnergyBalance {
  let production = 0
  let consumption = 0
  for (const element of elements) {
    const kind = findKind(element.kindId)
    if (kind === undefined) continue
    consumption += kind.energyUse
    if (kind.category === 'energy') production += element.zombieCount * ENERGY_PER_ZOMBIE
  }
  return { production, consumption }
}
