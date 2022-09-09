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
    console.log(cell, cellToMerge);
    return this.getCompatibleCell({ ...cell, text: cellToMerge.text });
  }

  render(cell, isInEditMode, onCellChanged) {
    console.log(cell);
    if (!isInEditMode) {
      const flagISO = cell.text.toLowerCase(); // ISO 3166-1, 2/3 letters
      const flagURL = `https://restcountries.eu/data/${flagISO}.svg`;
      const alternativeURL = `https://upload.wikimedia.org/wikipedia/commons/0/04/Nuvola_unknown_flag.svg`;
      return (
        // <div
        //   className="rg-flag-wrapper"
        //   style={{ backgroundImage: `url(${flagURL}), url(${alternativeURL})` }}
        // />
        <div
          style={{
            backgroundColor: `rgba(0,0,255,${cell.text / 100})`,
            width: "100%",
            height: "100%",
          }}
        >
          {cell.text}
        </div>
      );
    }
    return (
      // <input
      //   ref={(input) => {
      //     input && input.focus();
      //   }}
      //   type="number"
      //   defaultValue={cell.text}
      // onChange={(e) => {
      //   console.log(e.currentTarget.value);
      //   onCellChanged(
      //     this.getCompatibleCell({ ...cell, text: e.currentTarget.value }),
      //     false
      //   );
      // }}
      // onCopy={(e) => e.stopPropagation()}
      // onCut={(e) => e.stopPropagation()}
      // onPaste={(e) => e.stopPropagation()}
      // onPointerDown={(e) => e.stopPropagation()}
      // onKeyDown={(e) => {
      //   if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode))
      //     e.stopPropagation();
      // }}
      <select
        onCopy={(e) => e.stopPropagation()}
        onCut={(e) => e.stopPropagation()}
        onPaste={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode))
            e.stopPropagation();
        }}
        onChange={(e) => {
          console.log(e.currentTarget.value);
          onCellChanged(
            this.getCompatibleCell({ ...cell, text: e.currentTarget.value }),
            false
          );
        }}
      >
        <option>a</option>
        <option>b</option>
        <option>c</option>
      </select>
      // />
    );
  }
}
