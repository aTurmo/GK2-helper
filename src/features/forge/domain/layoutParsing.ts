import type { ForgeLayout, PlacedElement, Rotation } from './types'

export function parseForgeLayout(value: unknown): ForgeLayout | null {
  if (!isRecord(value)) return null
  return {
    elements: Array.isArray(value.elements) ? value.elements.filter(isPlacedElement) : [],
    zombieCount: typeof value.zombieCount === 'number' ? value.zombieCount : 0,
    costExclusions: Array.isArray(value.costExclusions)
      ? value.costExclusions.filter((key): key is string => typeof key === 'string')
      : [],
    excludedConveyorCounts: isRecord(value.excludedConveyorCounts)
      ? Object.fromEntries(
          Object.entries(value.excludedConveyorCounts).filter(
            (entry): entry is [string, number] => typeof entry[1] === 'number',
          ),
        )
      : {},
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isPlacedElement(value: unknown): value is PlacedElement {
  if (!isRecord(value)) return false
  return (
    typeof value.id === 'string' &&
    typeof value.kindId === 'string' &&
    typeof value.column === 'number' &&
    typeof value.row === 'number' &&
    isRotation(value.rotation) &&
    Array.isArray(value.extensionIds) &&
    value.extensionIds.every((id) => typeof id === 'string') &&
    (value.recipeId === null || typeof value.recipeId === 'string')
  )
}

function isRotation(value: unknown): value is Rotation {
  return value === 0 || value === 1 || value === 2 || value === 3
}
