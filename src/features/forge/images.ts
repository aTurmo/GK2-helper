const FORGE_IMAGES = `${import.meta.env.BASE_URL}images/forge`

export function itemImage(itemId: string): string {
  return `${FORGE_IMAGES}/items/${itemId}.png`
}

export function floorImage(): string {
  return `${FORGE_IMAGES}/floor.jpg`
}

export function elementImage(imageId: string): string {
  return `${FORGE_IMAGES}/elements/${imageId}.png`
}
