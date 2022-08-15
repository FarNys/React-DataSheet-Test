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
      ...dropdown,
      columnType: "select",
      // labelKey: "label",
      valueKey: "value",
      prop: "dd",
    },
  ]);
  const [source, setsource] = useState([
    {
      name: "1",
      details: "Item 1",
      family: "gladiator",
      dd: "",
      birthdate: "",
    },
    {
      name: "2",
      details: "Item 70",
      family: "troy",
      dd: "",
    },
    {
      name: "15",
      details: "Item 35",
      family: "trossssy",
    },
    {
      name: "2",
      details: "Item 67",
      family: "Valid",
    },
    {
      name: "2",
      details: "Item 21",
      family: "email",
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
      />
    </div>
  );
};

export default RevoGridTable;
