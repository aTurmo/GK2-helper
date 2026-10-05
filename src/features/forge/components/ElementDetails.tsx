import { RECIPES } from '../data/recipes'
import { findExtension } from '../data/lookups'
import { isRotatable } from '../domain/placement'
import { withExtensionToggled } from '../domain/stations'
import type { ElementKind, PlacedElement } from '../domain/types'
import { elementImage } from '../images'
import { RecipeList } from './RecipeList'

type ElementDetailsProps = {
  element: PlacedElement
  kind: ElementKind
  onChange: (element: PlacedElement) => void
  onRotate: () => void
  onMove: () => void
  onRemove: () => void
}

export function ElementDetails({
  element,
  kind,
  onChange,
  onRotate,
  onMove,
  onRemove,
}: ElementDetailsProps) {
  return (
    <section className="element-details">
      <header className="element-details__header">
        <img src={elementImage(kind.id)} alt="" className="element-details__icon" />
        <h2 className="forge-panel__title">{kind.name}</h2>
      </header>
      <div className="element-details__actions">
        {isRotatable(kind) && (
          <button type="button" className="forge-button" onClick={onRotate}>
            Pivoter
          </button>
        )}
        <button type="button" className="forge-button" onClick={onMove}>
          Déplacer (M)
        </button>
        <button type="button" className="forge-button forge-button--danger" onClick={onRemove}>
          Supprimer
        </button>
      </div>
      {kind.category === 'station' && (
        <StationSettings element={element} kind={kind} onChange={onChange} />
      )}
    </section>
  )
}

type StationSettingsProps = {
  element: PlacedElement
  kind: ElementKind
  onChange: (element: PlacedElement) => void
}

function StationSettings({ element, kind, onChange }: StationSettingsProps) {
  return (
    <>
      <fieldset className="element-details__extensions">
        <legend>Extensions{kind.maxExtensions === 1 ? ' (une seule)' : ''}</legend>
        {kind.extensionIds.map((extensionId) => (
          <label key={extensionId} className="element-details__extension">
            <input
              type="checkbox"
              checked={element.extensionIds.includes(extensionId)}
              onChange={() => onChange(withExtensionToggled(element, kind, extensionId, RECIPES))}
            />
            <img
              src={elementImage(extensionId)}
              alt=""
              className="element-details__extension-icon"
            />
            {findExtension(extensionId)?.name ?? extensionId}
          </label>
        ))}
      </fieldset>
      <section className="element-details__recipes">
        <h3 className="element-details__subtitle">Recette</h3>
        <RecipeList
          recipes={RECIPES.filter((candidate) => candidate.stationKindIds.includes(kind.id))}
          installedExtensionIds={element.extensionIds}
          selectedRecipeId={element.recipeId}
          workIconId={kind.workIconId}
          onSelect={(recipeId) => onChange({ ...element, recipeId })}
        />
      </section>
    </>
  )
}
