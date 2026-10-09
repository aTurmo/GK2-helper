import { findExtension, findItem } from '../data/lookups'
import type { ItemQuantity, Recipe } from '../domain/types'
import { elementImage, workIconImage } from '../images'
import { ItemIcon } from './ItemIcon'

type RecipeListProps = {
  recipes: readonly Recipe[]
  installedExtensionIds: readonly string[]
  selectedRecipeId: string | null
  workIconId: string | null
  onSelect: (recipeId: string | null) => void
}

type RecipeGroup = {
  readonly extensionId: string | null
  readonly recipes: readonly Recipe[]
}

export function RecipeList({
  recipes,
  installedExtensionIds,
  selectedRecipeId,
  workIconId,
  onSelect,
}: RecipeListProps) {
  return (
    <div className="recipe-groups">
      {groupByExtension(recipes).map((group) => {
        const isLocked =
          group.extensionId !== null && !installedExtensionIds.includes(group.extensionId)
        return (
          <section key={group.extensionId ?? 'base'} className="recipe-group">
            {group.extensionId !== null && (
              <h4 className="recipe-group__title" data-locked={isLocked}>
                <img src={elementImage(group.extensionId)} alt="" className="recipe-group__icon" />
                {findExtension(group.extensionId)?.name ?? group.extensionId}
                {isLocked && <span className="recipe-group__state">(non installée)</span>}
              </h4>
            )}
            <ul className="recipe-list">
              {group.recipes.map((recipe) => (
                <li key={recipe.id}>
                  <RecipeCard
                    recipe={recipe}
                    isSelected={recipe.id === selectedRecipeId}
                    isLocked={isLocked}
                    workIconId={workIconId}
                    onSelect={onSelect}
                  />
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

type RecipeCardProps = {
  recipe: Recipe
  isSelected: boolean
  isLocked: boolean
  workIconId: string | null
  onSelect: (recipeId: string | null) => void
}

function RecipeCard({ recipe, isSelected, isLocked, workIconId, onSelect }: RecipeCardProps) {
  const requiredExtension =
    recipe.extensionId === null ? undefined : findExtension(recipe.extensionId)
  return (
    <button
      type="button"
      className="recipe-card"
      aria-pressed={isSelected}
      disabled={isLocked}
      title={isLocked && requiredExtension ? `Requiert ${requiredExtension.name}` : recipe.name}
      onClick={() => onSelect(isSelected ? null : recipe.id)}
    >
      <span className="recipe-card__header">
        <span className="recipe-card__name">{recipe.name}</span>
        <span className="recipe-card__work" title="Travail">
          {workIconId !== null && (
            <img src={workIconImage(workIconId)} alt="" className="recipe-card__work-icon" />
          )}
          {recipe.work}
        </span>
      </span>
      <span className="recipe-card__items">
        {recipe.inputs.map((input) => (
          <ItemBadge key={input.itemId} itemQuantity={input} />
        ))}
        <span className="recipe-card__arrow">→</span>
        <ItemBadge itemQuantity={recipe.output} />
      </span>
    </button>
  )
}

function groupByExtension(recipes: readonly Recipe[]): readonly RecipeGroup[] {
  const groups: { extensionId: string | null; recipes: Recipe[] }[] = []
  for (const recipe of recipes) {
    const group = groups.find((candidate) => candidate.extensionId === recipe.extensionId)
    if (group) {
      group.recipes.push(recipe)
    } else {
      groups.push({ extensionId: recipe.extensionId, recipes: [recipe] })
    }
  }
  return groups
}

function ItemBadge({ itemQuantity }: { itemQuantity: ItemQuantity }) {
  const name = findItem(itemQuantity.itemId)?.name ?? itemQuantity.itemId
  return (
    <span className="item-badge" title={name}>
      <ItemIcon
        itemId={itemQuantity.itemId}
        quality={itemQuantity.quality}
        alt={name}
        className="item-badge__icon"
      />
      <span className="item-badge__quantity">×{itemQuantity.quantity}</span>
    </span>
  )
}
