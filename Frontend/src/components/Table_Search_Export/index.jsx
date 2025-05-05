import pdf_icon from "../../assets/icons/pdf_icon.svg"
import excel_icon from "../../assets/icons/xls_icon.svg"
import "./table_search_export.css"
const Table_Search_Export = () =>{
    return(
        <div className="table-search-export">
            <div className="search">
                <input type="search" placeholder="Search..."/>
            </div>
            <div className="buttons">
                <button><div className="button-icon"><img src={pdf_icon} alt="pdf"/></div> Download PDF</button>
                <button><div className="button-icon"><img src={excel_icon} alt="excel"/></div>Export to excel</button>
            </div>
        </div>
    );
}
export default Table_Search_Export