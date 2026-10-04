import { addRunes, fitsWithin, haveSameRunes, NO_RUNES, type Runes } from './runes'
import type { Combination, Ingredient } from './types'

const MAX_INGREDIENTS_PER_RECIPE = 3

export function findCombinations(target: Runes, ingredients: readonly Ingredient[]): Combination[] {
  const combinations: Combination[] = []

  function extend(chosen: Combination, chosenRunes: Runes, firstAllowedIndex: number) {
    if (chosen.length > 0 && haveSameRunes(chosenRunes, target)) {
      combinations.push(chosen)
    }
    if (chosen.length === MAX_INGREDIENTS_PER_RECIPE) {
      return
    }
    for (let index = firstAllowedIndex; index < ingredients.length; index++) {
      const ingredient = ingredients[index]
      const nextRunes = addRunes(chosenRunes, ingredient.runes)
      if (fitsWithin(nextRunes, target)) {
        extend([...chosen, ingredient], nextRunes, index)
      }
    }
  }

  extend([], NO_RUNES, 0)
  return combinations.sort((left, right) => left.length - right.length)
}
