import type { Reserve } from '../domain/types'

const OUTPUT_ROW = 119
const OUTPUT_SIZE = 2

function outputAt(column: number) {
  return { column, row: OUTPUT_ROW, width: OUTPUT_SIZE, height: OUTPUT_SIZE }
}

export const RESERVES: readonly Reserve[] = [
  { id: 'reserve-de-marbre', name: 'Réserve de Marbre', itemId: 'marbre', output: outputAt(17) },
  {
    id: 'reserve-de-minerai',
    name: 'Réserve de Minerai',
    itemId: 'minerai-de-fer',
    output: outputAt(25),
  },
  { id: 'reserve-de-charbon', name: 'Réserve de Charbon', itemId: 'charbon', output: outputAt(33) },
  { id: 'reserve-d-argile', name: "Réserve d'Argile", itemId: 'argile', output: outputAt(41) },
  { id: 'reserve-de-sable', name: 'Réserve de Sable', itemId: 'sable', output: outputAt(49) },
  { id: 'reserve-de-pierre', name: 'Réserve de Pierre', itemId: 'pierre', output: outputAt(57) },
  { id: 'reserve-de-buches', name: 'Réserve de Bûches', itemId: 'buche', output: outputAt(65) },
]
