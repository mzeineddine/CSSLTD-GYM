import { useLocation } from "react-router-dom";
import Page_Title_Add from "../Page_Title_Add";
import Table1 from "../Table/tables";
import { useContext, useEffect, useState } from "react";
import { Accesses_Context } from "../../context/Access_Context";
import { Categories_Context } from "../../context/Categories_Context";

export default function Subscription() {
  const location = useLocation();
  const data = location.state;
  const { accesses, update_accesses } = useContext(Accesses_Context);
  const { categories, update_categories } = useContext(Categories_Context);

  const [access, setAccess] = useState(null);
  if (!accesses) update_accesses();
  if (!categories) update_categories();

  useEffect(() => {
    if (!accesses) return;
    if (!categories) return;

    const newAccess = {
      create: false,
      view: false,
      edit: false,
      delete: false,
    };

    accesses.forEach((acc) => {
      if (acc.page == "subscription") {
        if (acc.action == "1") newAccess.create = true;
        if (acc.action == "2") newAccess.view = true;
        if (acc.action == "3") newAccess.edit = true;
        if (acc.action == "4") newAccess.delete = true;
      }
    });
    setAccess(newAccess);
  }, [accesses, categories]);
  return (
    <div className="expense_payment m-[2%]">
      {access?.create && (
        <Page_Title_Add
          name="subscription"
          options={
            categories && {
              category_id: categories,
            }
          }
          data={data}
          id_change={"member_id"}
          fields={{
            category_id: "dropdown",
            start_date: "date",
            end_date: "date",
            cost: "number",
          }}
        />
      )}
      {access?.view && (
        <Table1
          title="subscription"
          options={
            access?.edit && [{ "Edit Subscription": "edit_subscription" }]
          }
          options_names={{
            edit_subscription: "subscription",
          }}
          select_options={{
            category_id: categories,
          }}
          options_functions_field={{
            edit_subscription: {
              category_id: "dropdown",
              start_date: "date",
              end_date: "date",
              cost: "number",
            },
          }}
          member_id={data.id}
          info={false}
          searchable={true}
          paging={true}
          exportable={true}
          visible={false}
          selectable={access.delete ? "multiple" : "none"}
        />
      )}
    </div>
  );
}
