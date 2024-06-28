export type CellType = {
  row: number;
  col: number;
  isObstacle?: boolean;
  cost: number;
  isStart?: boolean;
  isEnd?: boolean;
  isTraversed?: boolean;
  isPath?: boolean;
  parent?: CellType; // important for backtracking from the endCell in grid
  heuristic?: number; // used for aStar
};

export type RowType = {
  cells: CellType[];
  index: number;
  length: number;
};

export type GridType = {
  numRows: number;
  numCols: number;
  rows: RowType[];
  start?: CellType;
  end?: CellType;
};

export type GridActionType = {
  type: string;
  payload?: any;
};
