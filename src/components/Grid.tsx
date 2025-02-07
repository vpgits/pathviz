import React, { useMemo } from "react";
import { GridTypeContext } from "../context/GridContext";
import { CellType, RowType } from "../utils/types/types";
import Cell from "./Cell";

export default function Grid() {
  const { grid } = React.useContext(GridTypeContext)!;

  console.log("rerendered");
  return (
    <>
      {grid.rows.map((row: RowType, rowIndex: number) => (
        <div key={rowIndex} className="flex items-center justify-center">
          {row.cells.flatMap((cell: CellType, cellIndex: number) => (
            <Cell
            key={cellIndex}
              row={cell.row}
              col={cell.col}
              isObstacle={cell.isObstacle}
              cost={cell.cost}
              heuristic={cell.heuristic}
              isStart={cell.isStart}
              isEnd={cell.isEnd}
              isTraversed={cell.isTraversed}
              isPath={cell.isPath}
            />
          ))}
        </div>
      ))}
    </>
  );
}

// function MemoizedCell({ cell }: { cell: CellType }) {
//   const memoizedCell = useMemo(() => {
//     return (
//       <Cell
//         row={cell.row}
//         col={cell.col}
//         isObstacle={cell.isObstacle}
//         cost={cell.cost}
//         heuristic={cell.heuristic}
//         isStart={cell.isStart}
//         isEnd={cell.isEnd}
//         isTraversed={cell.isTraversed}
//         isPath={cell.isPath}
//       />
//     );
//   }, [cell]);
//   return memoizedCell;
// }
