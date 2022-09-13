import * as React from "react";
import {
  CellTemplate,
  Cell,
  Compatible,
  Uncertain,
  UncertainCompatible,
  isNavigationKey,
  getCellProperty,
  isAlphaNumericKey,
  keyCodes,
} from "@silevis/reactgrid";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export class FaridDate {
  getCompatibleCell(uncertainCell) {
    const text = getCellProperty(uncertainCell, "text", "string");
    const value = parseFloat(text);
    return { ...uncertainCell, text, value };
  }

  handleKeyDown(cell, keyCode, ctrl, shift, alt) {
    if (!ctrl && !alt && isAlphaNumericKey(keyCode))
      return { cell, enableEditMode: true };
    return {
      cell,
      enableEditMode:
        keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER,
    };
  }

  update(cell, cellToMerge) {
    // console.log(cell, cellToMerge);
    return this.getCompatibleCell({ ...cell, text: cellToMerge.text });
  }

  render(cell, isInEditMode, onCellChanged) {
    // console.log(cell);
    if (!isInEditMode) {
      <div>{cell.text}</div>;
    }
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
        onChange={(e) => {
          console.log(e);
          onCellChanged(
            this.getCompatibleCell({
              ...cell,
              text: new DateObject(e.toDate()).format().toString(),
            }),
            true
          );
        }}
        value={cell.text ? new DateObject(cell.text) : null}
        portalTarget={document.body}
        portal={document.body}
        onCopy={(e) => e.stopPropagation()}
        onCut={(e) => e.stopPropagation()}
        onPaste={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode))
            e.stopPropagation();
        }}
      />
    );
  }
}
