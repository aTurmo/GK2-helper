import type { ElementKind, Extension, Item, Recipe } from '../domain/types'
import { ELEMENT_KINDS, EXTENSIONS } from './elements'
import { ITEMS } from './items'
import { RECIPES } from './recipes'

const kindsById = new Map(ELEMENT_KINDS.map((kind) => [kind.id, kind]))
const itemsById = new Map(ITEMS.map((item) => [item.id, item]))
const extensionsById = new Map(EXTENSIONS.map((extension) => [extension.id, extension]))
const recipesById = new Map(RECIPES.map((recipe) => [recipe.id, recipe]))

export function findKind(kindId: string): ElementKind | undefined {
  return kindsById.get(kindId)
}

export function findItem(itemId: string): Item | undefined {
  return itemsById.get(itemId)
}

export function findExtension(extensionId: string): Extension | undefined {
  return extensionsById.get(extensionId)
}

export function findRecipe(recipeId: string | null): Recipe | undefined {
  return recipeId === null ? undefined : recipesById.get(recipeId)
}
