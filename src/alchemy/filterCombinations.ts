import type { Combination, Ingredient } from './types'

export function withoutExcludedIngredients(
  combinations: readonly Combination[],
  excludedIngredientIds: ReadonlySet<string>,
): Combination[] {
  return combinations.filter((combination) =>
    combination.every((ingredient) => !excludedIngredientIds.has(ingredient.id)),
  )
}

export function ingredientsUsedIn(
  combinations: readonly Combination[],
  ingredients: readonly Ingredient[],
): Ingredient[] {
  const usedIngredientIds = new Set(combinations.flat().map((ingredient) => ingredient.id))
  return ingredients.filter((ingredient) => usedIngredientIds.has(ingredient.id))
}
