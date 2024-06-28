import React, { useEffect } from "react";
import { GridTypeContext } from "../context/GridContext";
import BFS from "../utils/helpers/bfs";

export default function Controllers() {
  const GridContext = React.useContext(GridTypeContext);
  if (!GridContext) {
    throw new Error("GridTypeContext must be used within a GridProvider");
  }
  const { reducerGrid, dispatch } = GridContext;
  const [isStart, setIsStart] = React.useState(false);
  const [isEnd, setIsEnd] = React.useState(false);
  const [algorithm, setAlgorithm] = React.useState("bfs");
  useEffect(() => {
    if (reducerGrid.start != null && reducerGrid.end != null) {
      setIsStart(true);
    }
  }, []);
  useEffect(() => {
    if (isEnd) {
      setIsStart(false);
    }
  }, [isEnd]);
  const start = () => {
    const newGrid = BFS(reducerGrid);
    if (newGrid) {
      setIsEnd(true);
      dispatch({ type: "SET_GRID", payload: newGrid });
    }
  };

  const reRenderGrid = () => {
    dispatch({ type: "RE_RENDER" });
  };

  const resetGrid = () => {
    dispatch({ type: "RESET_GRID" });
  };
  return (
    <>
      <div className="flex items-center justify-center gap-x-2 my-2">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isStart}
          onClick={start}
        >
          Start
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={resetGrid}
        >
          Reset
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={reRenderGrid}
        >
          Re-Render
        </button>
        <select
          name="algorithm"
          id="algorithm"
          defaultValue={algorithm}
          title="Algorithm"
          className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="bfs">BFS</option>
        </select>
      </div>
    </>
  );
}
