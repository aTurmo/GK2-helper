import { useMemo } from 'react'
import { withoutExcludedIngredients } from '../domain/filterCombinations'
import type { Combination } from '../domain/types'

export function useAvailableCombinationsByRecipe(
  combinationsByRecipe: ReadonlyMap<string, Combination[]>,
  excludedIngredientIds: ReadonlySet<string>,
): ReadonlyMap<string, Combination[]> {
  return useMemo(
    () =>
      new Map(
        [...combinationsByRecipe].map(([recipeId, combinations]) => [
          recipeId,
          withoutExcludedIngredients(combinations, excludedIngredientIds),
        ]),
      ),
    [combinationsByRecipe, excludedIngredientIds],
  )
}
