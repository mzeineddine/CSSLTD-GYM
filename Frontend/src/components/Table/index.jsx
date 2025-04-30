import "./table.css"

const Table = (props) => {
    const {headers, data} = props;
    console.log(headers);
    console.log(data);
    return (
        <div className="table">
            <div className="headers">
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