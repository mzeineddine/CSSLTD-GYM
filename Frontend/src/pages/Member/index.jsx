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
import { useContext, useEffect, useState } from "react";
import { Categories_Context } from "../../context/Categories_Context.jsx";
import { Accesses_Context } from "../../context/Access_Context.jsx";

const Member = () => {
  const { categories, update_categories } = useContext(Categories_Context);

  if (!categories) update_categories();

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
      create_member_payment: false,
      view_member_payment: false,
      edit_member_payment: false,
      delete_member_payment: false,
    };

    accesses.forEach((acc) => {
      if (acc.page === "member") {
        if (acc.action == "1") newAccess.create = true;
        if (acc.action == "2") newAccess.view = true;
        if (acc.action == "3") newAccess.edit = true;
        if (acc.action == "4") newAccess.delete = true;
      }
      if (acc.page === "member_payment") {
        if (acc.action == "1") newAccess.create_member_payment = true;
        if (acc.action == "2") newAccess.view_member_payment = true;
        if (acc.action == "3") newAccess.edit_member_payment = true;
        if (acc.action == "4") newAccess.delete_member_payment = true;
      }
    });

    setAccess(newAccess);
  }, [accesses]);

  return (
    <div className="member">
      {console.log(access)}
      {access?.create && (
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
      )}
      {/* <Table_Search_Export /> */}
      <div className="appointment-table m-[2%]">
        {access?.view && (
          <Table1
            title="member"
            options={
              (access?.edit ||
                access?.create_member_payment ||
                access?.view_member_payment) && [
                access?.edit && { "Edit Member": "edit_member" },
                access?.create_member_payment && {
                  "Add Payment": "add_payment",
                },
                access?.view_member_payment && {
                  "View Payments": "view_payment",
                },
              ]
            }
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
            selectable={access.delete ? "multiple" : "none"}
          />
        )}
      </div>
    </div>
  );
};
export default Member;
