import react, { useEffect, useMemo, useState } from "react";
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

const ReactGridCustom = () => {
  const [rowNumber, setrowNumber] = useState(1);
  const headerRow = {
    rowId: "header",
    cells: [
      { type: "header", text: "Name" },
      { type: "header", text: "Surname" },
      { type: "header", text: "FaridCustomCell" },
      { type: "header", text: "FaridDateCell" },
    ],
  };

  //   const [getRows, setgetRows] = useState([])
  //   useEffect(()=>{
  // setgetRows(headerRow,
  //   ...people.map((person, idx) => ({
  //     rowId: idx,
  //     cells: [
  //       { type: "text", text: person.name },
  //       { type: "text", text: person.surname },
  //       { type: "faridCell", text: person.fCell, list: ["a", "b", "c"] },
  //       { type: "faridDate", text: person.fDate },
  //     ],
  //   })),)
  //   },[people])
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
  // console.log(selectedWidth);
  const [selectedWidth, setselectedWidth] = useState({ work: 4 });

  // const [getPeople, setgetPeople] = useState([
  //   {
  //     name: "Thomas",
  //     surname: "Goldman",
  //     fCell: "b",
  //     fDate: "",
  //   },
  //   {
  //     name: "Susie",
  //     surname: "Quattro",
  //     fCell: "a",
  //     fDate: "",
  //   },
  //   {
  //     name: "Z",
  //     surname: "",
  //     fCell: "",

  //     fDate: "",
  //   },
  //   { name: "", surname: "", fCell: "", fDate: "" },
  // ]);

  const getStorage = useMemo(
    () => JSON.parse(localStorage.getItem(`table_work_${selectedWidth.work}`)),
    []
  );
  useEffect(() => {
    if (getStorage) {
      setselectedWidth({ ...getStorage });
      console.log("Local Storage Rerender");
    }
  }, [getStorage]);

  // const changedVar = JSON.parse(getStorage);
  // console.log(getStorage);
  const [getColumns, setgetColumns] = useState([
    {
      columnId: "name",

      width: getStorage?.["name"] ? getStorage["name"] : 100,
      resizable: true,
    },
    {
      columnId: "surname",

      width: getStorage?.["surname"] ? getStorage["surname"] : 100,
      resizable: true,
    },
    {
      columnId: "fCell",

      width: getStorage?.["fCell"] ? getStorage["fCell"] : 100,
      resizable: true,
    },
    {
      columnId: "fDate",

      width: getStorage?.["fDate"] ? getStorage["fDate"] : 100,
      resizable: true,
    },
  ]);

  const [people, setPeople] = useState([
    {
      name: "1",
      surname: "Goldman",
      fCell: "b",
      fDate: "",
    },
    {
      name: "2",
      surname: "Quattro",
      fCell: "a",
      fDate: "",
    },
    {
      name: "3",
      surname: "",
      fCell: "",

      fDate: "",
    },
    { name: "4", surname: "", fCell: "", fDate: "" },
  ]);
  const rows = getRows(people);
  const columns = getColumns;
  // console.log(people);

  // const addRowHandler = () => [
  //   headerRow,
  //   ...people.map((person, idx) => ({
  //     rowId: idx,
  //     cells: [...person, { type: "text", text: "" }],
  //   })),
  // ];

  // console.log(getPeople);

  const applyChangesToPeople = (changes, prevPeople) => {
    // console.log(changes, prevPeople);
    const getAllRowId = [];
    changes.forEach((el) => getAllRowId.push(el.rowId));
    const uniqueRows = [...new Set(getAllRowId)];
    // console.log(uniqueRows);
    // console.log(getAllRowId);
    changes.forEach((change) => {
      // console.log(change);
      const personIndex = change.rowId;
      const fieldName = change.columnId;
      if (change.type === "number") {
        prevPeople[personIndex][fieldName] = change.newCell.value;
        // console.log(people[change.rowId]);
      }
      if (change.type === "checkbox") {
        prevPeople[personIndex][fieldName] =
          !prevPeople[personIndex][fieldName];
        // console.log(people[change.rowId]);
      }
      if (change.type === "date") {
        prevPeople[personIndex][fieldName] = change.newCell.date;
      }
      if (change.type === "text") {
        prevPeople[personIndex][fieldName] = change.newCell.text;
        // console.log(people[change.rowId]);
      }
      if (change.type === "faridCell") {
        // console.log(prevPeople[personIndex]);
        const findList = prevPeople[personIndex]["list"];
        if (["", "a", "b", "c"].includes(change.newCell.text)) {
          prevPeople[personIndex][fieldName] = change.newCell.text;
          console.log(people[change.rowId]);
          console.log("Updated");
          return;
        }
        console.log("NOT UPDATED");
      }
      if (change.type === "faridDate") {
        if (!change.newCell.text) {
          prevPeople[personIndex][fieldName] = change.newCell.text;
        }
        console.log(change.newCell.text.split("/"));
        if (
          change.newCell.text.includes("/") &&
          change.newCell.text.split("/").length === 3
        ) {
          prevPeople[personIndex][fieldName] = change.newCell.text;
          console.log(people[change.rowId]);
        }
        console.log("farid date cell update!");
        // }
      }
    });
    uniqueRows.forEach((el) => console.log(prevPeople[el]));

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
    // console.log(selectedRowIds, selectedColIds, selectionMode, menuOptions);
    return menuOptions;
  };

  const handleColumnResize = (a, b) => {
    setselectedWidth({ ...selectedWidth, [a]: b });
    setgetColumns([
      ...getColumns.map((el) => (el.columnId === a ? { ...el, width: b } : el)),
    ]);
  };

  // console.log(localStorage.getItem(`table_work_${selectedWidth.work}`));

  // useEffect(() => {
  //   return () =>
  //     localStorage.setItem(`table_work_${selectedWidth.work}`, selectedWidth);
  // }, []);
  useEffect(() => {
    localStorage.setItem(
      `table_work_${selectedWidth.work}`,
      JSON.stringify(selectedWidth)
    );
  }, [selectedWidth]);

  const addRowHandler = () => {
    let emptyList = [];
    for (let i = 0; i < rowNumber; i++) {
      const x = { name: i.toString(), surname: "", fCell: "", fDate: "" };
      emptyList.push(x);
    }
    setPeople([...people, ...emptyList]);
  };

  return (
    <div>
      <h1>data-grid-2 is Here</h1>
      <input
        type="number"
        onChange={(e) => setrowNumber(+e.target.value)}
        value={rowNumber}
      />
      <button onClick={addRowHandler}>Add Row</button>
      <div className="reactgrid_container">
        <ReactGrid
          rows={rows}
          columns={columns}
          onCellsChanged={cellChangeHandler}
          enableFullWidthHeader
          stickyTopRows={1}
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
    </div>
  );
};

export default ReactGridCustom;
