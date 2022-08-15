import React from "react";
import { addClassWhenNeeded, RendererProps } from "./utils";
import Select from "react-select";
const SelectRender = React.memo((props) => {
  addClassWhenNeeded(props);
  console.log(props);
  //   const options = props.value;
  //   console.log(options);
  const options = ["chocolate", "strawberry", "vanilla"];

  const selectHandler = (e) => {
    console.log(e.target.value);
    addClassWhenNeeded(props);

    // addClassWhenNeeded(e.target.value);
  };

  return (
    <select onChange={selectHandler} style={{ width: "100%", height: "100%" }}>
      {props.value.map((el, index) => (
        <option key={index} value={el.value}>
          {el.label}
        </option>
      ))}
    </select>
  );
});

export default SelectRender;
