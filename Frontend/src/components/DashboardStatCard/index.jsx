import "./dashboardStatCard.css"
const DashboardStatCard = (props) => {
    return(
        <div className="dashboardStatCard">
            <div className="card-icon">
                <img src={props.icon} alt="card icon" />
            </div>
            <div className="card-info">
                <p className="title">{props.title}</p>
                <p className="count">{props.count}</p>
            </div>
        </div>
    );
}
export default DashboardStatCard