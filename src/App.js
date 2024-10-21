import './App.css';
import React, {useState, useCallback} from 'react';
import axios from 'axios';
import AgGridPdf from './ag-grid/AgGridPdf';
// import axios from 'axios';
import Dropzone, { useDropzone } from "react-dropzone";
import classNames from "classnames";
// import React, {} from 'react'
// import {useDropzone} from 'react-dropzone'
import StopWatch from './component/stopwatch/StopWatch';
import {ContextAPI} from './context-api/ContextAPI'
function App() {

  const [file, setFile] = useState()
  // const [file, setFile]=useState({})
  // 
  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    console.log('FFFFFFFFF', formData);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // };
    // axios.post(url, formData, config).then((response) => {
    //   console.log(response.data);
    // });

  }


  const habdleFile=(e)=>{
const file = e.target.files[0];
console.log("file");
setFile(file)

  }
  const hanleSubFile= async()=>{
    const obj = {
      name:'shiv',
      no:9987655,
      clg:'sggs',
      marks:78
    }
    const formData=  new FormData();
    formData.append('file', file);

    for(const key in obj){
      formData.append(key, obj[key])
    }
    // formData.append('name', 'shiv')
    // formData.append('name', 'shiv')

    console.log('FormData', formData);
    const url=`http://localhost:4000/upload`
    try {

      await fetch(url, {
        method:'POST',
        body: formData
      }).then((res)=>res.json())
      .then((res2)=>{
        console.log("res is from API", res2);
      })
    //   await axios.post(`http://localhost:4000/upload`, formData)
    // .then((res)=>{
    //   console.log("resdarat", res.data);
    // })
    } catch (error) {
        console.log("error", error);
    }
    
  }
  return (
    <div className="App">
      {/* <MyDropzone/>
        <input type='file'  onChange={habdleFile} />
        <button onClick={hanleSubFile}>submbit filr</button>
        <hr/>
        <AgGridPdf/> */}
        <ContextAPI/>
        {/* <StopWatch/> */}

    </div>
  );
}

export default App;



// import React from "react";
// import { Icon, List, ListItem } from "@wfp/ui";
// import { iconUpload } from "@wfp/icons";



function MyDropzone() {
  const [data, setData]=useState({})
  const onDrop = useCallback(acceptedFiles1 => {
    // console.log("acceptedFiles", acceptedFiles);
    console.log("FILE1S", acceptedFiles1[0]);
    setData(acceptedFiles1[0])
    // Do something with the files
  }, [])
  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    onDrop
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }

      <div>
        {JSON.stringify(data)}
      </div>
    </div>
  )
}