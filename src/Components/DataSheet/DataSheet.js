import React, { useCallback, useEffect, useState } from "react";
import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
  keyColumn,
  percentColumn,
  dateColumn,
  floatColumn,
  CellProps,
} from "react-datasheet-grid";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getSelectValue } from "../../store/datasheetSlice";
import { customeDateComponent } from "./DateComponent";

//CUSTOME COMPONENT
const SelectComponent = ({
  active,
  focus,
  rowData,
  setRowData,
  stopEditing,
  columnData,
}: CellProps) => {
  const [defaultOptions, setdefaultOptions] = useState([
    { value: "chocolate", label: "Chocolate", rowId: 1 },
    { value: "strawberry", label: "Strawberry", rowId: 2 },
    { value: "vanilla", label: "Vanilla", rowId: 3 },
  ]);
  return (
    <Select
      styles={{
        container: (provided) => ({
          ...provided,
          flex: 1,
          alignSelf: "stretch",
          pointerEvents: focus ? undefined : "none",
        }),
        /*...*/
        indicatorsContainer: (provided) => ({
          ...provided,
          opacity: active ? 1 : 0,
        }),
        placeholder: (provided) => ({
          ...provided,
          opacity: active ? 1 : 0,
        }),
      }}
      menuPortalTarget={document.body}
      onChange={({ value }) => {
        setRowData(value);
        setTimeout(stopEditing, 0);
      }}
      defaultValue="vanilla"
      value="vanilla"
      // value={defaultOptions.find(({ value }) => value === rowData) ?? null}
      options={defaultOptions}
    />
  );
};
//COPY PASTED FROM DOCUMENTS
const selectColumn = (
  options: SelectOptions
): Column<string | null, SelectOptions> => ({
  component: SelectComponent,
  columnData: options,
  disableKeys: true,
  keepFocus: true,

  disabled: options.disabled,

  deleteValue: () => null,
  copyValue: ({ rowData }) =>
    options.choices.find((choice) => choice.value === rowData)?.label,
  pasteValue: ({ value }) =>
    options.choices.find((choice) => choice.label === value)?.value ?? null,
});

const customeComp = () => {
  return <div>Not Access</div>;
};

const DataSheet = () => {
  const [lastKeyPress, setlastKeyPress] = useState();
  const getData = useSelector((state) => state.datasheetSlice.selectVal);
  // console.log(getData);
  const [data, setData] = useState([
    // { firstName: "Elon", lastName: "Musk" },
    // { firstName: "Jeff", lastName: "Bezos" },
  ]);
  // const columns = [
  //   { ...keyColumn("active", checkboxColumn), title: "Active" },
  //   { ...keyColumn("firstName", textColumn), title: "First name" },
  //   { ...keyColumn("lastName", textColumn), title: "Last name" },
  //   { ...keyColumn("lastName", textColumn), title: "Last name" },
  // ];
  const columns = [
    {
      ...keyColumn("normal", textColumn),
      title: "Normal",
      disabled: true,
    },
    {
      ...keyColumn("checkbox", checkboxColumn),
      title: "Checkbox",
      disabled: true,
    },
    {
      ...keyColumn("percent", percentColumn),
      title: "Percent",
    },
    {
      ...keyColumn("customeDate", customeDateComponent({})),
      title: "CustomeDate",
    },
    {
      ...keyColumn("float", floatColumn),
      title: "Float",
      headerClassName: "tetris",
      cellClassName: "test_test",
    },
    {
      ...keyColumn("date", dateColumn),
      title: "Date",
      cellClassName: "date_datagrid_class",
    },
    {
      ...keyColumn("flavor", selectColumn({})),
      title: "Flavor",
    },

    // {
    //   ...keyColumn("firstName", textColumn),
    //   title: "FirstName",
    // },
    // {
    //   ...keyColumn("lastName", textColumn),
    //   title: "LastName",
    // },
  ];
  // console.log(columns);
  // console.log(data);
  const [changeState, setchangeState] = useState(false);
  const [updatedData, setupdatedData] = useState([]);
  let x = [];
  const changeHandler = (newValue, operations) => {
    console.log(newValue);
    // console.log(newValue);
    let strictValue = [...newValue];
    // console.log(strictValue);
    // setData(newValue)
    // console.log(operations);
    for (const operation of operations) {
      // Handle operation
      setlastKeyPress(Date.now());
      // console.log(operation);
      if (operation.type === "CREATE") {
        setData(newValue);
        // console.log("HASAN");
      }
      if (operation.type === "UPDATE") {
        console.log(newValue);
        if (
          selectedCells.min.col === selectedCells.max.col &&
          selectedCells.min.row !== selectedCells.max.row
        ) {
          console.log("ITS OK");
        }
        // console.log("KACHAL");
        setData(newValue);
        // console.log(newValue);
      }
    }
    // console.log(newValue);
    // setData(strictValue);

    // setData(strictValue);
  };
  const [blurData, setblurData] = useState({ col: "", row: "" });
  const blurHandler = (props) => {
    console.log(props.cell);
    setblurData(props.cell);
  };
  // const focusHandler = (e) => {
  //   console.log(e);
  // };

  //STATE FOR GET CURRENT SELECTED CELLS
  const [selectedCells, setselectedCells] = useState(null);
  const selectionHandler = (e) => {
    // console.log(e);
    setselectedCells(e.selection);
  };
  console.log(selectedCells);
  // useEffect(() => {
  //   console.log(data[blurData.row]);
  // }, [blurData.col, blurData.row]);
  return (
    <div>
      <h3>DataSheet Grid</h3>
      <div>
        {" "}
        <DataSheetGrid
          className="data-sheet-grid"
          onBlur={blurHandler}
          value={data}
          onChange={changeHandler}
          columns={columns}
          // onFocus={focusHandler}
          onSelectionChange={selectionHandler}
          // createRow={() => ({ age: 25, date: new Date() })}
          // columns={[
          //   {
          //     component: SelectComponent,
          //     title: "Flavor",
          //     keepFocus: true,
          //   },
          //   {
          //     ...keyColumn("data", textColumn),
          //     title: "DAta",
          //   },
          // ]}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default DataSheet;
