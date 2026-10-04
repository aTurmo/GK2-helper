import { runes } from '../domain/runes'
import type { Recipe } from '../domain/types'

export const RECIPES: readonly Recipe[] = [
  { id: 'potion-de-soins', name: 'Potion de Soins', runes: runes(2, 0, 0) },
  { id: 'potion-de-soins-2', name: 'Potion de Soins II', runes: runes(4, 0, 0) },
  { id: 'potion-de-degats', name: 'Potion de Dégâts', runes: runes(1, 1, 0) },
  { id: 'potion-de-degats-2', name: 'Potion de Dégâts II', runes: runes(2, 2, 0) },
  { id: 'potion-de-berserker', name: 'Potion de Berserker', runes: runes(1, 1, 1) },
  { id: 'potion-de-berserker-2', name: 'Potion de Berserker II', runes: runes(2, 1, 1) },
  {
    id: 'potion-de-motivation-de-zombies',
    name: 'Potion de Motivation de Zombies',
    runes: runes(1, 0, 1),
  },
  {
    id: 'potion-de-motivation-de-zombies-2',
    name: 'Potion de Motivation de Zombies II',
    runes: runes(1, 0, 2),
  },
  {
    id: 'elixir-de-croissance-faible',
    name: 'Élixir de Croissance Faible',
    runes: runes(1, 2, 0),
  },
  {
    id: 'elixir-de-croissance-vigoureuse',
    name: 'Élixir de Croissance Vigoureuse',
    runes: runes(1, 3, 0),
  },
  {
    id: 'elixir-de-croissance-miraculeuse',
    name: 'Élixir de Croissance Miraculeuse',
    runes: runes(1, 5, 0),
  },
  { id: 'liquide-de-reanimation', name: 'Liquide de Réanimation', runes: runes(2, 1, 4) },
  { id: 'poussiere-explosive', name: 'Poussière Explosive', runes: runes(2, 0, 2) },
  { id: 'poudre-de-reve', name: 'Poudre de Rêve', runes: runes(0, 1, 1) },
  { id: 'peinture', name: 'Peinture', runes: runes(0, 2, 0) },
  { id: 'laque', name: 'Laque', runes: runes(0, 0, 2) },
  { id: 'conservateur', name: 'Conservateur', runes: runes(0, 3, 0) },
]
