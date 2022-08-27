import * as React from "react";
import { render } from "react-dom";
import { ReactGrid, Column, Row, DefaultCellTypes } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.scss";
import { FlagCell, FlagCellTemplate } from "./FlagCellTemplate";
// import "./styles.css";

const getFlags = () => [
  { isoCode: "swe" },
  { isoCode: "deu" },
  { isoCode: "mex" },
  { isoCode: "" },
];

const getColumns = () => [{ columnId: "flag", width: 150 }];

const headerRow = {
  rowId: "header",
  height: 40,
  cells: [{ type: "header", text: "Flags" }],
};

const getRows = (flags) => [
  headerRow,
  ...flags.map((flag, idx) => ({
    rowId: idx,
    height: 60,
    cells: [{ type: "flag", text: flag.isoCode }],
  })),
];

const GridForFlag = () => {
  const [flags] = React.useState(getFlags());
  console.log(flags);
  const changeHandler = (e) => {
    console.log(e);
  };

  const rows = getRows(flags);
  const columns = getColumns();
  console.log(getRows);

  return (
    <ReactGrid
      rows={rows}
      columns={columns}
      customCellTemplates={{ flag: new FlagCellTemplate() }}
      onCellsChanged={changeHandler}
    />
  );
};

export default GridForFlag;
