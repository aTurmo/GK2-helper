import type { MaterialRequirement } from '../../material-planner/types'

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
