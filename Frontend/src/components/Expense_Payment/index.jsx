import { useLocation } from "react-router-dom";
import Page_Title_Add from "../Page_Title_Add";
import Table1 from "../Table/tables";
import { useContext, useEffect, useState } from "react";
import { Accesses_Context } from "../../context/Access_Context";

export default function Expense_Payment() {
  const location = useLocation();
  const data = location.state;
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
      if (acc.page == "account_payment") {
        if (acc.action == "1") newAccess.create = true;
        if (acc.action == "2") newAccess.view = true;
        if (acc.action == "3") newAccess.edit = true;
        if (acc.action == "4") newAccess.delete = true;
      }
    });
    setAccess(newAccess);
  }, [accesses]);
  return (
    <div className="expense_payment m-[2%]">
      {access?.create && (
        <Page_Title_Add
          name="expense_payment"
          data={data}
          id_change={"account_id"}
          fields={{
            amount: "text",
          }}
        />
      )}
      {access?.view && (
        <Table1
          title="expensePayments"
          options={access?.edit && [{ "Edit Payment": "edit_payment" }]}
          options_names={{
            edit_payment: "expense_payment",
          }}
          options_functions_field={{
            edit_payment: {
              amount: "number",
            },
          }}
          data_filter={{ account_id: data.id }}
          info={false}
          searchable={true}
          paging={true}
          exportable={true}
          visible={false}
          actions={[{ Edit_Payment: "edit_payment()" }]}
          selectable={access.delete ? "multiple" : "none"}
        />
      )}
    </div>
  );
}
