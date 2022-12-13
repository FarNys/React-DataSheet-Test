import React, { useEffect, useState } from "react";
import Spreadsheet from "react-spreadsheet";
import { FixedSizeGrid as Grid } from "react-window";

const ReactSpreadSheet = () => {
  const [myData, setmyData] = useState([]);
  useEffect(() => {
    let emptyList = [];
    for (let i = 0; i < 1000; i++) {
      const x = [{ value: "Vanilla" }, { value: "Chocolate" }];
      emptyList.push(x);
    }
    setmyData(emptyList);
  }, []);
  const [data, setData] = useState([
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [
      {
        value: "Strawberry",
        DataViewer: () => <h5>Straw</h5>,
        DataEditor: () => <p>Hi</p>,
      },
      { value: "Cookies" },
    ],
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
      {myData.length > 0 && (
        <Grid
          columnCount={10}
          columnWidth={100}
          height={150}
          rowCount={myData.length}
          rowHeight={35}
          width={300}
        >
          {({ style }) => <p style={style}>Hi</p>}
        </Grid>
      )}
      {/* <Grid
        columnCount={1000}
        columnWidth={100}
        height={150}
        rowCount={1000}
        rowHeight={35}
        width={300}
      >
        {Cell}
      </Grid> */}
    </div>
  );
};

export default ReactSpreadSheet;
{
  /* <Spreadsheet
            data={myData}
            onChange={changeHnadler}
            onCellCommit={commitHandler}
            ColumnIndicator={columnHandler}
            HeaderRow={50}
          /> */
}

const Cell = ({ columnIndex, rowIndex, style }) => {
  console.log(columnIndex, rowIndex, style);

  return (
    <div style={style}>
      Item {rowIndex},{columnIndex}
    </div>
  );
};
