import { useMemo } from 'react'
import { withoutExcludedIngredients } from '../alchemy/filterCombinations'
import type { Combination } from '../alchemy/types'

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
