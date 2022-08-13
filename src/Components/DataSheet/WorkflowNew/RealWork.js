import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl, token } from "../../../api/api";
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
import { selectColumn } from "../WorkflowNew/SelectComponents";

const workflowId = 3;
const workId = 1;

const RealWork = () => {
  const checkList = ["created_at", "updated_at", "id", "name"];
  const [columnsTitle, setcolumnsTitle] = useState(null);
  const [columnsType, setcolumnsType] = useState(null);
  //GET TITLE OF COLUMNS
  console.log(dateColumn);
  useEffect(() => {
    axios({
      method: "get",
      url: `http://192.168.7.65:5000/api/v1/workflow/workflow/${workflowId}/`,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        // console.log(res);
        const data = res.data;
        let titleObject = {};
        let titleType = {};
        for (let i = 1; i < 37; i++) {
          const col = data[`c${i}`];
          if (col) {
            //KEY-VALUE PAIR FOR TABLE HEADER TITLE
            const x = {
              [`c${i}`]: data[`c${i}`],
            };
            titleObject = { ...titleObject, ...x };
            setcolumnsTitle(titleObject);

            //KEY-VALUE PAIR FOR TABLE COLUMNS TYPE
            const y = {
              [`c${i}`]: data[`c${i}_type`],
            };
            titleType = { ...titleType, ...y };
            setcolumnsType(titleType);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);
  //GET TABLE ACCESS LIST BASED ON SELECTED STATION
  const [colAccess, setcolAccess] = useState(null);
  useEffect(() => {
    if (columnsTitle) {
      axios({
        method: "get",
        url: `${baseUrl}/api/v1/workflow/station/?workflow=${workflowId}`,
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          let accessObject = {};
          if (res.data.results.length > 0) {
            //GET FIRST DATA- LATER NEED TO FILTER AND SELECT OUT DESIRED DEPARTMENT AND ITS ACCESS
            const data = res.data.results[0];
            for (const key in columnsTitle) {
              accessObject = { ...accessObject, [key]: data[key] };
            }
            setcolAccess(accessObject);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [columnsTitle]);

  //CREATE DIFFERENT TYPE OF COLUMNS
  const [columnsData, setcolumnsData] = useState([]);
  const findColType = (item, key) => {
    console.log(item[key]);
    // if (item[key] === 1) {
    //   return selectColumn({});
    // }
    // if (item[key] === 2) {
    //   return floatColumn;
    // }
    // if (item[key] === 3) {
    //   return dateColumn;
    // }
    // if (item[key] === 4) {
    //   return checkboxColumn;
    // }
    return textColumn;
  };
  //BIND COLUMN TYPE TO KEYCOLUMN(PACKAGE FORM OF DATA)
  useEffect(() => {
    if (colAccess) {
      let emptyList = [];
      for (const key in columnsTitle) {
        const x = {
          ...keyColumn(key, findColType(columnsType, key)),
          title: columnsTitle[key],
        };
        emptyList.push(x);
      }
      setcolumnsData(emptyList);
    }
  }, [colAccess]);

  //TABLE DATA
  const [tableData, settableData] = useState([]);
  const [tableDataDefault, settableDataDefault] = useState([]);

  //GET INITIAL TABLE DATA
  useEffect(() => {
    if (columnsTitle) {
      axios({
        method: "get",
        url: `${baseUrl}/api/v1/workflow/table-row/?work=${workId}`,
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          const data = res.data.results;
          settableData(data);
          settableDataDefault(data);
        })
        .catch((err) => console.log(err));
    }
  }, [columnsTitle]);

  //CHANGE DATA GRID HANDLING
  const changeHandler = (newValue, operations) => {
    // setdata(newValue);
    for (const operation of operations) {
      if (operation.type === "CREATE") {
        axios({
          method: "post",
          url: `${baseUrl}/api/v1/workflow/table-row/?work=${workId}`,
          headers: {
            Authorization: `Token ${token}`,
          },
          data: {
            work: 1,
          },
        })
          .then((res) => {
            console.log(res);
            settableData([...tableData, res.data]);
            settableDataDefault([...tableData, res.data]);
          })
          .catch((err) => console.log(err));
      }

      if (operation.type === "UPDATE") {
        //TEST LOOP CHANGE TO GET CHANGED VALUE
        //IT WILL TRIGGER WITH EVERY TYPE WE SHOULD CHECK IF THE CHANGED VALUE IS CHECKBOX OR NOT!(ALSO FOR DATE)
        // const cloneValue = [...newValue];
        // for (let i = 0; i < cloneValue.length; i++) {
        //   const el = cloneValue[i];
        //   for (const key in el) {
        //     if (el[key] !== tableDataDefault[i][key]) {
        //       console.log(el);
        //       axios({
        //         method: "put",
        //         url: `${baseUrl}/api/v1/workflow/table-row/${el.id}/?work=1`,
        //         headers: {
        //           Authorization: `Token ${token}`,
        //         },
        //         data: {
        //           ...el,
        //         },
        //       })
        //         .then((res) => {
        //           console.log(res);
        //         })
        //         .catch((err) => console.log(err));
        //       settableDataDefault(newValue);
        //       settableData(newValue);
        //       return;
        //     }

        //     console.log(999);
        //   }
        // }

        ////////
        if (
          selectedCells &&
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
              url: `${baseUrl}/api/v1/workflow/table-row/${updatedData.id}/?work=${workId}`,
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

  //BLUE HANDLING(WHEN CELL UN FOCUS ON ENTER KEY OR AFTER EXIT FROM EDIT MODE)
  const [changedCell, setchangedCell] = useState({
    col: "",
    row: "",
    colId: "",
  });
  const blurHandler = (props) => {
    // console.log(props);
    setchangedCell(props.cell);
  };
  //GET US LAST SELECTED CELL INFO (WORK WITH MULTI CELLS SELECTION)
  const [selectedCells, setselectedCells] = useState(null);
  const selectionChangeHandler = (e) => {
    // console.log(e);
    setselectedCells(e.selection);
  };
  const activeChangeHandler = (e) => {
    console.log(e);
  };

  useEffect(() => {
    if (changedCell.col !== "" && changedCell.row !== "") {
      let updatedCell;
      // console.log(first)
      // if (colAccess[changedCell.colId] === 1) {
      //   updatedCell = tableData[changedCell.row][changedCell.colId];
      //   console.log(updatedCell);
      // }
      const updatedData = {
        ...tableData[changedCell.row],
        // [changedCell.colId]: updatedCell ? 1 : 0,
      };
      console.log(updatedData);
      // console.log(updatedData);
      axios({
        method: "put",
        url: `${baseUrl}/api/v1/workflow/table-row/${updatedData.id}/?work=${workId}`,

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
  return (
    <div>
      <h2>Real Work</h2>
      {colAccess && columnsData.length > 0 ? (
        <DataSheetGrid
          className="data-sheet-grid"
          onBlur={blurHandler}
          value={tableData}
          onChange={changeHandler}
          columns={columnsData}
          onSelectionChange={selectionChangeHandler}
          onActiveCellChange={activeChangeHandler}
          rowKey="id"
        />
      ) : (
        <p>Loading . . . Or No Data</p>
      )}
    </div>
  );
};

export default RealWork;
