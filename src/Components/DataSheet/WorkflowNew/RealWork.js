import React, { useEffect, useState } from "react";

import axios from "axios";
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
  AddRowsComponentProps,
} from "react-datasheet-grid";
import { useDispatch, useSelector } from "react-redux";
import { selectColumn } from "../WorkflowNew/SelectComponents";
import { customeDateComponent } from "../DateComponent";
import {
  getTableData,
  saveActiveCell,
  sendTableData,
} from "../../../store/datasheetSlice";

const workflowId = 7;
const workId = 4;

const RealWork = () => {
  const dispatch = useDispatch();
  const myData = useSelector((state) => state.datasheetSlice);
  const checkList = ["created_at", "updated_at", "id", "name"];
  const [columnsTitle, setcolumnsTitle] = useState(null);
  const [columnsType, setcolumnsType] = useState(null);
  const [columnsTypeCheckbox, setcolumnsTypeCheckbox] = useState([]);
  const [columnsTypeDate, setcolumnsTypeDate] = useState([]);
  const [columnsDefault, setcolumnsDefault] = useState(null);
  console.log(myData);

  //GET TITLE OF COLUMNS
  // console.log(dateColumn);
  useEffect(() => {
    axios({
      method: "get",
      url: `http://192.168.7.65:5000/api/v1/workflow/workflow/${workflowId}/`,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        const data = res.data;
        let titleObject = {};
        let titleType = {};
        let titleDefault = {};
        let emptyListCheckbox = [];
        let emptyListDate = [];
        for (let i = 1; i < 37; i++) {
          const col = data[`c${i}`];
          if (col) {
            //KEY-VALUE PAIR FOR TABLE HEADER TITLE
            const x = {
              [`c${i}`]: data[`c${i}`],
            };
            titleObject = { ...titleObject, ...x };

            //KEY-VALUE PAIR FOR TABLE COLUMNS TYPE
            const y = {
              [`c${i}`]: data[`c${i}_type`],
            };
            titleType = { ...titleType, ...y };

            //KEY-VALUE PAIR FOR TABLE DEFAULT COLUMN DATA FOR EVERY CELL
            const z = {
              [`c${i}`]: data[`c${i}_default`],
            };
            titleDefault = { ...titleDefault, ...z };
          }
        }
        for (const key in titleType) {
          if (titleType[key] === 4) {
            emptyListCheckbox.push(key);
          }
        }
        for (const key in titleType) {
          if (titleType[key] === 3) {
            emptyListDate.push(key);
          }
        }
        setcolumnsTitle(titleObject);
        setcolumnsType(titleType);
        setcolumnsDefault(titleDefault);
        setcolumnsTypeCheckbox(emptyListCheckbox);
        setcolumnsTypeDate(emptyListDate);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(columnsTypeCheckbox);
  console.log(columnsTypeDate);
  console.log(columnsDefault);
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
  const findColType = (item, key, data, cell) => {
    console.log(data, cell);
    if (item[key] === 1) {
      let emptyList = [];
      const defaultListValue = columnsDefault[key]?.includes(",")
        ? columnsDefault[key].split(",")
        : null;
      if (defaultListValue) {
        defaultListValue.forEach((el) => {
          const x = {
            label: el.slice(0, 1).toUpperCase() + el.slice(1, el.length),
            value: el,
          };
          emptyList.push(x);
        });
      }
      console.log(emptyList);
      return selectColumn(emptyList);
    }
    if (item[key] === 2) {
      return floatColumn;
    }
    if (item[key] === 3) {
      console.log(data);
      const cloneTableData = [...tableData];
      console.log(cell);
      const cloneactiveCell = { ...activeCell };
      return customeDateComponent({
        item,
        key,
        tableData: cloneTableData,
        activeCell: cloneactiveCell,
      });
    }
    if (item[key] === 4) {
      return checkboxColumn;
    }
    return textColumn;
  };
  //BIND COLUMN TYPE TO KEYCOLUMN(PACKAGE FORM OF DATA)
  useEffect(() => {
    if (colAccess) {
      let emptyList = [];
      for (const key in columnsTitle) {
        const x = {
          ...keyColumn(
            key,
            findColType(columnsType, key, tableData, activeCell)
          ),
          title: columnsTitle[key],
          cellClassName: columnsType[key] === 3 ? "test_test" : "",
          // maxWidth: 25,
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
    const fetchData = async () => {
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
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [columnsTitle]);

  //CHANGE DATA GRID HANDLING
  const changeHandler = (newValue, operations) => {
    // setdata(newValue);
    console.log(operations);
    for (const operation of operations) {
      if (operation.type === "CREATE") {
        axios({
          method: "post",
          url: `${baseUrl}/api/v1/workflow/table-row/?work=${workId}`,
          headers: {
            Authorization: `Token ${token}`,
          },
          data: {
            work: workId,
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
        console.log("UPDATED !!!");

        // console.log(operation, activeCell);
        const rowTarget = operation.fromRowIndex;
        //LOOP TO GET ALL CHECKBOX COLUMNS AND THEN CHECK IF THE UPDATED DTA IS CHECKBOX OR NOT- IF YES THEN GET NEW VALUE AND SEND IT TO SERVER AND CLOSE LOOP IMMEDIATELY
        for (let i = 0; i < columnsTypeCheckbox.length; i++) {
          const el = columnsTypeCheckbox[i];
          if (tableData[rowTarget][el] !== newValue[rowTarget][el]) {
            console.log("SUCCESSfUl");
            let updatedData = newValue[rowTarget];
            // for (const key in updatedData) {
            //   if (updatedData[key] === false) {
            //     updatedData[key] = "false";
            //   } else {
            //     updatedData[key] = "true";
            //   }
            // }
            updatedData[el] = newValue[rowTarget][el].toString();
            console.log(updatedData[el], typeof updatedData[el]);
            console.log(tableData);
            console.log(newValue);
            // console.log(updatedData);
            // newValue[rowTarget][el] =
            //   newValue[rowTarget][el] === "false" ? false : true;
            if (newValue[rowTarget][el] === "false") {
              newValue[rowTarget][el] = false;
            }
            if (newValue[rowTarget][el] === "true") {
              newValue[rowTarget][el] = true;
            }
            console.log(updatedData[el]);
            console.log(newValue[rowTarget][el]);
            updatedData = {
              ...updatedData,
              [el]: newValue[rowTarget][el].toString(),
            };
            console.log(updatedData);
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
                // settableData(newValue);
              })
              .catch((err) => console.log(err));
          }
          settableData(newValue);
          break;
        }
        console.log(columnsTypeDate);
        //LOOP TO GET ALL DATE COLUMNS AND THEN CHECK IF THE UPDATED DTA IS CHECKBOX OR NOT- IF YES THEN GET NEW VALUE AND SEND IT TO SERVER AND CLOSE LOOP IMMEDIATELY
        for (let i = 0; i < columnsTypeDate.length; i++) {
          const el = columnsTypeDate[i];
          if (tableData[rowTarget][el] !== newValue[rowTarget][el]) {
            console.log("DATE NEW COMPONENT");
            let updatedData = newValue[rowTarget];
            console.log(updatedData);
            for (const key in updatedData) {
              if (updatedData[key] === false) {
                updatedData[key] = "false";
              }
              if (updatedData[key] === true) {
                updatedData[key] = "true";
              }
            }
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
                console.log("HI ALL HI aLl");
                console.log(res);
                // settableData(newValue);
              })
              .catch((err) => console.log(err));
          }
          settableData(newValue);
          break;
        }
        //   updatedData[el] = newValue[rowTarget][el].toString();
        //   console.log(updatedData[el], typeof updatedData[el]);
        //   console.log(tableData);
        //   console.log(newValue);
        //   // console.log(updatedData);
        //   // newValue[rowTarget][el] =
        //   //   newValue[rowTarget][el] === "false" ? false : true;
        //   if (newValue[rowTarget][el] === "false") {
        //     newValue[rowTarget][el] = false;
        //   }
        //   if (newValue[rowTarget][el] === "true") {
        //     newValue[rowTarget][el] = true;
        //   }
        //   console.log(updatedData[el]);
        //   console.log(newValue[rowTarget][el]);
        //   updatedData = {
        //     ...updatedData,
        //     [el]: newValue[rowTarget][el].toString(),
        //   };
        //   console.log(updatedData);
        //   axios({
        //     method: "put",
        //     url: `${baseUrl}/api/v1/workflow/table-row/${updatedData.id}/?work=${workId}`,
        //     headers: {
        //       Authorization: `Token ${token}`,
        //     },
        //     data: {
        //       ...updatedData,
        //     },
        //   })
        //     .then((res) => {
        //       console.log(res);
        //       // settableData(newValue);
        //     })
        //     .catch((err) => console.log(err));
        // }
        // settableData(newValue);
        // return;

        // const oldData=tableData[rowTarget][]

        // if(activeCell.colId)
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
            for (const key in updatedData) {
              if (updatedData[key] === false) {
                updatedData[key] = "false";
              }
              if (updatedData[key] === true) {
                updatedData[key] = "true";
              }
            }
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
          console.log(newValue);
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
  console.log(tableData);
  //STATE OF CURRENT CELL TO CHECK FOR CONDITION OF CHECKBOX UPDATE AND THEN UPDATE IN USEEFFECT
  const [activeCell, setactiveCell] = useState(null);
  const activeChangeHandler = (e) => {
    console.log(e);
    console.log(tableData);
    setactiveCell(e);
    console.log(tableData);
    dispatch(saveActiveCell({ data: e, tableData: tableData }));
    console.log("ACTIVE CHANGED");

    //FIND SELECTED ROW BASED ON SELECTED ROW
  };

  //GET CURENT ACTIVE CELL TO EXPLOIT SELECTED ROW AND SEND TROUGH REDUX TO DATE COMPONENT TO UPDATE AFTER FOCUS OUT IN DATE COMPONENT
  useEffect(() => {
    if (activeCell) {
      dispatch(sendTableData({ tableData: tableData }));
    }
  }, [activeCell?.cell?.col, activeCell?.col?.row]);

  // useEffect(() => {
  //   if (activeCell && columnsType) {
  //     // console.log(tableData);
  //     let updatedData;
  //     console.log(activeCell);
  //     console.log(columnsType);
  //     if (columnsType[activeCell?.cell?.colId] === 4) {
  //       console.log("Checkbox Selected");
  //       updatedData = tableData[activeCell.cell.row];

  //       for (const key in updatedData) {
  //         if (updatedData[key] === false) {
  //           updatedData[key] = "false";
  //           console.log("fals ing");
  //         }
  //         if (updatedData[key] === true) {
  //           updatedData[key] = "true";
  //           console.log("true ing");
  //         }
  //       }
  //       console.log(tableData);
  //       console.log(updatedData);
  //       axios({
  //         method: "put",
  //         url: `${baseUrl}/api/v1/workflow/table-row/${updatedData.id}/?work=${workId}`,
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //         data: {
  //           ...updatedData,
  //         },
  //       })
  //         .then((res) => {
  //           console.log(res);
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }
  // }, [activeCell?.cell?.row, activeCell?.cell?.colId, columnsType]);

  useEffect(() => {
    if (changedCell.col !== "" && changedCell.row !== "") {
      // let updatedCell;
      // if (colAccess[changedCell.colId] === 4) {
      //   updatedCell = tableData[changedCell.row][changedCell.colId];
      //   console.log(updatedCell);
      // }
      const updatedData = {
        ...tableData[changedCell.row],
        // [changedCell.colId]: updatedCell ? 1 : 0,
      };
      for (const key in updatedData) {
        if (updatedData[key] === false) {
          updatedData[key] = "false";
        }
        if (updatedData[key] === true) {
          updatedData[key] = "true";
        }
      }
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

  // useEffect(() => {
  //   return () => {
  //     console.log("RETURN DATA");
  //     for (let i = 0; i < tableData.length; i++) {
  //       const updatedData = tableData[i];
  //       axios({
  //         method: "put",
  //         url: `${baseUrl}/api/v1/workflow/table-row/${updatedData.id}/?work=${workId}`,
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //         data: {
  //           ...updatedData,
  //         },
  //       })
  //         .then((res) => console.log(res))
  //         .catch((err) => console.log(err));
  //     }
  //   };
  // }, [columnsType]);
  const focusHandler = (e) => {
    console.log(e);
  };
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
          onFocus={focusHandler}
          rowKey="id"
          disableExpandSelection={true}
          disableContextMenu={true}
          // addRowsComponent={addRowHandler}
        />
      ) : (
        <p>Loading . . . Or No Data</p>
      )}
    </div>
  );
};

export default RealWork;
