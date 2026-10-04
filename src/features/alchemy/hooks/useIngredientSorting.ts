import { useMemo, useState } from 'react'
import type { Ingredient } from '../domain/types'

export type IngredientSortOrder = 'runes' | 'alphabetical'

export function useIngredientSorting(ingredients: readonly Ingredient[]) {
  const [sortOrder, setSortOrder] = useState<IngredientSortOrder>('runes')

  const sortedIngredients = useMemo(
    () =>
      sortOrder === 'alphabetical'
        ? [...ingredients].sort((left, right) => left.name.localeCompare(right.name, 'fr'))
        : ingredients,
    [ingredients, sortOrder],
  )

  return { sortOrder, setSortOrder, sortedIngredients }
}
