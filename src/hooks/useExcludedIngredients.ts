import { useState } from 'react'

export function useExcludedIngredients() {
  const [excludedIngredientIds, setExcludedIngredientIds] = useState<ReadonlySet<string>>(new Set())

  function toggleIngredient(ingredientId: string) {
    setExcludedIngredientIds((previous) => {
      const next = new Set(previous)
      if (next.has(ingredientId)) {
        next.delete(ingredientId)
      } else {
        next.add(ingredientId)
      }
      return next
    })
  }

  function includeAllIngredients() {
    setExcludedIngredientIds(new Set())
  }

  return { excludedIngredientIds, toggleIngredient, includeAllIngredients }
}
