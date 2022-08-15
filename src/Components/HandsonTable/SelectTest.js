import React from "react";
import { addClassWhenNeeded, RendererProps } from "./utils";

const SelectTest = (props) => {
  addClassWhenNeeded(props);
  console.log(props);

  return <div>SelectTest</div>;
};

export default SelectTest;
