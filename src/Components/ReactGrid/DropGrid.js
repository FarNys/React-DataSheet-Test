import * as React from "react";

// NOTE: all modules imported below may be imported from '@silevis/reactgrid'
// import { getCellProperty } from "../Functions/getCellProperty";
// import { getCharFromKeyCode } from "./getCharFromKeyCode";
// import { isAlphaNumericKey } from "./keyCodeCheckings";
// import {
//   Cell,
//   CellTemplate,
//   Compatible,
//   Uncertain,
//   UncertainCompatible,
// } from "../Model/PublicModel";
// import { keyCodes } from "../Functions/keyCodes";

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

import Select, { OptionProps, MenuProps } from "react-select";
import { FC } from "react";

// export type OptionType = {
//   label: string;
//   value: string;
// };

// export interface DropdownCell extends Cell {
//   type: "dropdown";
//   selectedValue?: string;
//   values: OptionType[];
//   isDisabled?: boolean;
//   isOpen?: boolean;
//   inputValue?: string;
// }

export class DropdownCellTemplate {
  getCompatibleCell(uncertainCell) {
    let selectedValue;
    try {
      selectedValue = getCellProperty(uncertainCell, "selectedValue", "string");
    } catch {
      selectedValue = undefined;
    }
    const values = getCellProperty(uncertainCell, "values", "object");
    const value = selectedValue ? parseFloat(selectedValue) : NaN;
    let isDisabled = true;
    try {
      isDisabled = getCellProperty(uncertainCell, "isDisabled", "boolean");
    } catch {
      isDisabled = false;
    }
    let inputValue;
    try {
      inputValue = getCellProperty(uncertainCell, "inputValue", "string");
    } catch {
      inputValue = undefined;
    }
    let isOpen;
    try {
      isOpen = getCellProperty(uncertainCell, "isOpen", "boolean");
    } catch {
      isOpen = false;
    }
    const text = selectedValue || "";
    return {
      ...uncertainCell,
      selectedValue,
      text,
      value,
      values,
      isDisabled,
      isOpen,
      inputValue,
    };
  }

  update(cell, cellToMerge) {
    return this.getCompatibleCell({
      ...cell,
      selectedValue: cellToMerge.selectedValue,
      isOpen: cellToMerge.isOpen,
      inputValue: cellToMerge.inputValue,
    });
  }

  getClassName(cell, isInEditMode) {
    const isOpen = cell.isOpen ? "open" : "closed";
    return `${cell.className ? cell.className : ""}${isOpen}`;
  }

  handleKeyDown(cell, keyCode, ctrl, shift, alt) {
    if ((keyCode === keyCodes.SPACE || keyCode === keyCodes.ENTER) && !shift) {
      return {
        cell: this.getCompatibleCell({ ...cell, isOpen: !cell.isOpen }),
        enableEditMode: false,
      };
    }
    const char = getCharFromKeyCode(keyCode, shift);
    if (!ctrl && !alt && isAlphaNumericKey(keyCode))
      return {
        cell: this.getCompatibleCell({
          ...cell,
          inputValue: shift ? char : char.toLowerCase(),
          isOpen: !cell.isOpen,
        }),
        enableEditMode: false,
      };
    return { cell, enableEditMode: false };
  }

  render(cell, isInEditMode, onCellChanged) {
    return (
      <DropdownInput
        onCellChanged={(cell) =>
          onCellChanged(this.getCompatibleCell(cell), true)
        }
        cell={cell}
      />
    );
  }
}

// interface DIProps {
//   onCellChanged: (...args: any[]) => void;
//   cell: Record<string, any>;
// }
console.log(getCellProperty);

const DropdownInput = ({ onCellChanged, cell }) => {
  const selectRef = React.useRef(null);

  const [inputValue, setInputValue] = React.useState(cell.inputValue);

  React.useEffect(() => {
    if (cell.isOpen && selectRef.current) {
      selectRef.current.focus();
      setInputValue(cell.inputValue);
    }
  }, [cell.isOpen, cell.inputValue]);

  return (
    <div
      style={{ width: "100%" }}
      onPointerDown={(e) => onCellChanged({ ...cell, isOpen: true })}
    >
      <Select
        {...(cell.inputValue && {
          inputValue,
          defaultInputValue: inputValue,
          onInputChange: (e) => setInputValue(e),
        })}
        isSearchable={true}
        ref={selectRef}
        {...(cell.isOpen !== undefined && { menuIsOpen: cell.isOpen })}
        onMenuClose={() =>
          onCellChanged({
            ...cell,
            isOpen: !cell.isOpen,
            inputValue: undefined,
          })
        }
        onMenuOpen={() => onCellChanged({ ...cell, isOpen: true })}
        onChange={(e) =>
          onCellChanged({
            ...cell,
            selectedValue: e.value,
            isOpen: false,
            inputValue: undefined,
          })
        }
        blurInputOnSelect={true}
        defaultValue={cell.values.find(
          (val) => val.value === cell.selectedValue
        )}
        // isDisabled={cell.isDisabled}
        options={cell.values}
        onKeyDown={(e) => e.stopPropagation()}
        components={{
          Option: CustomOption,
          Menu: CustomMenu,
        }}
        styles={{
          container: (provided) => ({
            ...provided,
            width: "100%",
            height: "100%",
          }),
          control: (provided) => ({
            ...provided,
            border: "none",
            borderColor: "1px solid red",
            minHeight: "25px",
            background: "transparent",
            boxShadow: "none",
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
            paddingTop: "0px",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            padding: "0px 4px",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "inherit",
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            marginTop: "4px",
            marginBottom: "4px",
          }),
          input: (provided) => ({
            ...provided,
            padding: 0,
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "0 8px",
          }),
        }}
      />
    </div>
  );
};

const CustomOption = ({ innerProps, label, isSelected, isFocused }) => (
  <div
    {...innerProps}
    onPointerDown={(e) => e.stopPropagation()}
    className={`rg-dropdown-option${isSelected ? " selected" : ""}${
      isFocused ? " focused" : ""
    }`}
  >
    {label}
  </div>
);

const CustomMenu = ({ innerProps, children }) => (
  <div {...innerProps} className="rg-dropdown-menu">
    {children}
  </div>
);
