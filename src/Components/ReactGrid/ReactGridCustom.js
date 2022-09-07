import react, { useState } from "react";
import {
  ReactGrid,
  CellChange,
  Row,
  Column,
  Id,
  MenuOption,
  SelectionMode,
  DefaultCellTypes,
} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.scss";
import { DropdownCellTemplate } from "./DropGrid";

const getPeople = () => [
  {
    name: "Thomas",
    surname: "Goldman",
    dropd: "",
  },
  {
    name: "Susie",
    surname: "Quattro",
    dropd: "",
  },
  {
    name: "",
    surname: "",
    dropd: "",
  },
];

const headerRow = {
  rowId: "header",
  cells: [
    { type: "header", text: "Name" },
    { type: "header", text: "Surname" },
    { type: "header", text: "DD" },
  ],
};

const getRows = (people) => [
  headerRow,
  ...people.map((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.name },
      { type: "text", text: person.surname },
      {
        type: "dd",
        values: [{ label: "farid", value: "farid" }],
        // isOpen: true,
      },
    ],
  })),
];
const ReactGridCustom = () => {
  const [selectedWidth, setselectedWidth] = useState(150);
  const getColumns = [
    { columnId: "name", width: selectedWidth, resizable: true },
    { columnId: "surname", resizable: true },
    { columnId: "dropd", resizable: true },
  ];

  const [people, setPeople] = useState(getPeople);
  const rows = getRows(people);
  const columns = getColumns;
  console.log(people);

  const addRowHandler = () => [
    headerRow,
    ...people.map((person, idx) => ({
      rowId: idx,
      cells: [...person, { type: "text", text: "" }],
    })),
  ];
  const applyChangesToPeople = (changes, prevPeople) => {
    console.log(changes);
    changes.forEach((change) => {
      const personIndex = change.rowId;
      const fieldName = change.columnId;
      if (change.type === "number") {
        prevPeople[personIndex][fieldName] = change.newCell.value;
      }
      if (change.type === "checkbox") {
        prevPeople[personIndex][fieldName] =
          !prevPeople[personIndex][fieldName];
      }
      if (change.type === "date") {
        prevPeople[personIndex][fieldName] = change.newCell.date;
      }
      if (change.type === "text") {
        prevPeople[personIndex][fieldName] = change.newCell.text;
      }
    });

    return [...prevPeople];
  };

  const cellChangeHandler = (changes) => {
    setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
  };

  const simpleHandleContextMenu = (
    selectedRowIds,
    selectedColIds,
    selectionMode,
    menuOptions
  ) => {
    console.log(selectedRowIds, selectedColIds, selectionMode, menuOptions);
    return menuOptions;
  };

  const handleColumnResize = (a, b, c) => {
    console.log(a, b, c);
    setselectedWidth(b);
  };

  return (
    <div>
      <h1>data-grid-2 is Here</h1>

      <button onClick={addRowHandler}>Add Row</button>
      <ReactGrid
        rows={rows}
        columns={columns}
        onCellsChanged={cellChangeHandler}
        // customCellTemplates={{
        //   dropdowns: new DropdownCellTemplate(),
        // }}
        // customCellTemplates={{
        //   myCell: new CustomCell(),
        // }}
        // enableRowSelection
        // enableColumnSelection
        enableRangeSelection
        customCellTemplates={{ dd: new DropdownCellTemplate() }}
        onContextMenu={simpleHandleContextMenu}
        onColumnResized={handleColumnResize}
      />
    </div>
  );
};

export default ReactGridCustom;
