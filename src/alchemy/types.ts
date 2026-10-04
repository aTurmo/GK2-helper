import type { Runes } from './runes'

export type Ingredient = {
  readonly id: string
  readonly name: string
  readonly runes: Runes
}

export type Recipe = {
  readonly id: string
  readonly name: string
  readonly runes: Runes
}

export type Combination = readonly Ingredient[]
