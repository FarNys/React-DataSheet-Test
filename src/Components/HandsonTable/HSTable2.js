import React, { useState } from "react";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.css";
import { registerAllModules } from "handsontable/registry";
import numbro from "numbro";
import languages from "numbro/dist/languages.min.js";
import Handsontable from "handsontable";
import HandCell from "./HandCell";

//CUSTOM CELL CREATION
// var MyEditor = Handsontable.editors.DateEditor.prototype.extend();
var MyEditor = Handsontable.editors.DateEditor.prototype.extend();
var MyTextEditor = Handsontable.editors.TextEditor.prototype.extend();

function customRenderer(
  instance,
  td,
  row,
  column,
  prop,
  value,
  cellProperties
) {
  // ...renderer logic
  console.log(instance);
  console.log(td);
  console.log(row);
  console.log(column);
  console.log(prop);
  console.log(value);
  console.log(cellProperties);
}

function customValidator(query, callback) {
  // ...validator logic
  callback(/* Pass `true` or `false` */);
}

// Register an alias
Handsontable.cellTypes.registerCellType("my.custom", {
  editor: MyEditor,
  renderer: customRenderer,
  // validator: customValidator,
  // You can add additional options to the cell type
  // based on Handsontable settings
  className: "my-cell",
  allowInvalid: true,
  // Or you can add custom properties which
  // will be accessible in `cellProperties`
  myCustomCellState: "complete",
});
function customTextValidator(query, callback) {
  // ...validator logic
  callback(/* Pass `true` or `false` */);
}

// Register an alias
Handsontable.cellTypes.registerCellType("my.custom.text", {
  editor: MyTextEditor,
  renderer: customRenderer,
  validator: customValidator,
  // You can add additional options to the cell type
  // based on Handsontable settings
  className: "my-cell",
  allowInvalid: true,
  // Or you can add custom properties which
  // will be accessible in `cellProperties`
  myCustomCellState: "complete",
});

//

registerAllModules();
numbro.registerLanguage(languages["ja-JP"]);
numbro.registerLanguage(languages["tr-TR"]);
const formatJP = {
  pattern: "0,0.00 $",
  culture: "ja-JP",
};
const data = [
  {
    car: "Mercedes A 160",
    year: 2017,
    price_usd: "7000",
    price_eur: 7000,
    c5: "Kalam",
  },
  {
    car: "Citroen C4 Coupe",
    year: 2018,
    price_usd: 8330,
    price_eur: 8330,
    available: true,
    myDate: "2022/12/30",
  },
  {
    car: "Audi A4 Avant",
    year: 2019,
    price_usd: 33900,
    price_eur: 33900,
    myDate: "01/01/1400",
  },
  { car: "Opel Astra", year: 2020, price_usd: 5000, price_eur: 5000 },
  { car: "BMW 320i Coupe", year: 2021, price_usd: 30500, price_eur: 30500 },
];

const afterChangeHandling = (e) => {
  console.log(e);
};

const HSTable2 = () => {
  const [tableData, settableData] = useState(data);
  const addRowHandler = (e) => {
    settableData([
      ...tableData,
      //   { car: "", year: "", price_usd: "", price_eur: "" },
      {},
    ]);
  };
  return (
    <div>
      <h1>HSTable2</h1>
      <button onClick={addRowHandler}>Add Row</button>
      <HotTable
        // language="fa-Ir"
        // layoutDirection="rtl"
        data={tableData}
        colHeaders={["a", "bb", "c3"]}
        // colHeaders={true}
        rowHeaders={true}
        width="600"
        height="300"
        afterChange={afterChangeHandling}
        columns={[
          { data: "car", manualColumnResize: true },
          { data: "price_usd", type: "numeric", numericFormat: { formatJP } },
          {
            type: "dropdown",
            data: "c5",
            allowInvalid: false,
            source: [
              "",
              "yellow",
              "red",
              "orange",
              "green",
              "blue",
              "gray",
              "black",
              "white",
            ],
            // readOnly: true,
          },
          {
            data: "available",
            type: "checkbox",
            className: "checkbox_manual",
            // isLTR: true,
          },
          {
            // data: "available",
            data: "myDate",
            type: "date",
            allowInvalid: false,
            // defaultDate: "01/01/1400",
            locale: "ar-AR",
            isRTL: true,
            datePickerConfig: {
              numberOfMonths: 1,
              firstDay: 0,
              //   i18n: {
              //     previousMonth: "Previous Month",
              //     nextMonth: "Next Month",
              //     months: [
              //       "فروردین",
              //       "اردیبهشت",
              //       "خرداد",
              //       "تیر",
              //       "مرداد",
              //       "شهریور",
              //       "مهر",
              //       "آبان",
              //       "آذر",
              //       "دی",
              //       "بهمن",
              //       "اسفند",
              //     ],
              //     weekdays: [
              //       "شنبه",
              //       "یکشنبه",
              //       "دوشنبه",
              //       "سه شنبه",
              //       "چهارشنبه",
              //       "پنج شنبه",
              //       "جمعه",
              //     ],
              //     weekdaysShort: ["شن", "یک", "دو", "سه", "چهار", "پنج", "جمعه"],
              //   },
            },
          },
          {
            // data: "available",
            type: "time",
          },
          {
            type: "my.custom",
          },
          // {
          //   type: "my.custom.text",
          // },
        ]}
      />
    </div>
  );
};

export default HSTable2;
