import type { Combination, Ingredient } from './types'

export function resolveCombinations(
  ingredientIdsByRecipe: Readonly<Record<string, readonly (readonly string[])[]>>,
  ingredients: readonly Ingredient[],
): ReadonlyMap<string, Combination[]> {
  const ingredientsById = new Map(ingredients.map((ingredient) => [ingredient.id, ingredient]))

  function findIngredient(ingredientId: string): Ingredient {
    const ingredient = ingredientsById.get(ingredientId)
    if (ingredient === undefined) {
      throw new Error(`Unknown ingredient "${ingredientId}" in combinations`)
    }
    return ingredient
  }

  return new Map(
    Object.entries(ingredientIdsByRecipe).map(([recipeId, combinations]) => [
      recipeId,
      combinations.map((ingredientIds) => ingredientIds.map(findIngredient)),
    ]),
  )
}
