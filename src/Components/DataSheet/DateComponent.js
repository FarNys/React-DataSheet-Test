import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useSelector } from "react-redux";
const timing = new Date();
const DateComponent = React.memo(
  ({ active, focus, rowData, setRowData, stopEditing, columnData }) => {
    // console.log(rowData);
    // const getActiveCell = useSelector(
    //   (state) => state.datasheetSlice.activeCellStore
    // );
    // const getTableData = useSelector(
    //   (state) => state.datasheetSlice.tableDataStore
    // );
    // console.log(getActiveCell, getTableData);
    const [newValue, setnewValue] = useState();
    // console.log(columnData);
    const changeDateHandler = (props) => {
      // console.log(props);
      setnewValue(props.toDate().toString());
      setRowData(props.toDate().toString());
    };
    //HANDLER WHEN WE CLICK ON NEW DATE
    const handleClose = (props) => {
      setnewValue(props.toDate().toString());
      setRowData(props.toDate().toString());
    };
    const propsHandler = (props) => {
      console.log("props handler");
      console.log(props);
    };
    return (
      <div style={{ direction: "rtl" }}>
        {/* <p> {value?.toDate?.().toString()}</p> */}
        <DatePicker
          style={{
            flex: 1,
            alignSelf: "stretch",
            width: "100%",
            // height: "200px",
          }}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          onChange={() => changeDateHandler}
          onPropsChange={propsHandler}
          // onClose={handleClose}
          onFocusedDateChange={handleClose}
          // value={rowData?.day}
          value={rowData ? new Date(rowData) : null}
          // portalTarget={document.body}
          portal={document.body}
        />{" "}
      </div>
    );
  }
);

export const customeDateComponent = (props) => ({
  component: DateComponent,
  columnData: props,
  // item: item,
  // key: key,
  // tableData: tableData,
  disableKeys: true,
  keepFocus: false,
  // disabled: options.disabled,
  deleteValue: () => null,
  copyValue: ({ rowData }) => props.find((choice) => choice.value === rowData),
  pasteValue: ({ value }) =>
    props.find((choice) => choice.label === value) ?? null,
});

export default DateComponent;
