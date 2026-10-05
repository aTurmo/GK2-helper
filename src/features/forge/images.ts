import type { Rotation } from './domain/types'

const FORGE_IMAGES = `${import.meta.env.BASE_URL}images/forge`

export function itemImage(itemId: string): string {
  return `${FORGE_IMAGES}/items/${itemId}.png`
}

export function floorImage(): string {
  return `${FORGE_IMAGES}/floor.jpg`
}

export function stationSprite(kindId: string, rotation: Rotation): string {
  return `${FORGE_IMAGES}/stations/${kindId}-${rotation}.png`
}

export function conveyorSpriteImage(spriteId: string): string {
  return `${FORGE_IMAGES}/conveyors/${spriteId}.png`
}

export function workIconImage(workIconId: string): string {
  return `${FORGE_IMAGES}/ui/${workIconId}.png`
}

export function elementImage(imageId: string): string {
  return `${FORGE_IMAGES}/elements/${imageId}.png`
}
