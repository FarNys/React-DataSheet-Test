import React from "react";

const FaridTextArea = (props) => {
  console.log(props);
  if (!props.focus) {
    return (
      <p className="p_table" rows={3}>
        {props.rowData}
      </p>
    );
  }
  return (
    <input
      value={props.rowData || ""}
      onChange={(e) => props.setRowData(e.target.value)}
    />
  );
};

export default FaridTextArea;

export const customeFaridTextAria = (props) => ({
  component: FaridTextArea,
  columnData: props,
  // item: item,
  // key: key,
  // tableData: tableData,
  disableKeys: true,
  keepFocus: false,
  // disabled: options.disabled,
  deleteValue: () => null,
  copyValue: ({ rowData }) => props.find((choice) => choice.value === rowData),
  pasteValue: ({ value }) =>
    props.find((choice) => choice.label === value) ?? null,
});
