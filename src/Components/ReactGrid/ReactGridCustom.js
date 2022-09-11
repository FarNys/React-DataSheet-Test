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
import { FaridCell } from "./FaridCell";
import { FaridDate } from "./FaridDate";

const getPeople = () => [
  {
    name: "Thomas",
    surname: "Goldman",
    fCell: "b",
    fDate: "",
  },
  {
    name: "Susie",
    surname: "Quattro",
    fCell: "a",
    fDate: "",
  },
  {
    name: "Z",
    surname: "",
    fCell: "",

    fDate: "",
  },
];

const headerRow = {
  rowId: "header",
  cells: [
    { type: "header", text: "Name" },
    { type: "header", text: "Surname" },
    { type: "header", text: "FaridCustomCell" },
    { type: "header", text: "FaridDateCell" },
  ],
};

const getRows = (people) => [
  headerRow,
  ...people.map((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.name },
      { type: "text", text: person.surname },
      { type: "faridCell", text: person.fCell, list: ["a", "b", "c"] },
      { type: "faridDate", text: person.fDate },
    ],
  })),
];
const ReactGridCustom = () => {
  const [selectedWidth, setselectedWidth] = useState({});
  console.log(selectedWidth);
  const getColumns = [
    { columnId: "name", width: selectedWidth["name"], resizable: true },
    { columnId: "surname", width: selectedWidth["surname"], resizable: true },
    { columnId: "fCell", width: selectedWidth["fCell"], resizable: true },
    { columnId: "fDate", width: selectedWidth["fDate"], resizable: true },
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
    changes.forEach((change) => {
      console.log(change);
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
      if (change.type === "faridCell") {
        console.log(prevPeople[personIndex]);
        const findList = prevPeople[personIndex]["list"];
        console.log(findList);
        prevPeople[personIndex][fieldName] = change.newCell.text;
      }
      if (change.type === "faridDate") {
        prevPeople[personIndex][fieldName] = change.newCell.text;
        console.log("farid date cell update!");
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

  const handleColumnResize = (a, b) => {
    setselectedWidth({ ...selectedWidth, [a]: b });
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
        // customCellTemplates={{ dd: new DropdownCellTemplate() }}
        customCellTemplates={{
          faridCell: new FaridCell(),
          faridDate: new FaridDate(),
        }}
        onContextMenu={simpleHandleContextMenu}
        onColumnResized={handleColumnResize}
      />
    </div>
  );
};

export default ReactGridCustom;
