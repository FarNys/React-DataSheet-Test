import React from "react";
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
import DatePicker from "react-multi-date-picker";

// const hotData = Handsontable.helper.createSpreadsheetData(10, 5);
// const secondColumnSettings = {
//   title: "Second column header",
//   readOnly: true,
// };

const afterChangeHandler = (e) => {
  console.log(e);
};

const HSTable = () => {
  return (
    <div>
      <h1>Handson table</h1>
      <HotTable
        data={data}
        afterChange={afterChangeHandler}
        height={450}
        colWidths={[140, 126, 192, 100, 100, 80, 80, 110, 100]}
        colHeaders={[
          "Company name",
          "Country",
          "Name",
          "Sell date",
          "Order ID",
          "In stock",
          "Qty",
          "DD",
          "mANUAL sELECT",
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
        manualRowMove={true}
        licenseKey="non-commercial-and-evaluation"
      >
        <HotColumn data={1} />
        <HotColumn data={2} />
        <HotColumn data={3} />
        <HotColumn data={4} type="date" allowInvalid={false} />
        <HotColumn data={5} />
        <HotColumn
          source={["hi", "bye"]}
          data={8}
          type="dropdown"
          // className="hotCol_dropdown_manual"
        />
        <HotColumn data={6} type="checkbox" className="htCenter" />
        <HotColumn data={7} type="numeric" />
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
