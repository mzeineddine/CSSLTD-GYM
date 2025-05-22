import { useContext, useEffect, useState } from "react";
import Page_Title_Add from "../../components/Page_Title_Add";
import Table1 from "../../components/Table/tables";
import { Accesses_Context } from "../../context/Access_Context";

const Category = () => {
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
      if (acc.page === "category") {
        if (acc.action == "1") newAccess.create = true;
        if (acc.action == "2") newAccess.view = true;
        if (acc.action == "3") newAccess.edit = true;
        if (acc.action == "4") newAccess.delete = true;
      }
    });

    setAccess(newAccess);
  }, [accesses]);

  return (
    <div className="category">
      {access?.create && <Page_Title_Add
        name="category"
        options={[
          { id: 0, name: "Month" },
          { id: 1, name: "Class" },
        ]}
        fields={{
          name: "text",
          type: "select",
          price: "number",
        }}
      />}
      <div className="appointment-table">
        {access?.view && <Table1
          title="categories"
          options={ access?.edit[{ "Edit category": "edit_category" }]}
          options_names={{
            edit_category: "category",
          }}
          select_options={[
            { id: 0, name: 0 },
            { id: 1, name: 1 },
          ]}
          options_functions_field={{
            edit_category: {
              name: "text",
              type: "select",
              price: "number",
            },
          }}
          info={false}
          searchable={true}
          paging={true}
          exportable={true}
          visible={false}
          selectable={access?.delete?"multiple":"none"}
          actions={[
            { Edit_Account: "edit_account()" },
            { add_payment: "add_payment()" },
            { view_payments: "view_payments()" },
          ]}
        />}
      </div>
    </div>
  );
};
export default Category;
