import { GridType, RowType } from "../types/types";

export const blockStranded = (grid: GridType) => {
  const cells = grid.rows.flatMap((row: RowType) => row.cells);
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    let isStranded = true;
    if (cell.isObstacle) continue;
    for (let j = 0; j < directions.length; j++) {
      const [dx, dy] = directions[j];
      const newRow = cell.row + dx;
      const newCol = cell.col + dy;
      if (
        newRow < 0 ||
        newRow >= grid.numRows ||
        newCol < 0 ||
        newCol >= grid.numCols
      )
        continue;
      if (!grid.rows[newRow].cells[newCol].isObstacle) {
        isStranded = false;
        break;
      }
    }
    if (isStranded) {
      grid.rows[cell.row].cells[cell.col].isObstacle = true;
    }
  }
  return grid;
};