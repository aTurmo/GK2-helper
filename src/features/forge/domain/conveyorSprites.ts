import { footprintOf, occupiedAreas } from './placement'
import type { ElementKind, Footprint, Rotation } from './types'

export type PlacedSprite = {
  readonly spriteId: string
  readonly transform: string
  readonly area: Footprint
}

const BELTS: Readonly<Record<Rotation, string>> = {
  0: 'belt-down',
  1: 'belt-left',
  2: 'belt-up',
  3: 'belt-right',
}
const ENTRANCE = { up: 'underground-up-entrance', left: 'underground-left-entrance' }
const EXIT = { up: 'underground-up-exit', left: 'underground-left-exit' }

const SPLITTERS: Readonly<Record<Rotation, string>> = {
  0: 'splitter-horizontal',
  1: 'splitter-vertical',
  2: 'splitter-horizontal',
  3: 'splitter-vertical',
}

type TunnelEnd = { up: string; left: string }

function oriented(sprites: TunnelEnd, rotation: Rotation): Omit<PlacedSprite, 'area'> {
  switch (rotation) {
    case 0:
      return { spriteId: sprites.up, transform: 'scaleY(-1)' }
    case 1:
      return { spriteId: sprites.left, transform: '' }
    case 2:
      return { spriteId: sprites.up, transform: '' }
    case 3:
      return { spriteId: sprites.left, transform: 'scaleX(-1)' }
  }
}

export function conveyorSprites(kind: ElementKind, rotation: Rotation): readonly PlacedSprite[] {
  const placement = { kindId: kind.id, column: 0, row: 0, rotation }
  if (kind.id === 'separateur-de-convoyeur') {
    return [{ spriteId: SPLITTERS[rotation], transform: '', area: footprintOf(kind, placement) }]
  }
  if (kind.passThrough === null) {
    return [{ spriteId: BELTS[rotation], transform: '', area: footprintOf(kind, placement) }]
  }
  const [firstEnd, secondEnd] = occupiedAreas(kind, placement)
  const flowsTowardsFirstEnd = rotation === 1 || rotation === 2
  return [
    { ...oriented(flowsTowardsFirstEnd ? EXIT : ENTRANCE, rotation), area: firstEnd },
    { ...oriented(flowsTowardsFirstEnd ? ENTRANCE : EXIT, rotation), area: secondEnd },
  ]
}
