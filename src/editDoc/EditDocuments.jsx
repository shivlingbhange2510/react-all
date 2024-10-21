import React, { useMemo, useState, useCallback, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";

const languages = ["India", "USA", "French", "Portuguese", "(other)"];
const cities = {
  India: ["Mumbai", "Delhi", "Pune"],
  USA: ["New York", "Los Angeles", "Chicago"],
  French: ["Paris", "Lyon", "Marseille"],
  Portuguese: ["Lisbon", "Porto", "Coimbra"],
  "(other)": ["Other City 1", "Other City 2"]
};

const ParentChildTable = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: 600, width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [childData, setChildData] = useState({});

  const isRowMaster = useCallback(() => true, []);

  const [columnDefs, setColumnDefs] = useState([
    { field: "name", cellRenderer: "agGroupCellRenderer" },
    { field: "account" },
    { field: "calls" },
    { field: "minutes", valueFormatter: (params) => `${params.value.toLocaleString()}m` },
  ]);

  const defaultColDef = useMemo(() => ({ flex: 1 }), []);

  const onLanguageChange = async (event) => {
    const selectedLanguage = event?.newValue;
    const newRowData = rowData.map((row) =>
      row?.id === event?.data?.id ? { ...row, language: selectedLanguage, city: '', dropdownVal: cities[selectedLanguage][0] } : row
    );
    setRowData(newRowData);
  };

  const showIcon = (params) => {
    return (<div> {params?.value} {!params?.value && <i className="fa fa-address-book" style={{ fontSize: '24px' }} />} </div>)
  };

  const AddRowButton = ({ api, parentNode }) => {
    const addRow = () => {
      const newCallRecord = { callId: '', direction: '', number: '', duration: '', switchCode: '', city: '' };
      const parentId = parentNode?.data?.id;
      const newChildData = { ...childData };

      if (!newChildData[parentId]) {
        newChildData[parentId] = [];
      }

      newChildData[parentId] = [...newChildData[parentId], newCallRecord];
      setChildData(newChildData);

      // Refresh the grid to show the new row
      api.refreshCells();
    };

    return <button onClick={addRow}>Add Row</button>;
  };

  const detailCellRendererParams = useMemo(() => ({
    detailGridOptions: {
      columnDefs: [
        { field: "callId" },
        { field: "direction" },
        {
          field: "number",
          minWidth: 150,
          cellEditor: "agRichSelectCellEditor",
          cellEditorParams: {
            values: languages,
          },
          onCellValueChanged: onLanguageChange,
        },
        {
          field: "duration",
          valueFormatter: (params) => `${params?.value?.toLocaleString()}s`
        },
        { field: "switchCode", minWidth: 150 },
        {
          field: "city",
          cellEditor: "agRichSelectCellEditor",
          cellEditorParams: (params) => {
            const language = params.data.language || "(other)";
            return {
              values: cities[language] || cities["(other)"]
            };
          },
          cellEditorPopup: true,  // To show dropdown as a popup
          cellEditorPopupPosition: 'under', // Position the popup under the cell
          cellRenderer: showIcon,
          onCellClicked: (params) => {
            params.api.startEditingCell({
              rowIndex: params.node.rowIndex,
              colKey: 'city'
            });
          }
        }
      ],
      defaultColDef: {
        flex: 1,
        editable: true,
      },
    },
    getDetailRowData: function (params) {
      const parentId = params.data.id;
      const callRecords = childData[parentId] || params.data.callRecords || [];
      params.successCallback(callRecords);
    },
    template: (params) => {
      return `
        <div style="height: 100%; position: relative;">
          <div ref="eDetailGrid" style="height: calc(100% - 40px);"></div>
          <div style="height: 40px; text-align: center;">
            <button id="addRowButton-${params.node.id}" style="height: 100%;">Add Row</button>
          </div>
        </div>
      `;
    },
    postProcessDetail: function (params) {
      document.querySelector(`#addRowButton-${params.node.id}`).addEventListener('click', () => {
        const newCallRecord = { callId: '', direction: '', number: '', duration: '', switchCode: '', city: '' };
        const parentId = params.data.id;
        const newChildData = { ...childData };

        if (!newChildData[parentId]) {
          newChildData[parentId] = [];
        }

        newChildData[parentId] = [...newChildData[parentId], newCallRecord];
        setChildData(newChildData);

        params.api.refreshCells();
      });
    }
  }), [childData, rowData]);

  const onGridReady = useCallback(() => {
    fetch("https://www.ag-grid.com/example-assets/master-detail-dynamic-data.json")
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    setTimeout(() => {
      params.api.getDisplayedRowAtIndex(1)?.setExpanded(true);
    }, 0);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-quartz"}>
        <AgGridReact
          rowData={rowData}
          masterDetail={true}
          isRowMaster={isRowMaster}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          detailCellRendererParams={detailCellRendererParams}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </div>
  );
};

export default ParentChildTable;

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<ParentChildTable />);
