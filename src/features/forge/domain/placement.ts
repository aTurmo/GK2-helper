import type { ElementKind, Footprint, PlacedElement, Placement, Rotation } from './types'

export type GridSize = {
  readonly columns: number
  readonly rows: number
}

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
  grid: GridSize,
  ignoredElementId?: string,
): boolean {
  const kind = findKind(placement.kindId)
  if (kind === undefined) return false
  const candidate = footprintOf(kind, placement)
  if (!isInsideGrid(candidate, grid)) return false
  return elements.every((element) => {
    if (element.id === ignoredElementId) return true
    const otherKind = findKind(element.kindId)
    return otherKind === undefined || !overlaps(candidate, footprintOf(otherKind, element))
  })
}

function isInsideGrid(footprint: Footprint, grid: GridSize): boolean {
  return (
    footprint.column >= 0 &&
    footprint.row >= 0 &&
    footprint.column + footprint.width <= grid.columns &&
    footprint.row + footprint.height <= grid.rows
  )
}

function overlaps(a: Footprint, b: Footprint): boolean {
  return (
    a.column < b.column + b.width &&
    b.column < a.column + a.width &&
    a.row < b.row + b.height &&
    b.row < a.row + a.height
  )
}
