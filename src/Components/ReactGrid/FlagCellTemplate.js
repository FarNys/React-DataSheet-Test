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
// import "./flag-cell-style.scss";

// export interface FlagCell extends Cell {
//   type: "flag";
//   text: string;
// }

export class FlagCellTemplate {
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
    return this.getCompatibleCell({ ...cell, text: cellToMerge.text });
  }

  render(cell, isInEditMode, onCellChanged) {
    // console.log(onCellChanged);
    if (!isInEditMode) {
      const flagISO = cell.text.toLowerCase(); // ISO 3166-1, 2/3 letters
      const flagURL = `https://restcountries.eu/data/${flagISO}.svg`;
      return (
        <div
          className="rg-flag-wrapper"
          style={
            {
              // backgroundImage: 'url("' + flagURL + '"), url("https://upload.wikimedia.org/wikipedia/commons/0/04/Nuvola_unknown_flag.svg")',
            }
          }
        >
          {cell.text}
        </div>
      );
    }
    return (
      <input
        ref={(input) => {
          input && input.focus();
        }}
        defaultValue={cell.text}
        onChange={(e) =>
          onCellChanged(
            this.getCompatibleCell({ ...cell, text: e.currentTarget.value }),
            false
          )
        }
        onCopy={(e) => e.stopPropagation()}
        onCut={(e) => e.stopPropagation()}
        onPaste={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onBlur={(e) =>
          onCellChanged(
            this.getCompatibleCell({ ...cell, text: e.currentTarget.value }),
            e.view?.event?.keyCode !== keyCodes.ESCAPE
          )
        }
        onKeyDown={(e) => {
          if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode))
            e.stopPropagation();
          if (e.keyCode === keyCodes.ESCAPE) e.currentTarget.value = cell.text; // reset
        }}
      />
    );
  }
}
