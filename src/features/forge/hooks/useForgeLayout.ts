import { useEffect, useState } from 'react'
import { GRID_COLUMNS, GRID_ROWS } from '../data/elements'
import { findKind } from '../data/lookups'
import { canPlace, nextRotation } from '../domain/placement'
import type { PlacedElement, Placement, Rotation } from '../domain/types'

const STORAGE_KEY = 'gk2-helper:forge:layout'
const GRID = { columns: GRID_COLUMNS, rows: GRID_ROWS }

export function useForgeLayout() {
  const [elements, setElements] = useState<readonly PlacedElement[]>(readLayout)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(elements))
    } catch (error) {
      console.warn('Could not save the forge layout, it will be lost on reload.', error)
    }
  }, [elements])

  function isFree(placement: Placement, ignoredElementId?: string): boolean {
    return canPlace(placement, elements, findKind, GRID, ignoredElementId)
  }

  function placeElement(placement: Placement): void {
    if (!isFree(placement)) return
    setElements((previous) => [
      ...previous,
      { ...placement, id: crypto.randomUUID(), extensionIds: [], recipeId: null, zombieCount: 0 },
    ])
  }

  function removeElement(elementId: string): void {
    setElements((previous) => previous.filter((element) => element.id !== elementId))
  }

  function rotateElement(elementId: string): void {
    const element = elements.find((candidate) => candidate.id === elementId)
    if (element === undefined) return
    const rotated = { ...element, rotation: nextRotation(element.rotation) }
    if (!isFree(rotated, elementId)) return
    replaceElement(rotated)
  }

  function replaceElement(updated: PlacedElement): void {
    setElements((previous) =>
      previous.map((element) => (element.id === updated.id ? updated : element)),
    )
  }

  function clearLayout(): void {
    setElements([])
  }

  return {
    elements,
    grid: GRID,
    isFree,
    placeElement,
    removeElement,
    rotateElement,
    replaceElement,
    clearLayout,
  }
}

function readLayout(): readonly PlacedElement[] {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(stored) ? stored.filter(isPlacedElement) : []
  } catch (error) {
    console.warn('Could not read the forge layout, starting empty.', error)
    return []
  }
}

function isPlacedElement(value: unknown): value is PlacedElement {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.kindId === 'string' &&
    typeof candidate.column === 'number' &&
    typeof candidate.row === 'number' &&
    isRotation(candidate.rotation) &&
    Array.isArray(candidate.extensionIds) &&
    candidate.extensionIds.every((id) => typeof id === 'string') &&
    (candidate.recipeId === null || typeof candidate.recipeId === 'string') &&
    typeof candidate.zombieCount === 'number'
  )
}

function isRotation(value: unknown): value is Rotation {
  return value === 0 || value === 1 || value === 2 || value === 3
}
