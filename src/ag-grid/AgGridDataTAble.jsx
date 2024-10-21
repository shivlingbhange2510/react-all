import React from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";

function AgGridDataTAble(props) {
  const [rowData, setRowData] = useState([
    { make: "Honda", model: "Accord", price: "£12,500" },
    { make: "Toyota", model: "Camry", price: "£10,000" },
    { make: "Mercedes Benz", model: "C class", price: "£22,800" },
  ]);

  const column = [
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price" },
  ];
  return (
    <div>
      <AgGridReact rowData={rowData}
      columnDefs={column}
      />
    </div>
  );
}

export default AgGridDataTAble;
