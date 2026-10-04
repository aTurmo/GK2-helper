import type { Combination, Recipe } from '../domain/types'
import { recipeImage } from '../images'

type RecipeListProps = {
  recipes: readonly Recipe[]
  combinationsByRecipe: ReadonlyMap<string, Combination[]>
  selectedRecipeId: string | undefined
  onSelect: (recipe: Recipe) => void
}

export function RecipeList({
  recipes,
  combinationsByRecipe,
  selectedRecipeId,
  onSelect,
}: RecipeListProps) {
  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <button
            type="button"
            className="recipe-list__item"
            aria-pressed={recipe.id === selectedRecipeId}
            onClick={() => onSelect(recipe)}
          >
            <img src={recipeImage(recipe.id)} alt={recipe.name} />
            <span className="recipe-list__count">
              {combinationsByRecipe.get(recipe.id)?.length ?? 0}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
