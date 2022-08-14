import { createSlice } from "@reduxjs/toolkit";

export const datasheetSlice = createSlice({
  name: "datasheetSlice",
  initialState: {
    selectVal: {
      value: "",
      rowId: "",
    },
    activeCellStore: "",
    tableDataStore: [],
  },
  reducers: {
    getSelectValue: (state, action) => {
      state.selectVal.value = action.payload.data.selectValue;
      state.selectVal.rowId = action.payload.data.rowId;
    },
    saveActiveCell: (state, action) => {
      state.tableDataStore = action.payload.tableData;
    },
    sendTableData: (state, action) => {
      state.tableDataStore = action.payload.tableData;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getSelectValue, saveActiveCell, sendTableData } =
  datasheetSlice.actions;

export default datasheetSlice.reducer;
