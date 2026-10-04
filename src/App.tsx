import { useState } from 'react'
import type { Recipe } from './alchemy/types'
import { CombinationPanel } from './components/CombinationPanel'
import { RecipeList } from './components/RecipeList'
import { INGREDIENTS } from './data/ingredients'
import { RECIPES } from './data/recipes'
import { useCombinationsByRecipe } from './hooks/useCombinationsByRecipe'
import { useRecipeSearch } from './hooks/useRecipeSearch'

function App() {
  const { query, setQuery, matchingRecipes } = useRecipeSearch(RECIPES)
  const combinationsByRecipe = useCombinationsByRecipe(RECIPES, INGREDIENTS)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(RECIPES[0])

  return (
    <main className="app">
      <h1 className="app__title">Graveyard Keeper 2 – Alchimie</h1>
      <div className="app__recipes">
        <input
          type="search"
          className="search"
          placeholder="Rechercher une recette…"
          aria-label="Rechercher une recette"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <RecipeList
          recipes={matchingRecipes}
          combinationsByRecipe={combinationsByRecipe}
          selectedRecipeId={selectedRecipe.id}
          onSelect={setSelectedRecipe}
        />
      </div>
      <CombinationPanel
        recipe={selectedRecipe}
        combinations={combinationsByRecipe.get(selectedRecipe.id) ?? []}
      />
    </main>
  )
}

export default App
