import { findRecipe } from '../data/lookups'
import { ENERGY_PER_ZOMBIE } from '../domain/energy'
import { footprintOf } from '../domain/placement'
import type { ElementKind, PlacedElement } from '../domain/types'
import { elementImage, itemImage } from '../images'

const CONVEYOR_SYMBOLS: Readonly<Record<string, string>> = {
  'convoyeur-a-bande': '▲',
  'convoyeur-souterrain': '⇡',
  'separateur-de-convoyeur': '⇹',
}

type PlacedElementViewProps = {
  element: PlacedElement
  kind: ElementKind
  cellSize: number
  isSelected: boolean
  onClick: () => void
  onRemove: () => void
}

export function PlacedElementView({
  element,
  kind,
  cellSize,
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
        left: footprint.column * cellSize,
        top: footprint.row * cellSize,
        width: footprint.width * cellSize,
        height: footprint.height * cellSize,
      }}
      aria-pressed={isSelected}
      title={recipe ? `${kind.name} : ${recipe.name}` : kind.name}
      onClick={onClick}
      onContextMenu={(event) => {
        event.preventDefault()
        onRemove()
      }}
    >
      <span
        className="placed-element__body"
        style={{
          width: kind.width * cellSize,
          height: kind.height * cellSize,
          transform: `translate(-50%, -50%) rotate(${element.rotation * 90}deg)`,
        }}
      >
        {kind.category === 'conveyor' ? (
          <span className="placed-element__symbol">{CONVEYOR_SYMBOLS[kind.id]}</span>
        ) : (
          <>
            <img src={elementImage(kind.id)} alt="" className="placed-element__icon" />
            {kind.category === 'station' && (
              <>
                <span className="placed-element__port placed-element__port--output">▲</span>
                <span className="placed-element__port placed-element__port--input-left">▲</span>
                <span className="placed-element__port placed-element__port--input-right">▲</span>
              </>
            )}
          </>
        )}
      </span>
      {recipe && (
        <img src={itemImage(recipe.output.itemId)} alt="" className="placed-element__recipe" />
      )}
      {kind.category === 'energy' && (
        <span className="placed-element__energy">⚙ {element.zombieCount * ENERGY_PER_ZOMBIE}</span>
      )}
    </button>
  )
}
