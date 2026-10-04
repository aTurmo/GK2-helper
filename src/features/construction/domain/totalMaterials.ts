import type { Material, MaterialTotal, PlannedBuild } from './types'

export function totalMaterials(
  plannedBuilds: readonly PlannedBuild[],
  materials: readonly Material[],
): MaterialTotal[] {
  const quantities = new Map<string, number>()
  for (const { buildable, count } of plannedBuilds) {
    for (const { materialId, quantity } of buildable.requirements) {
      quantities.set(materialId, (quantities.get(materialId) ?? 0) + quantity * count)
    }
  }
  return materials.flatMap((material) => {
    const quantity = quantities.get(material.id)
    return quantity === undefined ? [] : [{ material, quantity }]
  })
}
