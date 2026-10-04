import { useEffect, useState } from 'react'
import { FLOOR } from '../data/floor'
import { findKind } from '../data/lookups'
import { canPlace, nextRotation } from '../domain/placement'
import type { ForgeLayout, PlacedElement, Placement, Rotation } from '../domain/types'

const STORAGE_KEY = 'gk2-helper:forge:layout'
const EMPTY_LAYOUT: ForgeLayout = { elements: [], zombieCount: 0 }

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

  function placeElement(placement: Placement): void {
    if (!isFree(placement)) return
    updateElements((previous) => [
      ...previous,
      { ...placement, id: crypto.randomUUID(), extensionIds: [], recipeId: null },
    ])
  }

  function removeElement(elementId: string): void {
    updateElements((previous) => previous.filter((element) => element.id !== elementId))
  }

  function rotateElement(elementId: string): void {
    const element = elements.find((candidate) => candidate.id === elementId)
    if (element === undefined) return
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

  return {
    layout,
    isFree,
    placeElement,
    removeElement,
    rotateElement,
    replaceElement,
    changeZombieCount,
    clearElements,
  }
}

function readLayout(): ForgeLayout {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (typeof stored !== 'object' || stored === null || Array.isArray(stored)) return EMPTY_LAYOUT
    const candidate = stored as Record<string, unknown>
    return {
      elements: Array.isArray(candidate.elements) ? candidate.elements.filter(isPlacedElement) : [],
      zombieCount: typeof candidate.zombieCount === 'number' ? candidate.zombieCount : 0,
    }
  } catch (error) {
    console.warn('Could not read the forge layout, starting empty.', error)
    return EMPTY_LAYOUT
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
    (candidate.recipeId === null || typeof candidate.recipeId === 'string')
  )
}

function isRotation(value: unknown): value is Rotation {
  return value === 0 || value === 1 || value === 2 || value === 3
}
