import React, { useState } from "react";
import DataGrid, { textEditor } from "react-data-grid";

const columns = [
  { key: "id", name: "ID", editor: textEditor },
  { key: "title", name: "Title", editor: textEditor },
  { key: "name", name: "Name", editor: textEditor },
];

const rows = [
  { id: 0, title: "Example", name: "F" },
  { id: 1, title: "Demo", name: "" },
  { id: 2, title: "NameS", name: "Z" },
  { id: 3, title: "MY Fam", name: "k" },
];

const MyReactDataGrid = () => {
  const [myRow, setmyRow] = useState(rows);
  console.log(navigator.clipboard.read());
  const onRowsChangeHandler = (list, target) => {
    // setmyRow(e);
    console.log(list);
    const changedRow = target.indexes[0];
    const before = myRow.slice(0, changedRow);
    const after = myRow.slice(changedRow + 1, myRow.length);
    console.log(before);
    console.log(after);
    setmyRow([...before, list[changedRow], ...after]);
  };

  const onSelectedRowsChangeHandler = (e) => {
    console.log(e);
  };

  const selectedRows = (e) => {
    console.log(e);
  };

  const handleFill = (e) => {
    console.log(e);
  };

  const copyHandler = (e) => {
    console.log(e);
  };

  const pasteHandler = (e) => {
    console.log(e);
  };

  return (
    <div>
      <h2>REACT DATA GRID</h2>
      <DataGrid
        columns={columns}
        rows={myRow}
        onRowsChange={onRowsChangeHandler}
        onSelectedRowsChange={onSelectedRowsChangeHandler}
        selectedRows={selectedRows}
        onFill={handleFill}
        onCopy={copyHandler}
        onPaste={pasteHandler}
      />
    </div>
  );
};

export default MyReactDataGrid;
