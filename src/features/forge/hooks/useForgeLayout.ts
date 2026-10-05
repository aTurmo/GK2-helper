import { useEffect, useState } from 'react'
import { FLOOR } from '../data/floor'
import { findKind } from '../data/lookups'
import { parseForgeLayout } from '../domain/layoutParsing'
import { canPlace, isRotatable, nextRotation } from '../domain/placement'
import type { ForgeLayout, PlacedElement, Placement } from '../domain/types'

const STORAGE_KEY = 'gk2-helper:forge:layout'
const EMPTY_LAYOUT: ForgeLayout = {
  elements: [],
  zombieCount: 0,
  costExclusions: [],
  excludedConveyorCounts: {},
}

export function useForgeLayout() {
  const [layout, setLayout] = useState<ForgeLayout>(readLayout)
  const { elements } = layout

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(layout))
    } catch (error) {
      console.warn('Could not save the forge layout, it will be lost on reload.', error)
    }
  }, [layout])

  function updateElements(
    update: (previous: readonly PlacedElement[]) => readonly PlacedElement[],
  ) {
    setLayout((previous) => ({ ...previous, elements: update(previous.elements) }))
  }

  function isFree(placement: Placement, ignoredElementId?: string): boolean {
    return canPlace(placement, elements, findKind, FLOOR.buildableAreas, ignoredElementId)
  }

  function placeElement(placement: Placement): string | null {
    if (!isFree(placement)) return null
    const id = crypto.randomUUID()
    updateElements((previous) => [
      ...previous,
      { ...placement, id, extensionIds: [], recipeId: null },
    ])
    return id
  }

  function moveElement(elementId: string, placement: Placement): void {
    const element = elements.find((candidate) => candidate.id === elementId)
    if (element === undefined || !isFree(placement, elementId)) return
    replaceElement({
      ...element,
      column: placement.column,
      row: placement.row,
      rotation: placement.rotation,
    })
  }

  function removeElement(elementId: string): void {
    updateElements((previous) => previous.filter((element) => element.id !== elementId))
  }

  function rotateElement(elementId: string): void {
    const element = elements.find((candidate) => candidate.id === elementId)
    const kind = element && findKind(element.kindId)
    if (element === undefined || kind === undefined || !isRotatable(kind)) return
    const rotated = { ...element, rotation: nextRotation(element.rotation) }
    if (!isFree(rotated, elementId)) return
    replaceElement(rotated)
  }

  function replaceElement(updated: PlacedElement): void {
    updateElements((previous) =>
      previous.map((element) => (element.id === updated.id ? updated : element)),
    )
  }

  function changeZombieCount(zombieCount: number): void {
    setLayout((previous) => ({ ...previous, zombieCount: Math.max(0, zombieCount) }))
  }

  function clearElements(): void {
    updateElements(() => [])
  }

  function toggleCostExclusion(key: string): void {
    setLayout((previous) => ({
      ...previous,
      costExclusions: previous.costExclusions.includes(key)
        ? previous.costExclusions.filter((excluded) => excluded !== key)
        : [...previous.costExclusions, key],
    }))
  }

  function setExcludedConveyorCount(kindId: string, excludedCount: number): void {
    setLayout((previous) => ({
      ...previous,
      excludedConveyorCounts: { ...previous.excludedConveyorCounts, [kindId]: excludedCount },
    }))
  }

  function replaceLayout(replacement: ForgeLayout): void {
    setLayout(replacement)
  }

  return {
    layout,
    isFree,
    placeElement,
    moveElement,
    removeElement,
    rotateElement,
    replaceElement,
    changeZombieCount,
    clearElements,
    replaceLayout,
    toggleCostExclusion,
    setExcludedConveyorCount,
  }
}

function readLayout(): ForgeLayout {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null')
    return parseForgeLayout(stored) ?? EMPTY_LAYOUT
  } catch (error) {
    console.warn('Could not read the forge layout, starting empty.', error)
    return EMPTY_LAYOUT
  }
}
