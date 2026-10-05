import { findRecipe } from '../data/lookups'
import { footprintOf, occupiedAreas } from '../domain/placement'
import type { ElementKind, Floor, PlacedElement } from '../domain/types'
import { itemImage } from '../images'
import { ElementVisual } from './ElementVisual'

type PlacedElementViewProps = {
  element: PlacedElement
  kind: ElementKind
  floor: Floor
  isSelected: boolean
  isMoving: boolean
  onClick: () => void
  onRemove: () => void
}

export function PlacedElementView({
  element,
  kind,
  floor,
  isSelected,
  isMoving,
  onClick,
  onRemove,
}: PlacedElementViewProps) {
  const footprint = footprintOf(kind, element)
  const recipe = findRecipe(element.recipeId)

  return (
    <button
      type="button"
      className={`placed-element placed-element--${kind.category}`}
      data-pass-through={kind.passThrough !== null}
      data-moving={isMoving}
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
      {kind.passThrough !== null &&
        occupiedAreas(kind, { ...element, column: 0, row: 0 }).map((area) => (
          <span
            key={`${area.column}-${area.row}`}
            className="placed-element__hit-area"
            style={{
              left: area.column * floor.cellWidth,
              top: area.row * floor.cellHeight,
              width: area.width * floor.cellWidth,
              height: area.height * floor.cellHeight,
            }}
          />
        ))}
      <ElementVisual kind={kind} rotation={element.rotation} floor={floor} />
      {recipe && (
        <span className="placed-element__recipe">
          <span className="placed-element__recipe-inputs">
            {recipe.inputs.map((input) => (
              <img
                key={input.itemId}
                src={itemImage(input.itemId)}
                alt=""
                className="placed-element__recipe-icon"
              />
            ))}
          </span>
          <span className="placed-element__recipe-arrow">→</span>
          <img
            src={itemImage(recipe.output.itemId)}
            alt=""
            className="placed-element__recipe-icon placed-element__recipe-icon--output"
          />
        </span>
      )}
    </button>
  )
}
