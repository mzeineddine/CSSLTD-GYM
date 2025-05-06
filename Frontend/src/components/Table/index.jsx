import { useEffect, useState } from "react";
import "./table.css"
import { Link } from "react-router-dom";
import { DataTable, exportCSV, exportJSON, exportTXT } from "simple-datatables";
import "simple-datatables/dist/style.css";

const Table = (props) => {
    let {headers, data, title, info, searchable,paging,exportable,visible} = props;
    // console.log(headers);
    // console.log(data);
    if(visible){
        data = data.slice(0, visible)
    }
    const [exportFormat, setExportFormat] = useState('csv');
    const [table, setTable] = useState(null)
    useEffect(() => {
        const tableElement = document.getElementById('export-table');
        if (tableElement && typeof DataTable !== 'undefined') {
            setTable(new DataTable("#export-table",  {
                paging: paging,
                perPage: 5,
                perPageSelect: [5, 10, 20, 50],
                firstLast: true, 
                nextPrev: true, 
                searchable: searchable,       
                sensitivity: "base",
                searchQuerySeparator: " ",
                sortable: true,
                numeric: true,
                caseFirst: "false",
                ignorePunctuation: true,
                data:{"headings":headers, "data":data},
                // caption: "Appointment",
            }))
        }
    }, []);

    const exportData = () => {
        console.log("export")
        if (!table) return;
        const options = { download: true, filename: 'frameworks_export' };
        console.log(exportFormat)
        switch (exportFormat) {
        case 'csv':
            exportCSV(table, options);
            break;
        case 'json':
            exportJSON(table, options);
            break;
        // case 'pdf':
        //     exportPDF(table, options);
        //     break;
        case 'txt':
            exportTXT(table, options);
            break;
        default:
            break;
        }
    };
    return (
        <div>
            <div className="overflow-x-auto bg-gray-50 rounded-2xl">
                {info &&
                    <div className="info flex justify-between rounded-t-2xl items-center bg-gray-50 px-1">
                        <p className="h-full inline justify-content-center align-items-center">{title}</p>
                        <div>
                            <Link to="appointments">See All</Link>
                        </div>
                        {/* <p>See All</p> */}
                    </div>
                }
                {exportable&&
                    <div className="mt-1 flex justify-end gap-1 items-center mx-1">
                        <select 
                            className="p-0.25 border rounded"
                            value={exportFormat}
                            onChange={(e) => {
                                setExportFormat(e.target.value)
                            }}
                        >
                            <option value="csv" className="p-12">CSV</option>
                            <option value="json" className="p-12">JSON</option>
                            {/* <option value="pdf" className="p-12">PDF</option> */}
                            <option value="txt" className="p-12">TXT</option>
                        </select>
                        <div className="min-w-10 max-w-full">
                            <button
                                onClick={exportData}
                                className="p-0.25 rounded w-full"
                            >
                                Export
                            </button>
                        </div>
                    </div>
                }
                <div className="mx-1 my-0">
                    <table id="export-table" className="min-w-full text-sm text-left text-gray-500 py-0"></table>
                </div>
            </div>
        </div>
        
        // <div className="table">
        //     {need_info &&
        //     <div className="info">
        //         <p>{title}</p>
        //         {/* <Link to="appointments">See All</Link> */}
        //         <div>
        //             <Link to="appointments">See All</Link>
        //         </div>
        //         {/* <p>See All</p> */}
        //     </div>
        //     }
        //     <div className="headers" style={{"marginTop": table_top_margin}}>
        //         {
        //             headers.map((header, index) => (
        //                 <div className="header" key={index}>
        //                     <p>{header}</p>
        //                 </div>
        //             ))
        //         }
        //     </div>
        //     <div className="rows">
        //         {
        //             data.map((row, rowIndex) => (
        //                 <div className="row" key={rowIndex}>
        //                     {
        //                         row.map((cell, cellIndex) => (
        //                             <div className="cell" key={cellIndex}>
        //                                 <p>{cell}</p>
        //                             </div>
        //                         ))
        //                     }
        //                 </div>
        //             ))
        //         }
        //     </div>
        // </div>
    );
}
export default Table