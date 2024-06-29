import { createContext, useState } from "react";
import { GridType } from "../utils/types/types";
import { ReactNode } from "react";
import { createRows } from "../utils/helpers/createRow";
import { blockStranded } from "../utils/helpers/blockStranded";

const createGrid = (numRows: number, numCols: number) => {
  return {
    numRows,
    numCols,
    rows: createRows(numRows, numCols),
  };
};

let initialGridValue: GridType = createGrid(6, 6);

interface GridTypeContextInterface {
  initialGrid: GridType;
  setInitialGrid: (GridType: GridType) => void;
  grid: GridType;
  setGrid: (GridType: GridType) => void;
  resetGrid: () => void;
  reRenderGrid: () => void;
  isGraphVisualized: boolean;
  setIsGraphVisualized: (isVisualized: boolean) => void;
  setStartingCell: (row: number, col: number) => void;
  setEndingCell: (row: number, col: number) => void;
}

export const GridTypeContext = createContext<
  GridTypeContextInterface | undefined
>(undefined);

export const GridTypeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  initialGridValue = blockStranded(initialGridValue);

  const [initialGrid, setInitialGrid] = useState<GridType>(initialGridValue);
  const [grid, setGrid] = useState<GridType>(initialGridValue);
  const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);

  const setStartingCell = (row: number, col: number) => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid.start = newGrid.rows[row].cells[col];
    newGrid.rows[row].cells[col].isStart = true;
    setGrid(newGrid);
  };

  const setEndingCell = (row: number, col: number) => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid.end = newGrid.rows[row].cells[col];
    newGrid.rows[row].cells[col].isEnd = true;

    setGrid(newGrid);
  };

  const resetGrid = () => {
    setGrid(initialGrid);
  };

  const reRenderGrid = () => {
    setGrid(createGrid(grid.numRows, grid.numCols))
  }

  return (
    <GridTypeContext.Provider
      value={{
        initialGrid,
        setInitialGrid,
        grid,
        setGrid,
        resetGrid,
        reRenderGrid,
        isGraphVisualized,
        setIsGraphVisualized,
        setStartingCell,
        setEndingCell,
      }}
    >
      {children}
    </GridTypeContext.Provider>
  );
};
