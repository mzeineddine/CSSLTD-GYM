import Graph from "../../components/Graph";
import PiChart from "../../components/PiChart";
// import Table from "../../components/Table";
import "./member.css";
import Page_Title_Add from "../../components/Page_Title_Add";
import {
  Members_Context,
  Members_Provider,
} from "../../context/Members_Context.jsx";
import Table1 from "../../components/Table/tables.jsx";
import { useContext } from "react";
import { Categories_Context } from "../../context/Categories_Context.jsx";

const Member = () => {
  const { categories, update_categories } = useContext(Categories_Context);
  if (!categories) update_categories();
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
        options={{
          category_id: categories,
        }}
        fields={{
          full_name: "text",
          contact: "text",
          address: "text",
          dob: "date",
          category_id: "select",
          start_date: "date",
          end_date: "date",
        }}
      />
      {/* <Table_Search_Export /> */}
      <div className="appointment-table">
        <Table1
          title="member"
          // select_options={{
          //   category_id: categories,
          // }}
          options={[
            { "Edit Member": "edit_member" },
            { "Add Payment": "add_payment" },
            { "View Payments": "view_payment" },
          ]}
          options_names={{
            edit_member: "member",
            add_payment: "subscription_payment",
            view_payment: "subscription_payment",
          }}
          options_functions_field={{
            edit_member: {
              full_name: "text",
              contact: "text",
              address: "text",
              dob: "date",
              // category_id: "select",
              // start_date: "date",
              // end_date: "date",
            },

            add_payment: {
              amount: "number",
            },

            view_payment: {
              name: "text",
              description: "text",
            },
          }}
          info={false}
          searchable={true}
          paging={true}
          exportable={true}
          visible={false}
        />
      </div>
    </div>
  );
};
export default Member;
