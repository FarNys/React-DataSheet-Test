import React, { useState } from "react";
import Spreadsheet from "react-spreadsheet";

const ReactSpreadSheet = () => {
  const [data, setData] = useState([
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ]);

  const handler = (e) => {};
  const changeHnadler = (e) => {
    // console.log(e);
    setData(e);
  };
  const commitHandler = (e) => {
    console.log(e);
  };
  const columnHandler = (e) => {
    console.log(e);
  };
  return (
    <div>
      <h1>SpreadSheet</h1>
      <Spreadsheet
        data={data}
        onChange={changeHnadler}
        onCellCommit={commitHandler}
        ColumnIndicator={columnHandler}

        //   darkMode={true}
      />
      {/* <button onClick={handler}>Dark/Light</button> */}
    </div>
  );
};

export default ReactSpreadSheet;
