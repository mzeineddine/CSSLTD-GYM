import DashboardStatCard from "../../components/DashboardStatCard";
import "./dashboard.css";
import { Link } from "react-router-dom";

import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';

import Graph from "../../components/Graph";
import PiChart from "../../components/PiChart";
import Table1 from "../../components/Table/tables";
import { axios_function } from "../../utilities/axios";
import { useContext, useEffect, useState } from "react";
import { Members_Context } from "../../context/Members_Context";
import { Coaches_Context } from "../../context/Coaches_Context";
import SnackBar from "../../components/Snackbar";
const Dashboard = () => {
  const { members } = useContext(Members_Context);
  const { coaches } = useContext(Coaches_Context);
  const [member_count, setMemberCount] = useState(0);
  const [coaches_count, setCoachCount] = useState(0);
  const [profit, setProfit] = useState(0);
  const [chart_data, setChartData] = useState([{}]);
  const [graph_data, setGraphData] = useState([{}]);
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [success, setSuccess] = useState(false);
  const get_coach_count = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/coach/count"
    );
    setCoachCount(response.data.count);
    if (response.result) {
      // console.log(response.message);
      setMessage(response.message);
      setOpenSnack(true);
      setSuccess(true);
    } else {
      // console.log("ERROR");
      setMessage(response.message);
      setOpenSnack(true);
      setSuccess(false);
    }
  };
  const get_profit = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/general/profit"
    );
    if (response.result) {
      // console.log(response.message);
      setMessage(response.message);
      setOpenSnack(true);
      setSuccess(true);
      setProfit(response.data);
    } else {
      // console.log("ERROR");
      setMessage(response.message);
      setOpenSnack(true);
      setSuccess(false);
    }
  };

  const getChartData = () => {
    let _0_11 = 0;
    let _12_17 = 0;
    let _18_29 = 0;
    let _30_59 = 0;
    let _60 = 0;
    members &&
      members.forEach((value) => {
        const birthDate = new Date(value.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }
        if (age < 12) _0_11++;
        else if (age < 18) _12_17++;
        else if (age < 30) _18_29++;
        else if (age < 60) _30_59++;
        else _60++;
      });
    setChartData([
      { name: "0-11", value: _0_11 },
      { name: "12-17", value: _12_17 },
      { name: "18-29", value: _18_29 },
      { name: "30-59", value: _30_59 },
      { name: "+60", value: _60 },
    ]);
  };

  const getGraphData = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/general/receive_pay_month"
    );
    if (response.result) {
      // console.log(response.message);
      setMessage(response.message);
      setOpenSnack(true);
      setSuccess(true);
      setGraphData(response.data);
    } else {
      // console.log("ERROR");
      setMessage(response.message);
      setOpenSnack(true);
      setSuccess(false);
    }
  };
  useEffect(() => {
    setMemberCount(members ? members.length : 0);
    get_coach_count();
    get_profit();
    getChartData();
    getGraphData();
  }, [members, coaches]);
  const graph_title = "Received and Paid Money";
  const key_x = "month_year";
  const lines_data = [
    {
      key: "total_in",
      legend: "total in",
      color: "green",
    },
    {
      key: "total_out",
      legend: "total out",
      color: "red",
    },
  ];

  const chart_title = "Members by Age Group";
  const chart_key = "value";
  const chart_colors = ["red", "yellow", "orange", "green", "blue"];
  return (
    <div className="dashboard">
      <div className="dashboardStatCards">
        <DashboardStatCard icon={GroupIcon} title="Members" count={member_count} />
        <DashboardStatCard icon={SportsGymnasticsIcon} title="Coaches" count={coaches_count} />
        <DashboardStatCard icon={AttachMoneyIcon} title="Profit" count={profit} />
      </div>
      <div className="appointment-table flex flex-col justify-between rounded-2xl items-center bg-neutral-50 p-[2%]">
        <div className="info flex flex-row justify-between items-center w-full px-[1%]">
          <p className="h-full inline justify-content-center align-items-center">
            {"Member"}
          </p>
          <div>
            <Link to={"../member"}>See All</Link>
          </div>
        </div>
        <Table1
          title="subscription"
          info={true}
          searchable={true}
          paging={true}
          exportable={true}
          visible={5}
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
      <SnackBar
        success={success}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
        message={message}
      />
    </div>
  );
};
export default Dashboard;
