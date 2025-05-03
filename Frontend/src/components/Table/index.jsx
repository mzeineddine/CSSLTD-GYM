import "./table.css"
import { Link } from "react-router-dom";
const Table = (props) => {
    const {headers, data} = props;
    // console.log(headers);
    // console.log(data);
    const title = "Upcoming Appointment"
    let need_info=false;
    let table_top_margin = "2%"
    if(props.info){
        need_info=true
        table_top_margin = "0px"
    }
    return (
        <div className="table">
            {need_info &&
            <div className="info">
                <p>{title}</p>
                {/* <Link to="appointments">See All</Link> */}
                <div>
                    <Link to="appointments">See All</Link>
                </div>
                {/* <p>See All</p> */}
            </div>
            }
            <div className="headers" style={{"marginTop": table_top_margin}}>
                {
                    headers.map((header, index) => (
                        <div className="header" key={index}>
                            <p>{header}</p>
                        </div>
                    ))
                }
            </div>
            <div className="rows">
                {
                    data.map((row, rowIndex) => (
                        <div className="row" key={rowIndex}>
                            {
                                row.map((cell, cellIndex) => (
                                    <div className="cell" key={cellIndex}>
                                        <p>{cell}</p>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
export default Table