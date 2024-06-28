import React from "react";
import { GridTypeContext } from "../context/GridContext";

type CellProps = {
  row: number;
  col: number;
  isObstacle: boolean | undefined;
  cost: number;
  heuristic: number | undefined;
  isStart: boolean | undefined;
  isEnd: boolean | undefined;
  isTraversed: boolean | undefined;
  isPath: boolean | undefined;
};

export default function Cell({
  row,
  col,
  isObstacle,
  isStart,
  isEnd,
  isTraversed,
  isPath,
}: CellProps) {
  let cellClass =
    "w-12 h-12  border border-gray-300 flex flex-col items-center justify-center text-xs transition-colors duration-300 hover:cursor-pointer";

  if (isStart) {
    cellClass += " bg-green-500 text-white";
  } else if (isEnd) {
    cellClass += " bg-red-500 text-white";
  } else if (isObstacle) {
    cellClass += " bg-gray-800 text-white";
  } else if (isTraversed) {
    cellClass += " bg-blue-200";
  } else {
    cellClass += " bg-white hover:bg-gray-100";
  }
  if (isPath) {
    cellClass += " bg-blue-500";
  }

  const GridContext = React.useContext(GridTypeContext);
  if (!GridContext) {
    throw new Error("GridTypeContext must be used within a GridProvider");
  }
  const { reducerGrid, setStartingCell, setEndingCell } = GridContext;

  const handleClick = () => {
    if (isObstacle) return;
    if (reducerGrid.start != null && reducerGrid.end != null) return;
    if (reducerGrid.start != null) {
      setEndingCell(row, col);
    } else {
      setStartingCell(row, col);
    }
  };

  return <div className={cellClass} onClick={handleClick}></div>;
}
