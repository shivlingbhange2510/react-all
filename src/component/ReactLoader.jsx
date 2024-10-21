// // import React, { useState } from 'react';
// // import { createRoot } from 'react-dom/client';
// // import { AgGridReact } from '@ag-grid-community/react'; // React Grid Logic
// // import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
// // // import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

// // // import { ModuleRegistry } from '@ag-grid-community/core';
// // // import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
// // // ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

// // // Create new GridExample component
// // const App = () => {
// //   // Row Data: The data to be displayed.
// //   const [rowData, setRowData] = useState([
// //     { make: "Tesla", model: "Model Y", price: 64950, electric: true },
// //     { make: "Ford", model: "F-Series", price: 33850, electric: false },
// //     { make: "Toyota", model: "Corolla", price: 29600, electric: false },
// //     { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
// //     { make: 'Fiat', model: '500', price: 15774, electric: false },
// //     { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
// //   ]);
  
// //   // Column Definitions: Defines & controls grid columns.
// //   const [colDefs, setColDefs] = useState([
// //     { field: "make" },
// //     { field: "model" },
// //     { field: "price" },
// //     { field: "electric" }
// //   ]);

// //   // Container: Defines the grid's theme & dimensions.
// //   return (
// //     <div className={"ag-theme-quartz"} style={{ width: '100%', height: '100%' }}>
// //       <AgGridReact rowData={rowData} columnDefs={colDefs}
// //       />
// //     </div>
// //   );
// // }
// import {Counter} from './counter/Counter'
// import {ReactjsColor} from './component/ReactColor'
// import { useState } from 'react'
// import {ReactLoader} from './component/ReactLoader'
// const App = ()=>{
//   const [theme, setTheme] = useState('')
//   return(
//     <div style={{backgroundColor: theme}}>
//       <h1> learn react</h1>
//       <ReactLoader/>
//       <Counter  initialCount={0}/>
//       <ReactjsColor setTheme={setTheme}/>
//     </div>
//   )
// }

// export default App;

import React, { useEffect, useState } from 'react';
import {AgGridReact} from 'ag-grid-react';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import ClipLoader from 'react-spinners/ClipLoader'; // Import a spinner for demonstration
import helper from '../services/helper'
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { GridReadyEvent, GridApi, ColumnApi, ColDef } from "ag-grid-community";
const ReactLoader = () => {
  const [data, setData] = useState(null);
  const [rowData, setRowData]= useState([]);
  const { promiseInProgress } = usePromiseTracker(); // Get loading status
  const apiRef = React.useRef({
    grid: undefined,
    column: undefined,
  });
  // useEffect(() => {
  //   console.log("promiseInProgress", promiseInProgress);
  //   // Use trackPromise to track the promise returned by fetchData
  //   // const fetchData = () =>
  //     // fetch('https://jsonplaceholder.typicode.com/posts/1')
  //     //   .then((response) => response.json())
  //     //   .then((json) => setData(json));

  //   trackPromise(helper.getData())
  //   .then((res)=>{
  //     console.log("res", res);
  //   });
  // }, []); // Empty array as dependency to run only on mount

  useEffect(()=>{
    helper.taskData()
    .then((res)=>{
      setRowData(res)
      console.log("res2************", res);
    });
  },[])
const st = {
  margin: "auto",
  width: "50%",
  // border: "3px solid green",
  padding: "10px",
}

const columnDefs= [
  {headerName: "Make", field: "title"},
  {headerName: "Model", field: "body"},
  {headerName: "Price", field: "id"}
]

const onGridReady = (params) => {
  apiRef.current.grid = params.api;
  apiRef.current.column = params.columnApi;
};

  return (
    <div>
       <AgGridReact
          rowSelection="multiple"
          suppressRowClickSelection
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={rowData}
        />
      {promiseInProgress ? (
        // Display a spinner while the promise is in progress
        // <ClipLoader size={35} color={'#123abc'} loading={true} />
        <div className="loader-container">
        <ClipLoader  color="#36d7b7" />

        </div>

      ) : (
        // Display data when loading is complete
        <div>
          <h2>Post Title: {data?.title}</h2>
          <p>Post Body: {data?.body}</p>
        </div>
      )}
    </div>
  );
};

export default ReactLoader;
