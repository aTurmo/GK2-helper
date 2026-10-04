import type { Ingredient } from '../alchemy/types'
import { type IngredientSortOrder, useIngredientSorting } from '../hooks/useIngredientSorting'

type IngredientChecklistProps = {
  ingredients: readonly Ingredient[]
  excludedIngredientIds: ReadonlySet<string>
  onToggle: (ingredientId: string) => void
  onIncludeAll: () => void
}

export function IngredientChecklist({
  ingredients,
  excludedIngredientIds,
  onToggle,
  onIncludeAll,
}: IngredientChecklistProps) {
  const { sortOrder, setSortOrder, sortedIngredients } = useIngredientSorting(ingredients)

  return (
    <section className="ingredient-checklist">
      <header className="ingredient-checklist__header">
        <h2 className="ingredient-checklist__title">Ingrédients</h2>
        <button
          type="button"
          className="ingredient-checklist__reset"
          disabled={excludedIngredientIds.size === 0}
          onClick={onIncludeAll}
        >
          Réinitialiser
        </button>
      </header>
      <label className="ingredient-checklist__sort">
        Trier par
        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value as IngredientSortOrder)}
        >
          <option value="runes">Runes</option>
          <option value="alphabetical">Alphabétique</option>
        </select>
      </label>
      <ul className="ingredient-checklist__list">
        {sortedIngredients.map((ingredient) => (
          <li key={ingredient.id}>
            <label className="ingredient-checklist__item">
              <input
                type="checkbox"
                checked={!excludedIngredientIds.has(ingredient.id)}
                onChange={() => onToggle(ingredient.id)}
              />
              <img src={`/images/ingredients/${ingredient.id}.png`} alt={ingredient.name} />
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}
