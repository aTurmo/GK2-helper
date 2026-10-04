import type { MaterialRequirement } from '../../material-planner/types'

export type SiteOption = {
  readonly id: string
  readonly name: string
  readonly requirements: readonly MaterialRequirement[]
}

export type MapPosition = {
  readonly x: number
  readonly y: number
}

export type Site = {
  readonly id: string
  readonly number: number
  readonly name: string
  readonly position: MapPosition
  readonly optionIds: readonly string[]
}
