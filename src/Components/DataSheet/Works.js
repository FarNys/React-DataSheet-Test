import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { baseUrl, token } from "../../api/api";
import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
  keyColumn,
  percentColumn,
  dateColumn,
  floatColumn,
} from "react-datasheet-grid";
import DataSheet from "./DataSheet";
const Works = () => {
  const checkList = ["created_at", "updated_at", "id", "name"];

  const [checkState, setcheckState] = useState(false);
  //ADD STATE FOR TYPE OF ACTION AND SELECTED ROW TO UPDATE WHEN A CELL FILLED BY COPY PASTED
  const initialActionType = {
    type: "",
    fromRowIndex: "",
    cellIndex: "",
  };
  const [actionTypes, setactionTypes] = useState(initialActionType);
  const [tableDataDefault, settableDataDefault] = useState([]);
  //SET INITIAL DATA FOR TABLE OF WORK WITH TITLE
  const [tableTitle, settableTitle] = useState([]);
  const [dataSheetTitle, setdataSheetTitle] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `${baseUrl}/api/v1/workflow/workflow/4/`,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        let newObject = { ...res.data };
        const data = res.data;
        for (const key in data) {
          if (checkList.includes(key) || data[key] === null) {
            delete newObject[key];
          }
        }
        //CREATE TABLE TITLE TO ADD IT IN USE EFFECT DEPENDANCY FOR CREATE TABLE ACCESS WITH IT
        settableTitle([newObject]);

        //CREATE TABLE TITLE BASED ON WHAT DATAGRID PACKAGE TAKE DATA
        let emptyList = [];
        for (const key in newObject) {
          const x = {
            ...keyColumn(key, textColumn),
            title: newObject[key],
            color: "red",
          };
          emptyList.push(x);
        }

        setdataSheetTitle(emptyList);
      })
      .catch((err) => console.log(err));
  }, []);

  //GET TABLE ACCESS AFTER GETTING TABLE TITLES
  const [tableAccess, settableAccess] = useState([]);
  useEffect(() => {
    if (dataSheetTitle.length > 0) {
      axios({
        method: "get",
        url: `${baseUrl}/api/v1/workflow/station/?workflow=4`,
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          const data = res.data.results[0];
          const newObject = {};
          for (let key in tableTitle[0]) {
            newObject[key] = data[key];
          }
          settableAccess([newObject]);
        })
        .catch((err) => console.log(err));
    }
  }, [dataSheetTitle]);

  //   console.log(tableTitle);
  //   console.log(tableAccess[0]);

  //GET REAL WORK TABLE FOR DATASHEET
  const [tableData, settableData] = useState([]);
  useEffect(() => {
    if (tableAccess.length > 0) {
      axios({
        method: "get",
        url: `${baseUrl}/api/v1/workflow/table-row/?work=12`,
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          const data = res.data.results;
          settableData(data);
          settableDataDefault(data);
        })
        .catch((err) => console.log(err));
    }
  }, [tableAccess]);
  const changeHandler = (newValue, operations) => {
    for (const operation of operations) {
      console.log(operations);
      if (operation.type === "CREATE") {
        // console.log("cREATE", operation);
        axios({
          method: "post",
          url: `${baseUrl}/api/v1/workflow/table-row/?work=12`,
          headers: {
            Authorization: `Token ${token}`,
          },
          data: {
            work: 12,
          },
        })
          .then((res) => {
            // console.log(res)
            settableData([...tableData, res.data]);
            settableDataDefault([...tableData, res.data]);
          })
          .catch((err) => console.log(err));
      }
      if (operation.type === "UPDATE") {
        // console.log("UPDATE", operation);
        setactionTypes({ ...actionTypes, type: "UPDATE" });
        // setcheckState(true);
        if (
          selectedCells.min.col === selectedCells.max.col &&
          selectedCells.min.row !== selectedCells.max.row
        ) {
          const startIndex = selectedCells.min.row;
          const endIndex = selectedCells.max.row;
          for (let i = startIndex; i < endIndex + 1; i++) {
            const updatedData = newValue[i];
            console.log(updatedData);
            // console.log(updatedData);
            axios({
              method: "put",
              url: `${baseUrl}/api/v1/workflow/table-row/${updatedData.id}/?work=12`,
              headers: {
                Authorization: `Token ${token}`,
              },
              data: {
                ...updatedData,
              },
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => console.log(err));
          }
          settableData(newValue);
        } else {
          settableData(newValue);
        }
      }
    }
  };
  // console.log(actionTypes);
  // console.log(tableData, tableDataDefault);
  //FIND ROW AND COLUMNS WHEN WE BLUR A CELL
  const [changedCell, setchangedCell] = useState({
    col: "",
    row: "",
    colId: "",
  });
  const blurHandler = (props) => {
    // console.log(props.cell);
    setchangedCell(props.cell);
  };

  useEffect(() => {
    if (changedCell.col !== "" && changedCell.row !== "") {
      const updatedData = tableData[changedCell.row];
      // console.log(updatedData);
      axios({
        method: "put",
        url: `${baseUrl}/api/v1/workflow/table-row/${updatedData.id}/?work=12`,
        headers: {
          Authorization: `Token ${token}`,
        },
        data: {
          ...updatedData,
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }, [changedCell.row, changedCell.col]);
  //   console.log(tableData);
  //   console.log(dataSheetTitle);

  const [selectedCells, setselectedCells] = useState(null);
  const selectionChangeHandler = (e) => {
    console.log(e);
    setselectedCells(e.selection);
    // setactionTypes({ ...actionTypes, cellIndex: e.selection?.min.row });
    // setcheckState((prev) => !prev);
  };
  console.log(selectedCells);
  const activeChangeHandler = (e) => {
    console.log(e);
    // setcheckState((prev) => !prev);
    // console.log(tableData);
    // console.log(tableDataDefault);
  };
  console.log(checkState);

  useEffect(() => {
    // console.log(tableData);
    // console.log(tableDataDefault);
  }, [checkState]);

  // useEffect(()=>{
  //   if(actionTypes.type==="UPDATE")
  // },[])

  return (
    <div>
      <h1>Works Table</h1>
      {tableData.length > 0 ? (
        <DataSheetGrid
          columns={dataSheetTitle}
          value={tableData}
          onChange={changeHandler}
          onBlur={blurHandler}
          onSelectionChange={selectionChangeHandler}
          className="style-data-grid"
          onActiveCellChange={activeChangeHandler}
        />
      ) : (
        <p>Loading or no data</p>
      )}
      {/* <DataSheet /> */}
    </div>
  );
};

export default Works;
