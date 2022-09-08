import React, { useState } from "react";
import { defineCustomElements } from "@revolist/revogrid/loader";
import { RevoGrid } from "@revolist/revogrid-react";
import SelectTypePlugin from "@revolist/revogrid-column-select";
import Plugin from "@revolist/revogrid-column-date";

const RevoGridTable = () => {
  defineCustomElements();
  const columnTypes = { select: new SelectTypePlugin(), date: new Plugin() };

  const dropdown = {
    // prop: "dd",
    // labelKey: "label",
    // valueKey: "value",
    source: [
      { label: "According", value: "a" },
      { label: "Over", value: "b" },
      { label: "Source", value: "s" },
    ],
  };

  const [columns, setcolumns] = useState([
    {
      prop: "name",
      name: "First",
    },
    {
      prop: "details",
      name: "Second",
    },
    {
      prop: "family",
      name: "Family",
    },
    { prop: "birthdate", columnType: "date", size: 200 },
    {
      columnType: "select",
      // labelKey: "label",
      source: ["hi", "bye"],
      prop: "selection",
      name: "SelectMe",
    },
    {
      prop: "custom",
      name: "CustomCell",
      cellTemplate: (createElement, props) => {
        // console.log(props);
        const findType = props.model[props.prop];
        console.log(typeof findType, findType);
        // console.log(findType, typeof +findType);
        // console.log(typeof +props.model[props.prop]);
        return createElement(
          "div",
          {
            style: {
              color: "red",
              backgroundColor: props.model[props.prop]
                ? "rgba(0,0,255,+props.model[props.prop] / 100)"
                : "rgba(0,0,0,0)",
              width: "100%",
            },
          },
          // typeof props.model[props.prop] === "number"
          // "m".repeat(props.model[props.prop])
          props.model[props.prop]
          // : null
        );
      },
    },
    {
      prop: "customCheck",
      name: "myCheckBox",
      cellTemplate: (createElement, props) => {
        // console.log(props);
        return (
          createElement("input", {
            style: {
              color: "red",
            },
            type: "checkbox",
          }),
          props.model[props.prop]
        );
      },
    },
  ]);
  const [source, setsource] = useState([
    {
      name: "1",
      details: "Item 1",
      family: "gladiator",
      selection: "",
      custom: "",
      customCheck: "",
    },
    {
      name: "2",
      details: "Item 70",
      family: "troy",
      selection: "",
      custom: "",
      customCheck: "",
    },
    {
      name: "15",
      details: "Item 35",
      family: "trossssy",
      selection: "",
      custom: "",
      customCheck: "",
    },
    {
      name: "2",
      details: "Item 67",
      family: "Valid",
      selection: "",
      custom: "",
      customCheck: "",
    },
    {
      name: "2",
      details: "Item 21",
      family: "email",
      selection: "",
      custom: "",
      customCheck: true,
    },
  ]);
  const afterEditHandler = (e) => {
    console.log(e, 888);
  };
  const beforeEditHandler = (e) => {
    console.log(e, 999);
  };
  const copyHandler = (e) => {
    console.log("copy", e);
  };
  const pasteHandler = (e) => {
    console.log("paste", e);
  };
  const copyCaptureHandler = (e) => {
    console.log("copy capture", e);
  };
  return (
    <div>
      <h1>Revo Grid</h1>
      <RevoGrid
        theme="compact"
        columns={columns}
        source={source}
        className="revo_grid_manual"
        onAfteredit={afterEditHandler}
        // onBeforeedit={beforeEditHandler}
        // onCopy={copyHandler}
        // onPaste={pasteHandler}
        // onCopyCapture={copyCaptureHandler}
        columnTypes={columnTypes}
        resize="true"
        range="true"
      />
    </div>
  );
};

export default RevoGridTable;
