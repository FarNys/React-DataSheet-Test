import { combineReducers } from "redux";
import datasheetSlice from "./datasheetSlice";
import testSlice from "./testSlice";

export const allReducers = combineReducers({
  testSlice: testSlice,
  datasheetSlice: datasheetSlice,
});
