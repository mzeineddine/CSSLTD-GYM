// import { useContext, useEffect, useState } from "react";
// import "./table.css";
// import { Link } from "react-router-dom";
// import { DataTable, exportCSV, exportJSON, exportTXT } from "simple-datatables";
// import "simple-datatables/dist/style.css";
// import { Members_Context } from "../../context/Members_Context.jsx";
// import { Staffs_Context } from "../../context/Staffs_Context.jsx";
// import { Coaches_Context } from "../../context/Coaches_Context.jsx";
// import { Expenses_Context } from "../../context/Expenses_Context.jsx";
// import { PaymentAccounts_Context } from "../../context/PaymentAccounts_Context.jsx";
// import PositionedMenu from "../Acttion_Menu/index.jsx";

// const Table = (props) => {
//   const { members, update_members } = useContext(Members_Context);
//   const { staffs, update_staffs } = useContext(Staffs_Context);
//   const { coaches, update_coaches } = useContext(Coaches_Context);
//   const { expenses, update_expenses } = useContext(Expenses_Context);
//   const { paymentAccounts, update_paymentAccounts } = useContext(PaymentAccounts_Context);

//   let { title, info, searchable, paging, exportable, visible } = props;
//   let headers = [];
//   let id = "export-table"
//   if(Object.prototype.hasOwnProperty.call(props, "id")){
//     id = props.id
//   }

//   const [exportFormat, setExportFormat] = useState("csv");
//   const [table, setTable] = useState(null);
//   // let [data_name, setDataName] = useState(null);
//   let data;
//   useEffect(() => {
//     if (props.title == "member") {
//       data = members;
//     } else if (props.title == "staff") {
//       data = staffs;
//     } else if (props.title == "coach") {
//       data = coaches;
//     } else if (props.title == "expense") {
//       data = expenses;
//     } else if (props.title == "paymentAccounts") {
//       data = paymentAccounts;
//     }
//     if (!data) {
//       if (props.title == "member") {
//         update_members();
//       } else if (props.title == "staff") {
//         update_staffs();
//       } else if (props.title == "coach") {
//         update_coaches();
//       } else if (props.title == "expense") {
//         update_expenses();
//       } else if (props.title == "paymentAccounts") {
//         update_paymentAccounts();
//       }
//     } else {
//       data.forEach((data) => {
//         delete data.password;
//         delete data.is_deleted;
//       });
//       if (visible) {
//         data = data.slice(0, visible);
//       }
//       const tableElement = document.getElementById(id);
//       headers = Object.keys(data[0]);
//       headers = props.actions? [...headers, "action"]: headers
//       // const data = data.map(Object.values)
//       const values = data.map(Object.values)
//       values.forEach(value => {
//         props.actions ? value.push(<PositionedMenu />): value
//       });


//       if (data.length > 0 && tableElement && typeof DataTable !== "undefined") {
//         const tableInstance = new DataTable("#"+id, {
//           destroy: true,
//           paging: paging,
//           perPage: 5,
//           perPageSelect: [5, 10, 20, 50],
//           firstLast: true,
//           nextPrev: true,
//           searchable: searchable,
//           sensitivity: "base",
//           searchQuerySeparator: " ",
//           sortable: true,
//           numeric: true,
//           caseFirst: "false",
//           fixedColumns: true,
//           data: {
//             headings: headers,
//             data: values
//           },
//         });

//         setTable(tableInstance);

//         return () => {
//           tableInstance.destroy(); // Clean up old instance
//         };
//       }
//     }
//   }, [members, staffs, coaches, expenses, paymentAccounts]);

//   const exportData = () => {
//     if (!table) return;
//     const options = { download: true, filename: "frameworks_export" };
//     switch (exportFormat) {
//       case "csv":
//         exportCSV(table, options);
//         break;
//       case "json":
//         exportJSON(table, options);
//         break;
//       // case 'pdf':
//       //     exportPDF(table, options);
//       //     break;
//       case "txt":
//         exportTXT(table, options);
//         break;
//       default:
//         break;
//     }
//   };
//   return (
//     <div>
//       <div className="overflow-x-auto bg-gray-50 rounded-2xl">
//         {info && (
//           <div className="info flex justify-between rounded-t-2xl items-center bg-gray-50 px-1">
//             <p className="h-full inline justify-content-center align-items-center">
//               {title}
//             </p>
//             <div>
//               <Link to="appointments">See All</Link>
//             </div>
//             {/* <p>See All</p> */}
//           </div>
//         )}
//         {exportable && (
//           <div className="mt-1 flex justify-end gap-1 items-center mx-1">
//             <select
//               className="p-0.25 border rounded"
//               value={exportFormat}
//               onChange={(e) => {
//                 setExportFormat(e.target.value);
//               }}
//             >
//               <option value="csv" className="p-12">
//                 CSV
//               </option>
//               <option value="json" className="p-12">
//                 JSON
//               </option>
//               {/* <option value="pdf" className="p-12">PDF</option> */}
//               <option value="txt" className="p-12">
//                 TXT
//               </option>
//             </select>
//             <div className="min-w-10 max-w-full">
//               <button onClick={exportData} className="p-0.25 rounded w-full">
//                 Export
//               </button>
//             </div>
//           </div>
//         )}
//         <div className="mx-1 my-0">
//           <table
//             id={id}
//             className="min-w-full text-sm text-left text-gray-500 py-0"
//           >
//             <tr>
//               {
//                 headers.map((value, index) => {
//                   <th key={index}>{value}</th>
//               })}
//             </tr>
//           </table>
//         </div>
//       </div>
//     </div>

//     // <div className="table">
//     //     {need_info &&
//     //     <div className="info">
//     //         <p>{title}</p>
//     //         {/* <Link to="appointments">See All</Link> */}
//     //         <div>
//     //             <Link to="appointments">See All</Link>
//     //         </div>
//     //         {/* <p>See All</p> */}
//     //     </div>
//     //     }
//     //     <div className="headers" style={{"marginTop": table_top_margin}}>
//     //         {
//     //             headers.map((header, index) => (
//     //                 <div className="header" key={index}>
//     //                     <p>{header}</p>
//     //                 </div>
//     //             ))
//     //         }
//     //     </div>
//     //     <div className="rows">
//     //         {
//     //             data.map((row, rowIndex) => (
//     //                 <div className="row" key={rowIndex}>
//     //                     {
//     //                         row.map((cell, cellIndex) => (
//     //                             <div className="cell" key={cellIndex}>
//     //                                 <p>{cell}</p>
//     //                             </div>
//     //                         ))
//     //                     }
//     //                 </div>
//     //             ))
//     //         }
//     //     </div>
//     // </div>
//   );
// };
// export default Table;
