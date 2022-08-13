import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl, token } from "../../../api/api";
import SingleRowWorkflow from "./SingleRowWorkflow";

const WorkflowCreate = () => {
  const [formData, setformData] = useState(null);
  const [colNumber, setcolNumber] = useState(1);

  //ADD NEW ROW TO CURRENT TABLE(COL FOR WORKFLOW)
  const addRowHandler = () => {
    if (colNumber > 34) {
      setcolNumber(35);
    } else {
      setcolNumber((prev) => prev + 1);
    }
  };

  //REMOVE LAST ROW HERE AND ITS INPUT VALUES
  const removeRowHandler = () => {
    if (colNumber === 1) {
      setcolNumber(1);
    } else {
      //   const items = [
      //     `c${colNumber}`,
      //     `c${colNumber}_type`,
      //     `c${colNumber}_default`,
      //   ];
      for (const key in formData) {
        delete formData[`c${colNumber}`];
        delete formData[`c${colNumber}_type`];
        delete formData[`c${colNumber}_default`];
        // return;
      }
      setcolNumber((prev) => prev - 1);
      console.log(formData);
    }
  };

  //WORKFLOW NAME HANDLER
  const [wfName, setwfName] = useState(null);
  const wfNameHandler = (e) => {
    setwfName(e.target.value);
  };

  //SEND DATA TO CREATE WORKFLOW WITH NAME AND COLUMNS VALUE(C,C_TYPE,C_DEFAULT)
  const createWorkflow = () => {
    if (!wfName) {
      alert("Workflow Need A Name");
      return;
    }
    const sendData = { name: wfName, ...formData };
    axios({
      method: "post",
      url: `${baseUrl}/api/v1/workflow/workflow/`,
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        ...sendData,
      },
    })
      .then((res) => {
        console.log(res);
        setformData(null);
        setwfName(null);
        setcolNumber(1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>WorkflowCreate</h1>
      <button onClick={addRowHandler}>Add Row</button>
      <button onClick={removeRowHandler}>Remove Row</button>

      <div>
        <label>نام</label>
        <input
          name="name"
          placeholder="Name ..."
          onChange={wfNameHandler}
          value={wfName ? wfName : ""}
        />
      </div>
      <div>
        {Array.from(Array(colNumber), (e, i) => (
          <SingleRowWorkflow
            key={i}
            i={i}
            setformData={setformData}
            formData={formData}
          />
        ))}
      </div>
      <button onClick={createWorkflow}>Create WorkFlow</button>
    </div>
  );
};

export default WorkflowCreate;
