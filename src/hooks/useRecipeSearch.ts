import { useMemo, useState } from 'react'
import type { Recipe } from '../alchemy/types'

export function useRecipeSearch(recipes: readonly Recipe[]) {
  const [query, setQuery] = useState('')

  const matchingRecipes = useMemo(() => {
    const normalizedQuery = normalize(query.trim())
    return recipes.filter((recipe) => normalize(recipe.name).includes(normalizedQuery))
  }, [recipes, query])

  return { query, setQuery, matchingRecipes }
}

function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}
