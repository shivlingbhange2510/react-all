import React, { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import FileUpload from "./dragDrop";

const formatDate = (date) => {
  const test = new Date(date);
  return `${test.getDate()}/${test.getMonth() + 1}/${test.getFullYear()}`;
};

const mockPdfData = [
  {
    name: "pnline admin guide",
    date: formatDate(new Date()),
    size: "200kb",
    // product: "admin product",
    module: "*",
    product: -10,
    x: "shu",
    fileType: "pdf",
    id: 1,
  },
  {
    name: "online super admin guide",
    date: formatDate("10-12-2023"),
    size: "70kb",
    // product: "super admin product",
    module: "no module",
    product: 7,
    fileType: "doc",
    id: 2,
  },
  {
    name: "anline use guide file for test",
    date: formatDate("10-12-2020"),
    size: "70kb",
    // product: "super admin product",
    module: "no module",
    product: -1,
    fileType: "doc",
    id: 3,
  },
];

const AgGridPdf = () => {
  const [pdfData, setPdfData] = useState(mockPdfData);
  const fileInputRef = useRef(null);
  const editFileRef = useRef(null);
  const [editFileId, setEditFileId] = useState(null);
  const [fileData, setFileData] = useState(null);
  const gridApiRef = useRef(null);

  const onGridReady = (params) => {
    params.api.setSortModel([
      { colId: 'name', sort: 'asc' }
    ]);
  };
  const documentIconRender = (params) => {
    let iconComponent;
    let iconStyle = { marginTop: "12px" };
    const containerStyle = { display: "inline-flex", alignItems: "center" };

    

    switch (params.data.fileType) {
      case "pdf":
        iconStyle.color = "red";
        iconComponent = <PictureAsPdfRoundedIcon />;
        break;
      case "doc":
        iconStyle.color = "blue";
        iconComponent = <TextSnippetRoundedIcon />;
        break;
      default:
        iconComponent = <PictureAsPdfRoundedIcon />;
        break;
    }

    return (
      <div style={containerStyle}>
        <span style={iconStyle}>{iconComponent}</span>
        <span style={{ marginLeft: "5px" }}>
          {params.value + (params.data.x || " ")}
        </span>
      </div>
    );
  };

  const deleteRecord = (params) => {
    const filterData = pdfData.filter((item) => item.id !== params.data.id);
    setPdfData(filterData);
  };


  const downloadPdf =(file)=>{
    const type =  file.type.split("/").pop()
    let parsedType;
    console.log("type ios ", type);
    switch (type.toLowerCase()) {
      case "pdf":
        parsedType = "application/pdf";
        break;
      case "doc":
        parsedType = "application/msword";
        break;
      case "docx":
        parsedType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        break;
      case "xls":
        parsedType = "application/vnd.ms-excel";
        break;
      case "xlsx":
        parsedType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;
    }
   let blob = new Blob([file], { type: parsedType });
    let url = URL.createObjectURL(blob);

    window.open(url, "_blank");
    setTimeout(() => window.URL.revokeObjectURL(url), 10000);
  }
  const hadleSubmit = () => {
    const formData = new FormData();
    formData.append("file", fileData);
    console.log("FOrmdata pdf", formData);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value.name}`); // Logs the key and file name
    }
  };
  const handleFileEdit = (e) => {
    console.log("enside handleFileEdit -->params", e.target.files[0]);

    const file = e.target.files[0];
    // const formData = new FormData();
    // formData.append('file', formData);
    setFileData(file);
    if (file && editFileId !== null) {
      const updateFileDetails = {
        name: file.name,
        fileType: file.type.split("/").pop(),
        size: Math.floor(file.size / 1024) + "kb",
        date: formatDate(file.lastModifiedDate),
      };
      // const ind = pdfData.find((item)=>item.id===editFileId)
      const newPdfData = pdfData.map((item) => {
        if (item.id == editFileId) {
          return { ...updateFileDetails, id: item.id };
        }
        return item;
      });
      // ? {...updateFileDetails, id:editFileId} : item
      // pdfData[ind]=
      console.log(
        "after edit file ",
        file,
        "new array",
        newPdfData,
        "prevoiydata",
        pdfData
      );
      downloadPdf(file)
      // setPdfData()
      setPdfData([...newPdfData]);
      console.log("setPdfData", pdfData);
      setEditFileId(null);
    }
  };

  const editFile = (params) => {
    console.log("enside editFile -->params", params);
    setEditFileId(params.data.id);
    editFileRef.current.click();
  };

  const deleteAndEditIconRen = (params) => {
    return (
      <div>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => deleteRecord(params)}
        >
          {" "}
          <DeleteRoundedIcon />{" "}
        </span>
        <span style={{ cursor: "pointer" }} onClick={() => editFile(params)}>
          {" "}
          <ModeEditOutlinedIcon />{" "}
          <input
            ref={editFileRef}
            style={{ display: "none" }}
            onChange={handleFileEdit}
            type="file"
          />{" "}
        </span>
      </div>
    );
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    console.log("inside  handleFileChange--->", e.target.files);
    const file = e.target.files[0];
    setFileData(file)
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!validTypes.includes(file.type)) {
        console.error("Unsupported file type");
        return;
      }

      const newFileData = {
        name: file.name,
        fileType: file.type.split("/").pop(),
        size: Math.floor(file.size / 1024) + "kb",
        date: formatDate(file.lastModifiedDate),
        expiry: "NA",
        id: Math.random(),
      };

      setPdfData([...pdfData, newFileData]);
    }
  };

  const colDef = [
    {
      headerName: "User Data",
      field: "name",
      cellRenderer: documentIconRender,
      width: "300px",
    },
    { headerName: "Date Created", field: "date" },
    { headerName: "Product", field: "product" },
    { headerName: "Size", field: "size" },
    {
      headerName: "Action",
      field: "delete",
      cellRenderer: deleteAndEditIconRen,
    },
  ];

  const defaultColDef = {
    WrapText: true,
    floatingFilter: false,
    resizable: false,
    minuTabs: false,
    cellStyle: {
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <div>
      <div style={{ color: "blue" }}>
        <div className="ag-theme-alpine" style={{ height: "70vh" }}>
          <AgGridReact
            columnDefs={colDef}
            defaultColDef={defaultColDef}
            rowData={pdfData}
            // onGridReady={onGridReady}
            onGridReady={onGridReady}
          />
        </div>
        <div style={{ cursor: "pointer" }}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button onClick={handleIconClick}>
            <AddBoxRoundedIcon />
          </button>
          <h1> {pdfData?.length} </h1>
        </div>
      </div>

      <div className="drag-drop">
        <FileUpload />
      </div>
      <button onClick={hadleSubmit}>submit pdf</button>
      <button onClick={()=>downloadPdf(fileData)}>DownloadPdf pdf</button>

    </div>
  );
};

export default AgGridPdf;
