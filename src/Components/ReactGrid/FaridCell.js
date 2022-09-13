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

export class FaridCell {
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
    console.log(cellToMerge);
    return this.getCompatibleCell({ ...cell, text: cellToMerge.text });
  }

  render(cell, isInEditMode, onCellChanged) {
    // console.log(cell);

    if (!isInEditMode) {
      return (
        <div
          style={{
            backgroundColor: `rgba(0,0,255,${cell.text / 100})`,
            width: "100%",
            height: "100%",
          }}
        >
          {cell.list.find((el) => (el === cell.text ? cell.text : null))}
        </div>
      );
    }

    return (
      <select
        style={{ width: "100%" }}
        onCopy={(e) => e.stopPropagation()}
        onCut={(e) => e.stopPropagation()}
        onPaste={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode))
            e.stopPropagation();
        }}
        onChange={(e) => {
          // console.log(e.currentTarget.value);
          const findValue = cell.list.find((el) => el === e.target.value);
          console.log(findValue);
          onCellChanged(
            this.getCompatibleCell({
              ...cell,
              text: findValue ? findValue : null,
            }),
            true
          );
        }}
      >
        <option></option>
        {cell.list.map((el, index) => (
          <option key={`${el}-${index}`}>{el}</option>
        ))}
      </select>
      // />
    );
  }
}
