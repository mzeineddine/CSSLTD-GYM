import "./dashboardStatCard.css"
const DashboardStatCard = (props) => {
    return(
        <div className="dashboardStatCard">
            <div className="card-icon">
                <props.icon style={{color: "blueviolet", width:"100%", heigh:"100%"}}/>
            </div>
            <div className="card-info">
                <p className="title">{props.title}</p>
                <p className="count">{props.count}</p>
            </div>
        </div>
    );
}
export default DashboardStatCard