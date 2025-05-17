import DashboardStatCard from "../../components/DashboardStatCard";
import "./dashboard.css";
import icon from "../../assets/icons/member_icon.svg";
import { Link } from "react-router-dom";
import Graph from "../../components/Graph";
import PiChart from "../../components/PiChart";
import Table1 from "../../components/Table/tables";
import { axios_function } from "../../utilities/axios";
import { useContext, useEffect, useState } from "react";
import { Members_Context } from "../../context/Members_Context";
import { Coaches_Context } from "../../context/Coaches_Context";

const Dashboard = () => {
  const { members } = useContext(Members_Context);
  const { coaches } = useContext(Coaches_Context);
  const [member_count, setMemberCount] = useState(0);
  const [coaches_count, setCoachCount] = useState(0);
  const [profit, setProfit] = useState(0);
  const get_coach_count = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/coach/count"
    );
    setCoachCount(response.data.count);
  };
  const get_profit = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/general/profit"
    );
    console.log("Response.DATA", response);
    setProfit(response.data);
  };
  useEffect(() => {
    setMemberCount(members ? members.length : 0);
    get_coach_count();
    get_profit();
  }, [members, coaches]);
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
        <DashboardStatCard icon={icon} title="Members" count={member_count} />
        <DashboardStatCard icon={icon} title="Coaches" count={coaches_count} />
        <DashboardStatCard icon={icon} title="Patients" count={profit} />
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
