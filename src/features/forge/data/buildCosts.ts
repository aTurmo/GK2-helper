import { BUILDINGS } from '../../construction/data/buildings'
import type { MaterialRequirement } from '../../material-planner/types'

const USINE_BUILDABLES = BUILDINGS.find((building) => building.id === 'usine')?.buildables ?? []

const EXTENSION_BUILDABLE_IDS: Readonly<Record<string, string>> = {
  soufflet: 'forge-soufflet',
  marteau: 'forge-marteau',
  'auto-marteau': 'banc-d-assemblage-auto-marteau',
  rouet: 'banc-d-assemblage-rouet',
  perceuse: 'banc-d-assemblage-perceuse',
  presse: 'forge-presse',
  meule: 'cuisine-meule',
  'machine-a-sceller': 'cuisine-machine-a-sceller',
}

export function elementBuildCost(kindId: string): readonly MaterialRequirement[] {
  return usineRequirements(kindId)
}

export function extensionBuildCost(extensionId: string): readonly MaterialRequirement[] {
  return usineRequirements(EXTENSION_BUILDABLE_IDS[extensionId] ?? extensionId)
}

function usineRequirements(buildableId: string): readonly MaterialRequirement[] {
  return USINE_BUILDABLES.find((buildable) => buildable.id === buildableId)?.requirements ?? []
}
