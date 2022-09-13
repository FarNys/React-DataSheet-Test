import React, { useCallback, useState } from "react";
import Handsontable from "handsontable";
import { HotTable, HotColumn } from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";
import "pikaday/css/pikaday.css";
import {
  drawCheckboxInRowHeaders,
  addClassesToRows,
  changeCheckboxCell,
  alignHeaders,
} from "./HooksCallbacks";
import { data } from "./constants";
import SelectRender from "./SelectRender";
import RendererComponent from "./RendererComponent";
import SelectHand from "./SelectHand";
import DateHand from "./DateHand";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// import { registerCellType, DateCellType } from "handsontable/cellTypes";
// import moment from "moment";
// require("moment/locale/ja");

// const hotData = Handsontable.helper.createSpreadsheetData(10, 5);
// const secondColumnSettings = {
//   title: "Second column header",
//   readOnly: true,
// };

const HSTable = () => {
  // moment.locale("ja");
  // registerCellType(DateCellType);
  const [dateState, setdateState] = useState("56");
  const afterChangeHandler = useCallback((e) => {
    console.log(e);
  }, []);
  return (
    <div style={{ padding: "10px" }}>
      <h1>Handson table</h1>
      <HotTable
        filter="true"
        manualRowMove="true"
        data={data}
        afterChange={afterChangeHandler}
        height={450}
        colWidths={[140, 126, 192, 100, 100, 80, 80, 110, 100, 100, 150]}
        colHeaders={[
          "Company name",
          "Country",
          "Name",
          "Sell date",
          "Order ID",
          "In stock",
          "Qty",
          "DD",
          "Custom Color",
          "Custom Date",
          // "Progress",
          // "Rating",
        ]}
        // dropdownMenu={true}
        hiddenColumns={true}
        contextMenu={true}
        multiColumnSorting={true}
        filters={true}
        rowHeaders={true}
        // afterGetColHeader={alignHeaders}
        // beforeRenderer={addClassesToRows}
        // afterGetRowHeader={drawCheckboxInRowHeaders}
        // afterOnCellMouseDown={changeCheckboxCell}
        licenseKey="non-commercial-and-evaluation"
      >
        <HotColumn data={1} />
        <HotColumn data={2} />
        <HotColumn data={3} />
        <HotColumn
          data={4}
          type="date"
          allowInvalid={false}
          // datePickerConfig={{ numberOfMonths: 3 }}
        />
        <HotColumn data={5} />
        <HotColumn
          source={["hi", "bye"]}
          data={8}
          type="dropdown"
          // className="hotCol_dropdown_manual"
        />
        <HotColumn data={6} type="checkbox" className="htCenter" />
        <HotColumn data={7} type="numeric" />
        <HotColumn data={9}>
          <ScoreRenderer hot-renderer />
        </HotColumn>
        <HotColumn data={10}>
          <DateRender hot-renderer dateState={dateState} />
        </HotColumn>
        {/* <HotColumn>
          <DatePicker hot-renderer />
        </HotColumn> */}
        {/* <HotColumn data={8} type="dropdown">
          <RendererComponent hot-renderer />
        </HotColumn> */}
        {/* <HotColumn data={8}>
          <SelectHand hot-renderer />
        </HotColumn> */}
        {/* <HotColumn data={9}>
          <DateHand hot-renderer />
        </HotColumn> */}

        {/* <SelectRender hot-renderer /> */}
        {/* </HotColumn> */}
      </HotTable>
    </div>
  );
};

export default HSTable;

// a renderer component
const ScoreRenderer = (props) => {
  const { value } = props;
  const color = value > 60 ? "#2ECC40" : "#FF4136";
  return (
    <React.Fragment>
      <span style={{ color }}>{value}</span>
    </React.Fragment>
  );
};

//Date Rendered Component
const DateRender = (props, x) => {
  const [getDate, setgetDate] = useState(null);
  const changeDateHandler = (e) => {
    const newDate = new DateObject(e.toDate()).format().toString();
    setgetDate(newDate);
    console.log(newDate);
  };
  console.log(getDate);
  console.log(props);
  return (
    // <DatePicker
    //   style={{
    //     flex: 1,
    //     alignSelf: "stretch",
    //     width: "100%",
    //     // height: "200px",
    //   }}
    //   calendar={persian}
    //   locale={persian_fa}
    //   calendarPosition="bottom-right"
    //   onChange={changeDateHandler}
    //   portal={document.body}
    //   onCopy={(e) => e.stopPropagation()}
    //   onCut={(e) => e.stopPropagation()}
    //   onPaste={(e) => e.stopPropagation()}
    //   onPointerDown={(e) => e.stopPropagation()}
    // />
    <input type="date" onPointerDown={(e) => e.stopPropagation()} />
  );
};
