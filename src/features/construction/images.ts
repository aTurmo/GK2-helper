const CONSTRUCTION_IMAGES = `${import.meta.env.BASE_URL}images/construction`

export function buildableImage(buildingId: string, buildableId: string): string {
  return `${CONSTRUCTION_IMAGES}/${buildingId}/${buildableId}.png`
}

export function materialImage(materialId: string): string {
  return `${CONSTRUCTION_IMAGES}/materials/${materialId}.png`
}
