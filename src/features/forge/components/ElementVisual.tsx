import { conveyorSprites } from '../domain/conveyorSprites'
import { footprintOf } from '../domain/placement'
import { stationPorts, type Direction } from '../domain/ports'
import type { ElementKind, Floor, Rotation } from '../domain/types'
import { conveyorSpriteImage, stationSprite } from '../images'

const ARROW_TURNS: Readonly<Record<Direction, number>> = { up: 0, right: 1, down: 2, left: 3 }

type ElementVisualProps = {
  kind: ElementKind
  rotation: Rotation
  floor: Floor
}

export function ElementVisual({ kind, rotation, floor }: ElementVisualProps) {
  if (kind.category === 'conveyor') {
    return <ConveyorVisual kind={kind} rotation={rotation} floor={floor} />
  }
  if (kind.category === 'other') {
    const footprint = footprintOf(kind, { kindId: kind.id, column: 0, row: 0, rotation })
    return (
      <span
        className="element-visual__sprite-slot"
        style={{
          left: 0,
          top: 0,
          width: footprint.width * floor.cellWidth,
          height: footprint.height * floor.cellHeight,
        }}
      >
        <img
          src={conveyorSpriteImage(kind.spriteIds[rotation % kind.spriteIds.length])}
          alt=""
          className="element-visual__native-sprite"
        />
      </span>
    )
  }
  return (
    <>
      <img
        src={stationSprite(kind.spriteKindId, rotation)}
        alt=""
        className="element-visual__sprite"
        style={{
          top: 0,
          width: kind.width * floor.cellWidth,
          height: kind.height * floor.cellHeight,
        }}
      />
      {kind.tierLabel !== null && <span className="element-visual__tier">{kind.tierLabel}</span>}
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

function ConveyorVisual({ kind, rotation, floor }: ElementVisualProps) {
  return (
    <>
      {conveyorSprites(kind, rotation).map((sprite) => (
        <span
          key={`${sprite.area.column}-${sprite.area.row}`}
          className="element-visual__sprite-slot"
          style={{
            left: sprite.area.column * floor.cellWidth,
            top: sprite.area.row * floor.cellHeight,
            width: sprite.area.width * floor.cellWidth,
            height: sprite.area.height * floor.cellHeight,
          }}
        >
          <img
            src={conveyorSpriteImage(sprite.spriteId)}
            alt=""
            className="element-visual__native-sprite"
            style={{ transform: sprite.transform }}
          />
        </span>
      ))}
    </>
  )
}

function turned(quarterTurns: number) {
  return { transform: `rotate(${quarterTurns * 90}deg)` }
}
