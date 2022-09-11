import DataSheet from "./Components/DataSheet/DataSheet";
import "./Global.scss";
import "react-datasheet-grid/dist/style.css";
import Test from "./Components/React/Test";
import { Routes, Route, Link } from "react-router-dom";
import Works from "./Components/DataSheet/Works";
import ReactGrids from "./Components/ReactGrid/ReactGrids";
import WorkflowCreate from "./Components/DataSheet/WorkflowNew/WorkflowCreate";
import RealWork from "./Components/DataSheet/WorkflowNew/RealWork";
import RevoGridTable from "./Components/RevoGrid/RevoGridTable";
import HSTable from "./Components/HandsonTable/HSTable";
import HSTable2 from "./Components/HandsonTable/HSTable2";
import ReactSpreadSheet from "./Components/ReactSpreadSheet/ReactSpreadSheet";
import GridForFlag from "./Components/ReactGrid/GridForFlag";
import ReactGridCustom from "./Components/ReactGrid/ReactGridCustom";
import MyReactDataGrid from "./Components/ReactDataGrid/MyReactDataGrid";
function App() {
  return (
    <div className="App">
      <h1>Test</h1>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/data-grid">DATA Grid</Link>
      </li>
      <li>
        <Link to="/react-grid">React Grid</Link>
      </li>
      <li>
        <Link to="/react-grid-custom">React Grid</Link>
      </li>
      <li>
        <Link to="/react-grid-new">React Grid--2</Link>
      </li>
      <li>
        <Link to="/revo-grid">Revo Grid</Link>
      </li>
      <li>
        <Link to="/handson">Handson Table</Link>
      </li>
      <li>
        <Link to="/handson2">Handson Table - 2</Link>
      </li>
      <li>
        <Link to="/react-spreadsheet">SpreadSheet React</Link>
      </li>
      <li>
        <Link to="/workflow">Create Workflow</Link>
      </li>
      <li>
        <Link to="/work">Real Work</Link>
      </li>
      <li>
        <Link to="/react-data-grid">React Data Grid</Link>
      </li>
      <Routes>
        <Route path="/" element={<DataSheet />} />
        <Route path="/workflow" element={<WorkflowCreate />} />
        <Route path="/revo-grid" element={<RevoGridTable />} />
        <Route path="/handson" element={<HSTable />} />
        <Route path="/handson2" element={<HSTable2 />} />
        <Route path="/data-grid" element={<Works />} />
        <Route path="/react-grid-new" element={<ReactGridCustom />} />
        <Route path="/react-grid" element={<ReactGrids />} />
        <Route path="/react-grid-custom" element={<GridForFlag />} />
        <Route path="/work" element={<RealWork />} />
        <Route path="/react-spreadsheet" element={<ReactSpreadSheet />} />
        <Route path="/react-data-grid" element={<MyReactDataGrid />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
      {/* <Test /> */}
    </div>
  );
}

export default App;
