import { RowType } from "../types/types";

export const createRows = (numRows: number, length: number) => {
  const rows: RowType[] = [];
  for (let i = 0; i < numRows; i++) {
    const cells = [];
    for (let j = 0; j < length; j++) {
      cells.push({
        row: i,
        col: j,
        isObstacle: Math.round(Math.random()) === 1 ? true : false,
        cost: Number.POSITIVE_INFINITY,
      });
    }
    rows.push({
      cells,
      index: i,
      length,
    });
  }
  return rows;
};
