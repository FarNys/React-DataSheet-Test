import * as React from "react";
import {
  ReactGrid,
  CellChange,
  Row,
  Column,
  Id,
  MenuOption,
  SelectionMode,
} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { DropdownCellTemplate } from "./DropGrid";
const getPeople = () => [
  {
    name: "Thomas",
    surname: "Goldman",
    checkbox: false,
    date: new Date(),
    number: 25,
    dropdown: "",
  },
  {
    name: "Susie",
    surname: "Quattro",
    checkbox: false,
    date: new Date(),
    number: 27,
    dropdown: "",
  },
  {
    name: "",
    surname: "",
    checkbox: true,
    date: new Date(),
    number: 9,
    dropdown: "",
  },
];

const getColumns = [
  { columnId: "name", width: 150 },
  { columnId: "surname", width: 150 },
  { columnId: "checkbox", width: 150 },
  { columnId: "date", width: 150 },
  { columnId: "number", width: 150 },
  { columnId: "dropdowns", width: 150 },
];

const headerRow = {
  rowId: "header",
  cells: [
    { type: "header", text: "Name" },
    { type: "header", text: "Surname" },
    { type: "header", text: "CheckboxHeader" },
    { type: "header", text: "DateHeader" },
    { type: "header", text: "Numbers" },
    { type: "header", text: "DropDown" },
  ],
};

const getRows = (people) => [
  headerRow,
  ...people.map((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.name },
      { type: "text", text: person.surname },
      { type: "checkbox", checked: person.checkbox },
      { type: "date", date: person.date },
      { type: "number", value: person.number },
      {
        type: "dropdowns",
        values: [
          { label: "string-1", value: "string-1" },
          // { label: "string-2", value: "string-2" },
          // { label: "string-3", value: "string-3" },
        ],
        // isDisabled: false,
        isOpen: true,
        selectedValue: person.dropdown,
        value: person.dropdown,
      },
    ],
  })),
];
const ReactGrids = () => {
  const [people, setPeople] = React.useState(getPeople);
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
      if (change.type === "dropdown") {
        prevPeople[personIndex][fieldName] = change.newCell.dropdown;
        console.log(change);
        // prevPeople[personIndex][fieldName] = prevPeople[personIndex][fieldName];
        console.log(prevPeople, personIndex, fieldName);
        console.log(prevPeople[personIndex][fieldName]);

        // prevPeople[personIndex][fieldName] = 20;
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
  return (
    <div>
      <h1>data-grid</h1>
      <button onClick={addRowHandler}>Add Row</button>
      <ReactGrid
        rows={rows}
        columns={columns}
        onCellsChanged={cellChangeHandler}
        customCellTemplates={{ dropdowns: new DropdownCellTemplate() }}
        // enableRowSelection
        // enableColumnSelection
        enableRangeSelection
        onContextMenu={simpleHandleContextMenu}
      />
    </div>
  );
};

export default ReactGrids;
