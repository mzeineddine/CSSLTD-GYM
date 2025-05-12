import Graph from "../../components/Graph";
import PiChart from "../../components/PiChart";
// import Table from "../../components/Table";
import "./coach.css";
import Page_Title_Add from "../../components/Page_Title_Add";
import Table1 from "../../components/Table/tables";

const Coach = () => {
  
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
      <Page_Title_Add
        name="coach"
        fields={{
          full_name: "text",
          contact: "text",
          address: "text",
          dob: "date",
        }}
      />
      <div className="appointment-table">
        {
          <Table1
            title="coach"
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
export default Coach;
