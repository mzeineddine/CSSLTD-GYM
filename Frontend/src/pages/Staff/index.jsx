import axios from "axios";
import Graph from "../../components/Graph";
import PiChart from "../../components/PiChart";
// import Table from "../../components/Table";
import { useContext, useEffect, useState } from "react";
import "./staff.css";
import Page_Title_Add from "../../components/Page_Title_Add";
import Table1 from "../../components/Table/tables";
import { Accesses_Context } from "../../context/Access_Context";

const Staff = () => {
  const { accesses, update_accesses } = useContext(Accesses_Context);
  const [access, setAccess] = useState(null);
  if (!accesses) update_accesses();
  useEffect(() => {
    if (!accesses) return;

    const newAccess = {
      create: false,
      view: false,
      edit: false,
      delete: false,
    };

    accesses.forEach((acc) => {
      if (acc.page === "staff") {
        if (acc.action == "1") newAccess.create = true;
        if (acc.action == "2") newAccess.view = true;
        if (acc.action == "3") newAccess.edit = true;
        if (acc.action == "4") newAccess.delete = true;
      }
    });

    setAccess(newAccess);
  }, [accesses]);

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
      {access?.create && (
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
      )}
      <div className="appointment-table">
        {access?.view && (
          <Table1
            // headers={headers}
            // data={members}
            title="staff"
            info={false}
            searchable={true}
            paging={true}
            exportable={true}
            visible={false}
            selectable={access?.delete ? "multiple" : "none"}
          />
        )}
      </div>
    </div>
  );
};
export default Staff;
