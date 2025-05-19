import axios from "axios";
import Graph from "../../components/Graph";
import PiChart from "../../components/PiChart";
// import Table from "../../components/Table";
import { useEffect } from "react";
import "./staff.css";
import Page_Title_Add from "../../components/Page_Title_Add";
import Table1 from "../../components/Table/tables";

const Staff = () => {
  const effectFunction = () => {
    const getData = async () => {
      await axios({
        method: "post",
        url: "http://localhost/Projects/CSSLTD-GYM/Backend/member/read",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("access-token"),
        },
      }).catch((err) => {
        console.log(err);
      });
    };
    getData();
  };
  useEffect(effectFunction, []);
  return (
    <div className="staff">
      <Page_Title_Add
        name="user"
        fields={{
          email: "email",
          password: "password",
          username: "text",
          access_level: "number",
          title: "text",
          contact: "text",
          address: "text",
          status: "number",
        }}
      />
      <div className="appointment-table">
        {
          <Table1
            // headers={headers}
            // data={members}
            title="staff"
            info={false}
            searchable={true}
            paging={true}
            exportable={true}
            visible={false}
          />
        }
      </div>
    </div>
  );
};
export default Staff;
