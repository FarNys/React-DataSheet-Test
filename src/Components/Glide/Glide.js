import { DataEditor, GridCellKind } from "@glideapps/glide-data-grid";
import React, { useEffect, useState } from "react";

const Glide = () => {
  const [myData, setmyData] = useState([]);
  const [stateChange, setstateChange] = useState(true);
  useEffect(() => {
    const interval = () =>
      setInterval(() => {
        let emptyList = [];

        for (let i = 0; i < 100000; i++) {
          const x = {
            name: i.toString(),
            company: Math.random().toString(),
            email: "hinesfowler@buzzness.com",
            phone: "+1 (869) 405-3127",
          };
          emptyList.push(x);
        }
        console.log("INsIde");

        setmyData(emptyList);
        setstateChange((prev) => !prev);
      }, 5000);
    console.log("interval");

    interval();

    return () => {
      clearInterval(interval);
    };
  }, []);
  console.log(stateChange);

  const getContent = React.useCallback(
    (cell) => {
      if (myData.length > 0) {
        const [col, row] = cell;
        const dataRow = myData[row];
        // dumb but simple way to do this
        const indexes = ["name", "company", "email", "phone"];
        const d = dataRow[indexes[col]];
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          readonly: false,
          displayData: d,
          data: d,
        };
      }
      return [];
    },
    [myData.length, stateChange]
  );

  const onCellEdited = React.useCallback(
    (cell, newValue) => {
      if (newValue.kind !== GridCellKind.Text) {
        // we only have text cells, might as well just die here.
        return;
      }

      const indexes = ["name", "company", "email", "phone"];
      const [col, row] = cell;
      const key = indexes[col];
      myData[row][key] = newValue.data;
    },
    [myData.length]
  );

  return (
    <div>
      <h1>Glide App</h1>
      {myData.length > 0 && (
        <div style={{ width: "500px", height: "600px" }}>
          <DataEditor
            getCellContent={getContent}
            columns={columns}
            rows={myData.length}
            onCellEdited={onCellEdited}
          />
        </div>
      )}
    </div>
  );
};

export default Glide;

const columns = [
  {
    title: "Name",
    id: "name",
  },
  {
    title: "Company",
    id: "company",
  },
  {
    title: "Email",
    id: "email",
  },
  {
    title: "Phone",
    id: "phone",
  },
];
