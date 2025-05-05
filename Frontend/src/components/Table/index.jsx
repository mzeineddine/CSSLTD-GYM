import { useEffect, useState } from "react";
import "./table.css"
import { Link } from "react-router-dom";
import { DataTable, exportCSV, exportJSON, exportTXT } from "simple-datatables";
import "simple-datatables/dist/style.css";

const Table = (props) => {
    const {headers, data} = props;
    // // console.log(headers);
    // // console.log(data);
    // const title = "Upcoming Appointment"
    // let need_info=false;
    // let table_top_margin = "2%"
    // if(props.info){
    //     need_info=true
    //     table_top_margin = "0px"
    // }
    const [exportFormat, setExportFormat] = useState('csv');
    let table;

    useEffect(() => {
        const tableElement = document.getElementById('export-table');
        if (tableElement && typeof DataTable !== 'undefined') {
            table = new DataTable("#export-table");
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
            <div className="flex gap-2 justify-center items-center p-px">
                <select 
                    value={exportFormat}
                    onChange={(e) => {
                        setExportFormat(e.target.value)
                    }}
                    className="h-full border rounded flex-1"
                >
                    <option value="csv" className="p-12">CSV</option>
                    <option value="json" className="p-12">JSON</option>
                    <option value="pdf" className="p-12">PDF</option>
                    <option value="txt" className="p-12">TXT</option>
                </select>
                <div className="flex-3 p-0">
                    <button
                        onClick={exportData}
                        className="py-0 rounded w-full"
                    >
                        Export
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table id="export-table" className="min-w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {
                        headers.map((value, index) => (
                            <th key={index}>{value}</th>
                        ))
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-100">
                            {row.map((cell_data, index) => (
                                <td key={i+index}>{cell_data}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
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