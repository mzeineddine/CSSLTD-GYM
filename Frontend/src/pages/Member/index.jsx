import Graph from "../../components/Graph";
import PiChart from "../../components/PiChart";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import "./member.css";
import Page_Title_Add from "../../components/Page_Title_Add";
import { useNavigate } from "react-router-dom";
import { axios_function } from "../../utilities/axios";

const Member = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const effectFunction = () => {
    const getData = async () => {
      console.log("in getData");
      let response = await axios_function(
        "GET",
        "http://localhost/Projects/CSSLTD-GYM/Backend/member/read"
      );
      if (response.message == "Access denied.") {
        console.log("Should Go login");
        navigate("/");
      }
      if (Object.prototype.hasOwnProperty.call(response, "data")) {
        setData(response.data);
      }
    };
    getData();
  };
  useEffect(effectFunction, []);

  // const headers = ["FullName", "Contact", "Address", "Date of Birth", "Created On", "Created By"];
  // const data = [
  //     [1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]
  // ];
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
    <div className="member">
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
      <Page_Title_Add
        name="member"
        fields={{
          full_name: "text",
          contact: "text",
          address: "text",
          dob: "date",
        }}
      />
      {/* <Table_Search_Export /> */}
      <div className="appointment-table">
        {console.log(data)}
        {data&&<Table
          // headers={headers}
          data={data}
          title="Member"
          info={false}
          searchable={true}
          paging={true}
          exportable={true}
          visible={false}
        />}
      </div>
    </div>
  );
};
export default Member;
