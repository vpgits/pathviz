import { useContext, useMemo } from "react";
import "./App.css";
import Grid from "./components/Grid";
import {
  GridTypeContext,
  GridTypeContextProvider,
} from "./context/GridContext";
import Controllers from "./components/Controllers";

function App() {
  return (
    <>
      <GridTypeContextProvider>
        <div className="flex flex-col justify-end">
          <div>
            {" "}
            <h1 className="font-bold">Grid</h1>
            <Controllers />
          </div>

          <MemoizedGrid />
        </div>
      </GridTypeContextProvider>
    </>
  );
}

export default App;

function MemoizedGrid() {
  const GridContext = useContext(GridTypeContext);
  if (!GridContext) {
    throw new Error(
      "useGridTypeContext must be used within a GridTypeContextProvider"
    );
  }
  const { reducerGrid } = GridContext;
  const memoizedGrid = useMemo(() => {
    return <Grid />;
  }, [reducerGrid]);
  return memoizedGrid;
}
