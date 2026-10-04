import type { Floor } from '../domain/types'

export const FLOOR: Floor = {
  columns: 95,
  rows: 136,
  cellWidth: 32,
  cellHeight: 24,
  buildableAreas: [
    { column: 13, row: 15, width: 38, height: 25 },
    { column: 57, row: 63, width: 18, height: 5 },
    { column: 13, row: 68, width: 38, height: 3 },
    { column: 57, row: 68, width: 18, height: 2 },
    { column: 57, row: 70, width: 24, height: 1 },
    { column: 13, row: 71, width: 68, height: 15 },
    { column: 13, row: 86, width: 62, height: 1 },
    { column: 19, row: 87, width: 56, height: 12 },
    { column: 13, row: 99, width: 62, height: 22 },
  ],
}
