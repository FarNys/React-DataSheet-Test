import DataSheet from "./Components/DataSheet/DataSheet";
import "./Global.scss";
import "react-datasheet-grid/dist/style.css";
import Test from "./Components/React/Test";
import { Routes, Route, Link } from "react-router-dom";
import Works from "./Components/DataSheet/Works";
import ReactGrids from "./Components/ReactGrid/ReactGrids";
import WorkflowCreate from "./Components/DataSheet/WorkflowNew/WorkflowCreate";
import RealWork from "./Components/DataSheet/WorkflowNew/RealWork";

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
      <h2>7.65 Workflow</h2>
      <li>
        <Link to="/workflow">Create Workflow</Link>
      </li>
      <li>
        <Link to="/work">Real Work</Link>
      </li>
      <Routes>
        <Route path="/" element={<DataSheet />} />
        <Route path="/workflow" element={<WorkflowCreate />} />
        <Route path="/data-grid" element={<Works />} />
        <Route path="/react-grid" element={<ReactGrids />} />
        <Route path="/work" element={<RealWork />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
      {/* <Test /> */}
    </div>
  );
}

export default App;
