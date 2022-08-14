import React, { useState } from "react";
import Select from "react-select";
//CUSTOME COMPONENT
const SelectComponent = React.memo(
  ({ active, focus, rowData, setRowData, stopEditing, columnData }) => {
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
        value={columnData.find(({ value }) => value === rowData) ?? null}
        options={columnData}
      />
    );
  }
);

//COPY PASTED FROM DOCUMENTS
export const selectColumn = (options) => ({
  component: SelectComponent,
  columnData: options,
  disableKeys: true,
  keepFocus: true,
  disabled: options.disabled,
  deleteValue: () => null,
  copyValue: ({ rowData }) =>
    options.find((choice) => choice.value === rowData)?.label,
  pasteValue: ({ value }) =>
    options.find((choice) => choice.label === value)?.value ?? null,
});
