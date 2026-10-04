import { useState } from 'react'
import { ingredientsUsedIn } from './alchemy/filterCombinations'
import { resolveCombinations } from './alchemy/resolveCombinations'
import type { Recipe } from './alchemy/types'
import { CombinationPanel } from './components/CombinationPanel'
import { IngredientChecklist } from './components/IngredientChecklist'
import { RecipeList } from './components/RecipeList'
import { COMBINATIONS_BY_RECIPE } from './data/combinations'
import { INGREDIENTS } from './data/ingredients'
import { RECIPES } from './data/recipes'
import { useAvailableCombinationsByRecipe } from './hooks/useAvailableCombinationsByRecipe'
import { useExcludedIngredients } from './hooks/useExcludedIngredients'
import { useRecipeSearch } from './hooks/useRecipeSearch'

const combinationsByRecipe = resolveCombinations(COMBINATIONS_BY_RECIPE, INGREDIENTS)

function App() {
  const { query, setQuery, matchingRecipes } = useRecipeSearch(RECIPES)
  const { excludedIngredientIds, toggleIngredient, includeAllIngredients } =
    useExcludedIngredients()
  const availableCombinationsByRecipe = useAvailableCombinationsByRecipe(
    combinationsByRecipe,
    excludedIngredientIds,
  )
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
          combinationsByRecipe={availableCombinationsByRecipe}
          selectedRecipeId={selectedRecipe.id}
          onSelect={setSelectedRecipe}
        />
      </div>
      <CombinationPanel
        recipe={selectedRecipe}
        combinations={availableCombinationsByRecipe.get(selectedRecipe.id) ?? []}
      />
      <IngredientChecklist
        ingredients={ingredientsUsedIn(
          combinationsByRecipe.get(selectedRecipe.id) ?? [],
          INGREDIENTS,
        )}
        excludedIngredientIds={excludedIngredientIds}
        onToggle={toggleIngredient}
        onIncludeAll={includeAllIngredients}
      />
    </main>
  )
}

export default App
