import { CellType, GridType } from "../types/types";

export default async function BFS(
  grid: GridType,
  setGrid: (grid: GridType) => void
): Promise<boolean> {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  if (!grid.start || !grid.end) {
    return false;
  }

  const queue: CellType[] = [grid.start];
  grid.start.isTraversed = true;

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.row === grid.end.row && current.col === grid.end.col) {
      let endCell: CellType | undefined = current;
      const updatedGrid = { ...grid };
      while (endCell) {
        if (!endCell.isStart && !endCell.isEnd) {
          updatedGrid.rows[endCell.row].cells[endCell.col].isPath = true;
        }
        endCell = endCell.parent;
      }
      setGrid(updatedGrid);
      return true;
    }

    for (const dir of directions) {
      const newRow = current.row + dir[0];
      const newCol = current.col + dir[1];

      if (isValidCell(newRow, newCol, grid)) {
        const neighbor = grid.rows[newRow].cells[newCol];

        if (!neighbor.isTraversed && !neighbor.isObstacle) {
          neighbor.isTraversed = true;
          neighbor.parent = current;
          queue.push(neighbor);
          
          const updatedGrid = { ...grid };
          updatedGrid.rows[newRow].cells[newCol] = { ...neighbor };
          setGrid(updatedGrid);
          
          await new Promise((resolve) => {
            setTimeout(resolve, 200);
          });
        }
      }
    }
  }

  return false;
}

function isValidCell(row: number, col: number, grid: GridType): boolean {
  return row >= 0 && row < grid.numRows && col >= 0 && col < grid.numCols;
}