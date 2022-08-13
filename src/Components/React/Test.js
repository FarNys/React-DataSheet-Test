import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../store/testSlice";
const Test = () => {
  const dispatch = useDispatch();
  const getValue = useSelector((state) => state.testSlice.value);
  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increase</button> {getValue}
      <button onClick={() => dispatch(decrement())}>Decrease</button>
    </div>
  );
};

export default Test;
