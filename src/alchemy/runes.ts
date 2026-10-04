export type Runes = {
  readonly red: number
  readonly green: number
  readonly blue: number
}

export const RUNE_COLORS = ['red', 'green', 'blue'] as const

export const NO_RUNES: Runes = { red: 0, green: 0, blue: 0 }

export function runes(red: number, green: number, blue: number): Runes {
  return { red, green, blue }
}

export function addRunes(left: Runes, right: Runes): Runes {
  return runes(left.red + right.red, left.green + right.green, left.blue + right.blue)
}

export function haveSameRunes(left: Runes, right: Runes): boolean {
  return RUNE_COLORS.every((color) => left[color] === right[color])
}

export function fitsWithin(candidate: Runes, limit: Runes): boolean {
  return RUNE_COLORS.every((color) => candidate[color] <= limit[color])
}
