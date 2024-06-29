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

          <Grid />
        </div>
      </GridTypeContextProvider>
    </>
  );
}

export default App;

// function MemoizedGrid() {
//   const GridContext = useContext(GridTypeContext);
//   if (!GridContext) {
//     throw new Error(
//       "useGridTypeContext must be used within a GridTypeContextProvider"
//     );
//   }
//   const { grid } = GridContext;
//   const memoizedGrid = useMemo(() => {
//     return <Grid />;
//   }, [grid]);
//   return memoizedGrid;
// }
