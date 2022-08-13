import React from "react";

const SingleRowWorkflow = ({ i, setformData, formData }) => {
  //WORKFLOW C VALUES HANDLER
  const changeHandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <form>
      <input
        name={`c${i + 1}`}
        placeholder="name"
        onChange={changeHandler}
        // value={formData ? formData[`c${i + 1}`] : ""}
      />
      <select name={`c${i + 1}_type`} onChange={changeHandler}>
        <option value={0}>text</option>
        <option value={1}>dropdown</option>
        <option value={2}>number</option>
        <option value={3}>date</option>
        <option value={4}>checkbox</option>
      </select>
      <input
        name={`c${i + 1}_default`}
        placeholder="default"
        onChange={changeHandler}
      />
    </form>
  );
};

export default SingleRowWorkflow;
