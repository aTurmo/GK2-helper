import { findRecipe } from '../data/lookups'
import { footprintOf } from '../domain/placement'
import type { ElementKind, Floor, PlacedElement } from '../domain/types'
import { itemImage } from '../images'
import { ElementVisual } from './ElementVisual'

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
      <ElementVisual kind={kind} rotation={element.rotation} floor={floor} />
      {recipe && (
        <img src={itemImage(recipe.output.itemId)} alt="" className="placed-element__recipe" />
      )}
    </button>
  )
}
