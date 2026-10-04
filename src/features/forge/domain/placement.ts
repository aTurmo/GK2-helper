import type { ElementKind, Footprint, PlacedElement, Placement, Rotation } from './types'

export function footprintOf(kind: ElementKind, placement: Placement): Footprint {
  const isSideways = placement.rotation % 2 === 1
  return {
    column: placement.column,
    row: placement.row,
    width: isSideways ? kind.height : kind.width,
    height: isSideways ? kind.width : kind.height,
  }
}

export function nextRotation(rotation: Rotation): Rotation {
  return ((rotation + 1) % 4) as Rotation
}

export function canPlace(
  placement: Placement,
  elements: readonly PlacedElement[],
  findKind: (kindId: string) => ElementKind | undefined,
  buildableAreas: readonly Footprint[],
  ignoredElementId?: string,
): boolean {
  const kind = findKind(placement.kindId)
  if (kind === undefined) return false
  const candidate = footprintOf(kind, placement)
  if (!isBuildable(candidate, buildableAreas)) return false
  return elements.every((element) => {
    if (element.id === ignoredElementId) return true
    const otherKind = findKind(element.kindId)
    return otherKind === undefined || !overlaps(candidate, footprintOf(otherKind, element))
  })
}

function isBuildable(footprint: Footprint, buildableAreas: readonly Footprint[]): boolean {
  for (let row = footprint.row; row < footprint.row + footprint.height; row++) {
    for (let column = footprint.column; column < footprint.column + footprint.width; column++) {
      const cell = { column, row, width: 1, height: 1 }
      if (!buildableAreas.some((area) => overlaps(cell, area))) return false
    }
  }
  return true
}

function overlaps(a: Footprint, b: Footprint): boolean {
  return (
    a.column < b.column + b.width &&
    b.column < a.column + a.width &&
    a.row < b.row + b.height &&
    b.row < a.row + a.height
  )
}
