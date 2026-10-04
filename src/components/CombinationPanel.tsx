import type { Combination, Recipe } from '../alchemy/types'
import { CombinationRow } from './CombinationRow'
import { RuneCost } from './RuneCost'

type CombinationPanelProps = {
  recipe: Recipe
  combinations: readonly Combination[]
}

export function CombinationPanel({ recipe, combinations }: CombinationPanelProps) {
  return (
    <section className="combination-panel">
      <header className="combination-panel__header">
        <img src={`/images/recipes/${recipe.id}.png`} alt={recipe.name} />
        <RuneCost runes={recipe.runes} />
        <span className="combination-panel__count">
          {combinations.length} combinaison{combinations.length > 1 ? 's' : ''}
        </span>
      </header>
      {combinations.length === 0 ? (
        <p className="combination-panel__empty">Aucune combinaison possible.</p>
      ) : (
        <ul className="combinations">
          {combinations.map((combination) => (
            <CombinationRow
              key={combination.map((ingredient) => ingredient.id).join('+')}
              combination={combination}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
