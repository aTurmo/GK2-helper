import type { ElementKind, Footprint, PlacedElement, Placement, Rotation } from './types'

export function isRotatable(kind: ElementKind): boolean {
  return kind.category !== 'other' || kind.spriteIds.length > 1
}

export function footprintOf(kind: ElementKind, placement: Placement): Footprint {
  const isSideways = isRotatable(kind) && placement.rotation % 2 === 1
  return {
    column: placement.column,
    row: placement.row,
    width: isSideways ? kind.height : kind.width,
    height: isSideways ? kind.width : kind.height,
  }
}

export function occupiedAreas(kind: ElementKind, placement: Placement): readonly Footprint[] {
  const footprint = footprintOf(kind, placement)
  if (kind.passThrough === null) return [footprint]
  const { offset, length } = kind.passThrough
  const tail = offset + length
  if (placement.rotation % 2 === 0) {
    return [
      { ...footprint, height: offset },
      { ...footprint, row: footprint.row + tail, height: footprint.height - tail },
    ]
  }
  return [
    { ...footprint, width: offset },
    { ...footprint, column: footprint.column + tail, width: footprint.width - tail },
  ]
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
  const candidateAreas = occupiedAreas(kind, placement)
  if (!candidateAreas.every((area) => isBuildable(area, buildableAreas))) return false
  return elements.every((element) => {
    if (element.id === ignoredElementId) return true
    const otherKind = findKind(element.kindId)
    if (otherKind === undefined) return true
    const otherAreas = occupiedAreas(otherKind, element)
    return candidateAreas.every((area) => otherAreas.every((other) => !overlaps(area, other)))
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
