import { CellType, GridType } from "../types/types";

export default function BFS(grid: GridType): GridType {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const newGrid = JSON.parse(JSON.stringify(grid));
  if (!newGrid.start || !newGrid.end) {
    return newGrid;
  }

  const queue: CellType[] = [newGrid.start];
  newGrid.start.isTraversed = true;

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.row === newGrid.end.row && current.col === newGrid.end.col) {
      return backtrackPath(newGrid, current);
    }

    for (const dir of directions) {
      const newRow = current.row + dir[0];
      const newCol = current.col + dir[1];

      if (isValidCell(newRow, newCol, newGrid)) {
        const neighbor = newGrid.rows[newRow].cells[newCol];

        if (!neighbor.isTraversed && !neighbor.isObstacle) {
          neighbor.isTraversed = true;
          neighbor.parent = current;
          queue.push(neighbor);
        }
      }
    }
  }

  return newGrid;
}

function isValidCell(row: number, col: number, grid: GridType): boolean {
  return row >= 0 && row < grid.numRows && col >= 0 && col < grid.numCols;
}

function backtrackPath(grid: GridType, endCell: CellType): GridType {
  let current: CellType | undefined = endCell;
  while (current) {
    if (!current.isStart && !current.isEnd) {
      grid.rows[current.row].cells[current.col].isPath = true;
    }
    current = current.parent;
  }

  return grid;
}
