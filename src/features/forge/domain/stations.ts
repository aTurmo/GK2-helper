import type { ElementKind, PlacedElement, Recipe } from './types'

function availableRecipes(element: PlacedElement, recipes: readonly Recipe[]): readonly Recipe[] {
  return recipes.filter(
    (recipe) =>
      recipe.stationKindIds.includes(element.kindId) &&
      (recipe.extensionId === null || element.extensionIds.includes(recipe.extensionId)),
  )
}

export function withExtensionToggled(
  element: PlacedElement,
  kind: ElementKind,
  extensionId: string,
  recipes: readonly Recipe[],
): PlacedElement {
  const extensionIds = element.extensionIds.includes(extensionId)
    ? element.extensionIds.filter((id) => id !== extensionId)
    : kind.maxExtensions === 1
      ? [extensionId]
      : [...element.extensionIds, extensionId]
  const updated = { ...element, extensionIds }
  const keepsRecipe = availableRecipes(updated, recipes).some(
    (recipe) => recipe.id === element.recipeId,
  )
  return keepsRecipe ? updated : { ...updated, recipeId: null }
}
