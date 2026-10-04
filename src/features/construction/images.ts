const IMAGES = `${import.meta.env.BASE_URL}images`
const CONSTRUCTION_IMAGES = `${IMAGES}/construction`

export function buildableImage(buildingId: string, buildableId: string): string {
  return `${CONSTRUCTION_IMAGES}/${buildingId}/${buildableId}.png`
}

export function materialImage(materialId: string): string {
  return `${CONSTRUCTION_IMAGES}/materials/${materialId}.png`
}

export function minusButtonImage(): string {
  return `${IMAGES}/ui/minus.png`
}

export function plusButtonImage(): string {
  return `${IMAGES}/ui/plus.png`
}
