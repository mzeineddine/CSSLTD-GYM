import Graph from "../../components/Graph";
import PiChart from "../../components/PiChart";
// import Table from "../../components/Table";
import "./coach.css";
import Page_Title_Add from "../../components/Page_Title_Add";
import Table1 from "../../components/Table/tables";
import { useContext, useEffect, useState } from "react";
import { Accesses_Context } from "../../context/Access_Context";

const Coach = () => {
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
      if (acc.page === "coach") {
        if (acc.action == "1") newAccess.create = true;
        if (acc.action == "2") newAccess.view = true;
        if (acc.action == "3") newAccess.edit = true;
        if (acc.action == "4") newAccess.delete = true;
      }
    });

    setAccess(newAccess);
  }, [accesses]);

  return (
    <div className="coach">
      {/* <div className="graphs">
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
      </div> */}
      {access?.create && (
        <Page_Title_Add
          name="coach"
          fields={{
            full_name: "text",
            contact: "text",
            address: "text",
            dob: "date",
          }}
        />
      )}
      <div className="appointment-table">
        {access?.view && (
          <Table1
            title="coach"
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
export default Coach;
