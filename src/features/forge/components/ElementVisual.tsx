import { stationPorts, type Direction } from '../domain/ports'
import type { ElementKind, Floor, Rotation } from '../domain/types'
import { stationSprite } from '../images'

const ARROW_TURNS: Readonly<Record<Direction, number>> = { up: 0, right: 1, down: 2, left: 3 }

const CONVEYOR_SYMBOLS: Readonly<Record<string, string>> = {
  'convoyeur-a-bande': '▲',
  'convoyeur-souterrain': '⇡',
  'separateur-de-convoyeur': '⇹',
}

type ElementVisualProps = {
  kind: ElementKind
  rotation: Rotation
  floor: Floor
}

export function ElementVisual({ kind, rotation, floor }: ElementVisualProps) {
  if (kind.category === 'conveyor') {
    return (
      <span className="element-visual__symbol" style={turned(rotation)}>
        {CONVEYOR_SYMBOLS[kind.id]}
      </span>
    )
  }
  return (
    <>
      <img
        src={stationSprite(kind.id, rotation)}
        alt=""
        className="element-visual__sprite"
        style={{
          top: 0,
          width: kind.width * floor.cellWidth,
          height: kind.height * floor.cellHeight,
        }}
      />
      {stationPorts(kind, rotation).map((port, index) => (
        <span
          key={index}
          className={`element-visual__port element-visual__port--${port.role}`}
          style={{
            left: port.area.column * floor.cellWidth,
            top: port.area.row * floor.cellHeight,
            width: port.area.width * floor.cellWidth,
            height: port.area.height * floor.cellHeight,
          }}
        >
          <span style={turned(ARROW_TURNS[port.flow])}>▲</span>
        </span>
      ))}
    </>
  )
}

function turned(quarterTurns: number) {
  return { transform: `rotate(${quarterTurns * 90}deg)` }
}
