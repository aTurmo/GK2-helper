import { findRecipe } from '../data/lookups'
import { footprintOf } from '../domain/placement'
import { stationPorts } from '../domain/ports'
import type { ElementKind, Floor, PlacedElement } from '../domain/types'
import { elementImage, itemImage } from '../images'

const CONVEYOR_SYMBOLS: Readonly<Record<string, string>> = {
  'convoyeur-a-bande': '▲',
  'convoyeur-souterrain': '⇡',
  'separateur-de-convoyeur': '⇹',
}

type PlacedElementViewProps = {
  element: PlacedElement
  kind: ElementKind
  floor: Floor
  isSelected: boolean
  onClick: () => void
  onRemove: () => void
}

export function PlacedElementView({
  element,
  kind,
  floor,
  isSelected,
  onClick,
  onRemove,
}: PlacedElementViewProps) {
  const footprint = footprintOf(kind, element)
  const recipe = findRecipe(element.recipeId)
  const arrowRotation = { transform: `rotate(${element.rotation * 90}deg)` }

  return (
    <button
      type="button"
      className={`placed-element placed-element--${kind.category}`}
      style={{
        left: footprint.column * floor.cellWidth,
        top: footprint.row * floor.cellHeight,
        width: footprint.width * floor.cellWidth,
        height: footprint.height * floor.cellHeight,
      }}
      aria-pressed={isSelected}
      title={recipe ? `${kind.name} : ${recipe.name}` : kind.name}
      onClick={onClick}
      onContextMenu={(event) => {
        event.preventDefault()
        onRemove()
      }}
    >
      {kind.category === 'conveyor' ? (
        <span className="placed-element__symbol" style={arrowRotation}>
          {CONVEYOR_SYMBOLS[kind.id]}
        </span>
      ) : (
        <>
          <img src={elementImage(kind.id)} alt="" className="placed-element__icon" />
          {stationPorts(kind, element.rotation).map((port, index) => (
            <span
              key={index}
              className={`placed-element__port placed-element__port--${port.role}`}
              style={{
                left: port.area.column * floor.cellWidth,
                top: port.area.row * floor.cellHeight,
                width: port.area.width * floor.cellWidth,
                height: port.area.height * floor.cellHeight,
              }}
            >
              <span style={arrowRotation}>▲</span>
            </span>
          ))}
          {recipe && (
            <img src={itemImage(recipe.output.itemId)} alt="" className="placed-element__recipe" />
          )}
        </>
      )}
    </button>
  )
}
