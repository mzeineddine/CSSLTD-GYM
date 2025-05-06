const Calendar_Header = () => {
    return(
        <div className="calendar-header m-[2%] rounded-2xl flex justify-between items-center gap-2 bg-gray-50">
            <div className="view-option flex justify-center items-center">
                <button className="week">Week</button>
                <button className="month">Month</button>
                <button className="day">Day</button>
            </div>  
            <div className="calendar-navigator flex justify-center w-[50%] items-center">
                <button>before</button>
                <div className="current-month-year">
                    <p>Month</p>
                    <p>Year</p>
                </div>
                <button>after</button>
            </div>
        </div>
    );
}
export default Calendar_Header