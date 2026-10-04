const CITY_IMAGES = `${import.meta.env.BASE_URL}images/city`

export function cityMapImage(): string {
  return `${CITY_IMAGES}/map.png`
}

export function optionImage(optionId: string): string {
  return `${CITY_IMAGES}/options/${optionId}.png`
}

export function materialImage(materialId: string): string {
  return `${CITY_IMAGES}/materials/${materialId}.png`
}
