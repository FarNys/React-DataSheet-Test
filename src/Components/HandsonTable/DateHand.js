import React from "react";
import "handsontable/dist/handsontable.min.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DateHand = (prop) => {
  console.log(prop);
  const changeDateHandler = (props) => {
    console.log(props);
    prop.value = props;
  };
  console.log(prop);
  // the available renderer-related props are:
  // - `row` (row index)
  // - `col` (column index)
  // - `prop` (column property name)
  // - `TD` (the HTML cell element)
  // - `cellProperties` (the `cellProperties` object for the edited cell)
  return (
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
      // onPropsChange={propsHandler}
      // onClose={handleClose}
      // onFocusedDateChange={handleClose}
      // value={rowData?.day}
      value={prop.value ? new Date(prop.value) : null}
      // portalTarget={document.body}
      portal={document.body}
    />
  );
};

export default DateHand;
