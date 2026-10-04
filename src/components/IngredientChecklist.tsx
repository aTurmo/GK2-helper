import type { Ingredient } from '../alchemy/types'

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
      <ul className="ingredient-checklist__list">
        {ingredients.map((ingredient) => (
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
