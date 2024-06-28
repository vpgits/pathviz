import { createContext, useReducer, useState } from "react";
import { GridActionType, GridType } from "../utils/types/types";
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
  isGraphVisualized: boolean;
  setIsGraphVisualized: (isVisualized: boolean) => void;
  setStartingCell: (row: number, col: number) => void;
  setEndingCell: (row: number, col: number) => void;
  reducerGrid: GridType;
  dispatch: React.Dispatch<GridActionType>;
}

export const GridTypeContext = createContext<
  GridTypeContextInterface | undefined
>(undefined);

const gridReducer = (state: GridType, action: GridActionType) => {
  switch (action.type) {
    case "SET_GRID":
      return action.payload;
    case "RESET_GRID":
      return initialGridValue;
    case "RE_RENDER":
      return createGrid(state.numRows, state.numCols);
    default:
      throw new Error("Invalid Grid State change requested");
  }
};

export const GridTypeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  initialGridValue = blockStranded(initialGridValue);

  const [initialGrid, setInitialGrid] = useState<GridType>(initialGridValue);
  // const [grid, setGrid] = useState<GridType>(initialGridValue);
  const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);
  const [reducerGrid, dispatch] = useReducer(gridReducer, initialGridValue);

  const setStartingCell = (row: number, col: number) => {
    const newGrid = JSON.parse(JSON.stringify(reducerGrid));
    newGrid.start = newGrid.rows[row].cells[col];
    newGrid.rows[row].cells[col].isStart = true;
    dispatch({ type: "SET_GRID", payload: newGrid });
  };

  const setEndingCell = (row: number, col: number) => {
    const newGrid = JSON.parse(JSON.stringify(reducerGrid));
    newGrid.end = newGrid.rows[row].cells[col];
    newGrid.rows[row].cells[col].isEnd = true;

    dispatch({ type: "SET_GRID", payload: newGrid });
  };

  return (
    <GridTypeContext.Provider
      value={{
        initialGrid,
        setInitialGrid,
        isGraphVisualized,
        setIsGraphVisualized,
        setStartingCell,
        setEndingCell,
        reducerGrid,
        dispatch,
      }}
    >
      {children}
    </GridTypeContext.Provider>
  );
};
