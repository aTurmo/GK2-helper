export type Runes = {
  readonly red: number
  readonly green: number
  readonly blue: number
}

export const RUNE_COLORS = ['red', 'green', 'blue'] as const

export type RuneColor = (typeof RUNE_COLORS)[number]

export function runes(red: number, green: number, blue: number): Runes {
  return { red, green, blue }
}
