import { QuantityStepper } from '../../material-planner/QuantityStepper'
import { RECIPES } from '../data/recipes'
import { findExtension, findRecipe } from '../data/lookups'
import { ENERGY_PER_ZOMBIE } from '../domain/energy'
import { availableRecipes, withExtensionToggled } from '../domain/stations'
import type { ElementKind, PlacedElement } from '../domain/types'
import { elementImage } from '../images'
import { RecipeSummary } from './RecipeSummary'

type ElementDetailsProps = {
  element: PlacedElement
  kind: ElementKind
  onChange: (element: PlacedElement) => void
  onRotate: () => void
  onRemove: () => void
}

export function ElementDetails({
  element,
  kind,
  onChange,
  onRotate,
  onRemove,
}: ElementDetailsProps) {
  return (
    <section className="element-details">
      <header className="element-details__header">
        <img src={elementImage(kind.id)} alt="" className="element-details__icon" />
        <h2 className="forge-panel__title">{kind.name}</h2>
      </header>
      <div className="element-details__actions">
        <button type="button" className="forge-button" onClick={onRotate}>
          Pivoter
        </button>
        <button type="button" className="forge-button forge-button--danger" onClick={onRemove}>
          Supprimer
        </button>
      </div>
      {kind.category === 'station' && (
        <StationSettings element={element} kind={kind} onChange={onChange} />
      )}
      {kind.category === 'energy' && (
        <div className="element-details__zombies">
          <span>Zombies</span>
          <QuantityStepper
            label="zombie"
            value={element.zombieCount}
            onChange={(zombieCount) =>
              onChange({ ...element, zombieCount: Math.max(0, zombieCount) })
            }
          />
          <span>⚙ {element.zombieCount * ENERGY_PER_ZOMBIE}</span>
        </div>
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
  const recipes = availableRecipes(element, RECIPES)
  const recipe = findRecipe(element.recipeId)

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
      <label className="element-details__recipe">
        Recette
        <select
          value={element.recipeId ?? ''}
          onChange={(event) =>
            onChange({
              ...element,
              recipeId: event.target.value === '' ? null : event.target.value,
            })
          }
        >
          <option value="">— Aucune —</option>
          {recipes.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name}
              {candidate.extensionId ? ` (${findExtension(candidate.extensionId)?.name})` : ''}
            </option>
          ))}
        </select>
      </label>
      {recipe && <RecipeSummary recipe={recipe} />}
    </>
  )
}
