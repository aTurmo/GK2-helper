import type { ElementKind, Footprint, Rotation } from './types'

export type PortRole = 'input' | 'output'

export type Direction = 'up' | 'right' | 'down' | 'left'

export type Port = {
  readonly role: PortRole
  readonly flow: Direction
  readonly area: Footprint
}

const PORT_SIZE = 2

export function stationPorts(kind: ElementKind, rotation: Rotation): readonly Port[] {
  const right = kind.width - PORT_SIZE
  const upperSideRow = kind.height - 2 * PORT_SIZE
  const lowerSideRow = kind.height - PORT_SIZE
  const below = (column: number): Footprint => ({
    column,
    row: kind.height,
    width: PORT_SIZE,
    height: 1,
  })
  const above = (column: number): Footprint => ({ column, row: -1, width: PORT_SIZE, height: 1 })
  const leftOf = (row: number): Footprint => ({ column: -1, row, width: 1, height: PORT_SIZE })
  const rightOf = (row: number): Footprint => ({
    column: kind.width,
    row,
    width: 1,
    height: PORT_SIZE,
  })

  switch (rotation) {
    case 0:
      return [
        { role: 'output', flow: 'up', area: above(0) },
        { role: 'input', flow: 'up', area: below(0) },
        { role: 'input', flow: 'up', area: below(right) },
      ]
    case 1:
      return [
        { role: 'output', flow: 'up', area: above(right) },
        { role: 'input', flow: 'up', area: below(0) },
        { role: 'input', flow: 'up', area: below(right) },
      ]
    case 2:
      return [
        { role: 'input', flow: 'right', area: leftOf(upperSideRow) },
        { role: 'input', flow: 'right', area: leftOf(lowerSideRow) },
        { role: 'output', flow: 'right', area: rightOf(upperSideRow) },
      ]
    case 3:
      return [
        { role: 'input', flow: 'left', area: rightOf(upperSideRow) },
        { role: 'input', flow: 'left', area: rightOf(lowerSideRow) },
        { role: 'output', flow: 'left', area: leftOf(upperSideRow) },
      ]
  }
}
