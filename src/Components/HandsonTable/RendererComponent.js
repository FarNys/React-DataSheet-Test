import React from "react";
import { HotTable, HotColumn } from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";
import Handsontable from "handsontable";

const RendererComponent = (props) => {
  // the available renderer-related props are:
  // - `row` (row index)
  // - `col` (column index)
  // - `prop` (column property name)
  // - `TD` (the HTML cell element)
  // - `cellProperties` (the `cellProperties` object for the edited cell)
  return (
    <React.Fragment>
      <i style={{ color: "#a9a9a9" }}>
        Row: {props.row}, column: {props.col},
      </i>{" "}
      value: {props.value}
    </React.Fragment>
  );
};

export default RendererComponent;
