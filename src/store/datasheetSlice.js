import { createSlice } from "@reduxjs/toolkit";

export const datasheetSlice = createSlice({
  name: "datasheetSlice",
  initialState: {
    selectVal: {
      value: "",
      rowId: "",
    },
  },
  reducers: {
    getSelectValue: (state, action) => {
      state.selectVal.value = action.payload.data.selectValue;
      state.selectVal.rowId = action.payload.data.rowId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getSelectValue } = datasheetSlice.actions;

export default datasheetSlice.reducer;
