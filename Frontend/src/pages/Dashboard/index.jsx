import DashboardStatCard from "../../components/DashboardStatCard";
import "./dashboard.css";
import icon from "../../assets/icons/member_icon.svg";
import { Link } from "react-router-dom";
import Graph from "../../components/Graph";
import PiChart from "../../components/PiChart";
import Table1 from "../../components/Table/tables";
const Dashboard = () => {
  const graph_data = [
    { month: "Jan", left: 4000, new: 2400 },
    { month: "Feb", left: 3000, new: 1398 },
    { month: "Mar", left: 2000, new: 9800 },
    { month: "Apr", left: 2780, new: 3908 },
    { month: "May", left: 1890, new: 4800 },
    { month: "Jun", left: 2390, new: 3800 },
    { month: "Jul", left: 3490, new: 4300 },
  ];
  const graph_title = "Members";
  const key_x = "months";
  const lines_data = [
    {
      key: "new",
      legend: "new members",
      color: "green",
    },
    {
      key: "left",
      legend: "leaving members",
      color: "red",
    },
  ];

  const chart_title = "Members by Age Group";
  const chart_data = [
    { name: "0-12", value: 400 },
    { name: "13-29", value: 300 },
    { name: "30-59", value: 200 },
    { name: "+60", value: 100 },
  ];
  const chart_key = "value";
  const chart_colors = ["red", "yellow", "green", "blue"];
  return (
    <div className="dashboard">
      <div className="dashboardStatCards">
        <DashboardStatCard icon={icon} title="Patients" count="270" />
        <DashboardStatCard icon={icon} title="Patients" count="270" />
        <DashboardStatCard icon={icon} title="Patients" count="270" />
      </div>
      <div className="appointment-table overflow-auto">
        <div className="info flex justify-between rounded-t-2xl items-center bg-gray-50 px-1">
          <p className="h-full inline justify-content-center align-items-center">
            {"Member"}
          </p>
          <div>
            <Link to={"../member"}>See All</Link>
          </div>
        </div>
        <Table1
          title="member"
          info={true}
          searchable={true}
          paging={true}
          exportable={true}
          // visible={5}
        />
      </div>
      <div className="graphs">
        <Graph
          data={graph_data}
          title={graph_title}
          key_x={key_x}
          lines_data={lines_data}
        />
        <PiChart
          data={chart_data}
          title={chart_title}
          chart_key={chart_key}
          colors={chart_colors}
        />
      </div>
    </div>
  );
};
export default Dashboard;
