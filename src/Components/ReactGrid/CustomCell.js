import * as React from "react";
import {
  getCellProperty,
  getCharFromKeyCode,
  isAlphaNumericKey,
  Cell,
  CellTemplate,
  Compatible,
  Uncertain,
  UncertainCompatible,
  keyCodes,
} from "@silevis/reactgrid";

export class CustomCell {
  getCompatibleCell(uncertainCell) {
    let selectedValue;
    try {
      selectedValue = getCellProperty(uncertainCell, "selectedValue", "string");
    } catch {
      selectedValue = undefined;
    }
  }
  render(cell, isInEditMode, onCellChanged) {
    return <input />;
  }
}
