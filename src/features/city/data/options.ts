import type { SiteOption } from '../domain/types'

export const OPTIONS: readonly SiteOption[] = [
  {
    id: 'reparer-le-pate-de-maisons',
    name: 'Réparer le Pâté de Maisons',
    requirements: [
      { materialId: 'kit-de-construction-2', quantity: 16 },
      { materialId: 'kit-d-ameublement-2', quantity: 10 },
      { materialId: 'kit-de-sculpture-2', quantity: 5 },
    ],
  },
  {
    id: 'reparer-la-grande-maison',
    name: 'Réparer la Grande Maison',
    requirements: [
      { materialId: 'kit-de-construction-1', quantity: 20 },
      { materialId: 'kit-de-bois-1', quantity: 10 },
      { materialId: 'kit-d-ameublement-1', quantity: 6 },
    ],
  },
  {
    id: 'reparer-la-grande-maison-2',
    name: 'Réparer la Grande Maison',
    requirements: [
      { materialId: 'kit-de-construction-1', quantity: 30 },
      { materialId: 'kit-de-bois-2', quantity: 10 },
      { materialId: 'kit-de-sculpture-2', quantity: 4 },
    ],
  },
  {
    id: 'reparer-la-maison',
    name: 'Réparer la Maison',
    requirements: [
      { materialId: 'kit-de-construction-1', quantity: 30 },
      { materialId: 'kit-de-bois-2', quantity: 10 },
      { materialId: 'kit-de-sculpture-2', quantity: 4 },
    ],
  },
  {
    id: 'reparer-la-maison-2',
    name: 'Réparer la Maison',
    requirements: [
      { materialId: 'kit-de-construction-1', quantity: 20 },
      { materialId: 'kit-de-bois-1', quantity: 10 },
      { materialId: 'kit-d-ameublement-1', quantity: 6 },
    ],
  },
  {
    id: 'fabricant-de-meubles',
    name: 'Fabricant de Meubles',
    requirements: [
      { materialId: 'kit-de-construction-1', quantity: 6 },
      { materialId: 'kit-de-bois-1', quantity: 4 },
      { materialId: 'kit-de-fer-1', quantity: 2 },
    ],
  },
  {
    id: 'boulanger',
    name: 'Boulanger',
    requirements: [
      { materialId: 'kit-de-construction-1', quantity: 6 },
      { materialId: 'kit-de-bois-1', quantity: 4 },
      { materialId: 'kit-de-fer-1', quantity: 2 },
    ],
  },
  {
    id: 'poissonnier',
    name: 'Poissonnier',
    requirements: [
      { materialId: 'kit-de-construction-1', quantity: 6 },
      { materialId: 'kit-de-bois-1', quantity: 4 },
      { materialId: 'kit-de-fer-1', quantity: 2 },
    ],
  },
  {
    id: 'batisseur',
    name: 'Bâtisseur',
    requirements: [
      { materialId: 'kit-de-construction-1', quantity: 4 },
      { materialId: 'kit-de-bois-1', quantity: 3 },
      { materialId: 'kit-de-fer-1', quantity: 1 },
    ],
  },
  {
    id: 'forge',
    name: 'Forge',
    requirements: [
      { materialId: 'kit-de-construction-1', quantity: 4 },
      { materialId: 'kit-de-bois-1', quantity: 3 },
      { materialId: 'kit-de-fer-1', quantity: 1 },
    ],
  },
  {
    id: 'tavernier',
    name: 'Tavernier',
    requirements: [
      { materialId: 'kit-de-construction-1', quantity: 6 },
      { materialId: 'kit-de-bois-1', quantity: 4 },
      { materialId: 'kit-de-fer-1', quantity: 2 },
    ],
  },
  {
    id: 'brasseur',
    name: 'Brasseur',
    requirements: [
      { materialId: 'kit-de-construction-1', quantity: 6 },
      { materialId: 'kit-de-bois-1', quantity: 4 },
      { materialId: 'kit-de-fer-1', quantity: 2 },
    ],
  },
]
