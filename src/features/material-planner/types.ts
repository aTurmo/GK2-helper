export type Material = {
  readonly id: string
  readonly name: string
}

export type MaterialRequirement = {
  readonly materialId: string
  readonly quantity: number
}

export type PlannableItem = {
  readonly key: string
  readonly name: string
  readonly detail: string
  readonly requirements: readonly MaterialRequirement[]
}

export type PlannedBuild = PlannableItem & {
  readonly count: number
}

export type MaterialTotal = {
  readonly material: Material
  readonly quantity: number
}
