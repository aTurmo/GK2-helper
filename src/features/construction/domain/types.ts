export type Material = {
  readonly id: string
  readonly name: string
}

export type MaterialRequirement = {
  readonly materialId: string
  readonly quantity: number
}

export type Buildable = {
  readonly id: string
  readonly name: string
  readonly requirements: readonly MaterialRequirement[]
}

export type Building = {
  readonly id: string
  readonly name: string
  readonly buildables: readonly Buildable[]
}

export type PlannedBuild = {
  readonly key: string
  readonly building: Building
  readonly buildable: Buildable
  readonly count: number
}

export type MaterialTotal = {
  readonly material: Material
  readonly quantity: number
}
