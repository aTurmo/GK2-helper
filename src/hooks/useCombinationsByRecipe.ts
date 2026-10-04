import { useMemo } from 'react'
import { findCombinations } from '../alchemy/findCombinations'
import type { Combination, Ingredient, Recipe } from '../alchemy/types'

export function useCombinationsByRecipe(
  recipes: readonly Recipe[],
  ingredients: readonly Ingredient[],
): ReadonlyMap<string, Combination[]> {
  return useMemo(
    () =>
      new Map(recipes.map((recipe) => [recipe.id, findCombinations(recipe.runes, ingredients)])),
    [recipes, ingredients],
  )
}
