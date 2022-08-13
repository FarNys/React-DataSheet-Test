import React, { useState } from "react";
import Select from "react-select";
//CUSTOME COMPONENT
const SelectComponent = ({
  active,
  focus,
  rowData,
  setRowData,
  stopEditing,
  columnData,
}) => {
  const [defaultOptions, setdefaultOptions] = useState([
    { value: "chocolate", label: "Chocolate", rowId: 1 },
    { value: "strawberry", label: "Strawberry", rowId: 2 },
    { value: "vanilla", label: "Vanilla", rowId: 3 },
  ]);
  return (
    <Select
      styles={{
        container: (provided) => ({
          ...provided,
          flex: 1,
          alignSelf: "stretch",
          pointerEvents: focus ? undefined : "none",
        }),
        /*...*/
        indicatorsContainer: (provided) => ({
          ...provided,
          opacity: active ? 1 : 0,
        }),
        placeholder: (provided) => ({
          ...provided,
          opacity: active ? 1 : 0,
        }),
      }}
      menuPortalTarget={document.body}
      onChange={({ value }) => {
        setRowData(value);
        setTimeout(stopEditing, 0);
      }}
      value={defaultOptions.find(({ value }) => value === rowData) ?? null}
      options={defaultOptions}
    />
  );
};

//COPY PASTED FROM DOCUMENTS
export const selectColumn = (options) => ({
  component: SelectComponent,
  columnData: options,
  disableKeys: true,
  keepFocus: true,
  disabled: options.disabled,
  deleteValue: () => null,
  copyValue: ({ rowData }) =>
    options.choices.find((choice) => choice.value === rowData)?.label,
  pasteValue: ({ value }) =>
    options.choices.find((choice) => choice.label === value)?.value ?? null,
});
