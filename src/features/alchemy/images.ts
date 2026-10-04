import type { RuneColor } from './domain/runes'

const ALCHEMY_IMAGES = `${import.meta.env.BASE_URL}images/alchemy`

export function recipeImage(recipeId: string): string {
  return `${ALCHEMY_IMAGES}/recipes/${recipeId}.png`
}

export function ingredientImage(ingredientId: string): string {
  return `${ALCHEMY_IMAGES}/ingredients/${ingredientId}.png`
}

export function runeImage(color: RuneColor): string {
  return `${ALCHEMY_IMAGES}/${color}-rune.png`
}
