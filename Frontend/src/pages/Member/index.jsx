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
  return (
    <div className="member">
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
      <div className="appointment-table m-[2%]">
        <Table1
          title="member"
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
          selectable={"multiple"}
        />
      </div>
    </div>
  );
};
export default Member;
