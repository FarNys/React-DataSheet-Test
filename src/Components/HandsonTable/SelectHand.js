import React from "react";
import { HotTable, HotColumn } from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";
import Handsontable from "handsontable";

const SelectHand = (props) => {
  console.log(props);
  const changeHandler = (e) => {
    console.log(e.target.value);
    props.value.val = e.target.value;
  };
  // the available renderer-related props are:
  // - `row` (row index)
  // - `col` (column index)
  // - `prop` (column property name)
  // - `TD` (the HTML cell element)
  // - `cellProperties` (the `cellProperties` object for the edited cell)
  return (
    <select onChange={changeHandler}>
      {props.value.source.map((el, index) => (
        <option key={index}>{el.value}</option>
      ))}
    </select>
  );
};

export default SelectHand;
