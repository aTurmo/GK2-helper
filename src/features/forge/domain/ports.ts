import type { ElementKind, Footprint, Rotation } from './types'

export type PortRole = 'input' | 'output'

export type Port = {
  readonly role: PortRole
  readonly area: Footprint
}

const PORT_WIDTH = 2

export function stationPorts(kind: ElementKind, rotation: Rotation): readonly Port[] {
  const top = 0
  const bottom = kind.height - 1
  const right = kind.width - PORT_WIDTH
  const unrotated: readonly Port[] = [
    { role: 'output', area: { column: 0, row: top, width: PORT_WIDTH, height: 1 } },
    { role: 'input', area: { column: 0, row: bottom, width: PORT_WIDTH, height: 1 } },
    { role: 'input', area: { column: right, row: bottom, width: PORT_WIDTH, height: 1 } },
  ]
  return unrotated.map((port) => ({ ...port, area: rotateArea(port.area, kind, rotation) }))
}

function rotateArea(area: Footprint, kind: ElementKind, rotation: Rotation): Footprint {
  let rotated = area
  let width = kind.width
  let height = kind.height
  for (let turn = 0; turn < rotation; turn++) {
    rotated = {
      column: height - rotated.row - rotated.height,
      row: rotated.column,
      width: rotated.height,
      height: rotated.width,
    }
    ;[width, height] = [height, width]
  }
  return rotated
}
