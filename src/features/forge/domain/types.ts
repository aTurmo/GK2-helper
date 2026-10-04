export type Rotation = 0 | 1 | 2 | 3

export type Item = {
  readonly id: string
  readonly name: string
}

export type ItemQuantity = {
  readonly itemId: string
  readonly quantity: number
}

export type Extension = {
  readonly id: string
  readonly name: string
}

export type Recipe = {
  readonly id: string
  readonly name: string
  readonly stationKindId: string
  readonly extensionId: string | null
  readonly work: number
  readonly output: ItemQuantity
  readonly inputs: readonly ItemQuantity[]
}

export type ElementCategory = 'conveyor' | 'station'

export type ElementKind = {
  readonly id: string
  readonly name: string
  readonly category: ElementCategory
  readonly width: number
  readonly height: number
  readonly energyUse: number
  readonly extensionIds: readonly string[]
  readonly maxExtensions: number
}

export type PlacedElement = {
  readonly id: string
  readonly kindId: string
  readonly column: number
  readonly row: number
  readonly rotation: Rotation
  readonly extensionIds: readonly string[]
  readonly recipeId: string | null
}

export type Placement = Pick<PlacedElement, 'kindId' | 'column' | 'row' | 'rotation'>

export type Footprint = {
  readonly column: number
  readonly row: number
  readonly width: number
  readonly height: number
}

export type Floor = {
  readonly columns: number
  readonly rows: number
  readonly cellWidth: number
  readonly cellHeight: number
  readonly buildableAreas: readonly Footprint[]
}

export type ForgeLayout = {
  readonly elements: readonly PlacedElement[]
  readonly zombieCount: number
}
