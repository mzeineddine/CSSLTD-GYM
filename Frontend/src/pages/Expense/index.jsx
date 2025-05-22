import { useContext, useEffect, useState } from "react";
import Page_Title_Add from "../../components/Page_Title_Add";
import Table1 from "../../components/Table/tables";
// import Table from "../../components/Table";
// import Table1 from "../../components/Table/tables";
import { PaymentAccounts_Context } from "../../context/PaymentAccounts_Context";
import "./expense.css";
import { Accesses_Context } from "../../context/Access_Context";

const Expense = () => {
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
      if (acc.page === "expense") {
        if (acc.action == "1") newAccess.create = true;
        if (acc.action == "2") newAccess.view = true;
        if (acc.action == "3") newAccess.edit = true;
        if (acc.action == "4") newAccess.delete = true;
      }
    });

    setAccess(newAccess);
  }, [accesses]);

  const { paymentAccounts } = useContext(PaymentAccounts_Context);
  return (
    <div className="expense">
      <div className="accounts-table m-[2%]">
        {access?.create && (
          <Page_Title_Add
            name="payment_account"
            fields={{
              name: "text",
              description: "text",
            }}
          />
        )}
        {access?.view && (
          <Table1
            title="paymentAccounts"
            // options_names={["Edit Account", "Add Payment", "View Payments"]}
            // options_functions = {["","",""]}
            options={
              access?.edit && [
                { "Edit Account": "edit_account" },
                { "Add Payment": "add_payment" },
                { "View Payments": "view_payment" },
              ]
            }
            options_names={{
              edit_account: "payment_account",
              add_payment: "expense_payment",
              view_payment: "expense_payment",
            }}
            options_functions_field={{
              edit_account: {
                name: "text",
                description: "text",
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
            selectable={access?.delete ? "multiple" : "none"}
            actions={[
              { Edit_Account: "edit_account()" },
              { add_payment: "add_payment()" },
              { view_payments: "view_payments()" },
            ]}
          />
        )}
      </div>
      <div className="expenses-table m-[2%]">
        {paymentAccounts && access?.create && (
          <Page_Title_Add
            options={{ account_id: paymentAccounts }}
            name="expense"
            fields={{
              date: "date",
              account_id: "select",
              bill_amount: "number",
              comment: "text-area",
            }}
          />
        )}
        {access?.view && (
          <Table1
            title="expense"
            id="expenses_table"
            info={false}
            searchable={true}
            paging={true}
            exportable={true}
            visible={false}
            selectable={access?.delete ? "multiple" : "none"}
          />
        )}

        {/* <Table1/> */}
      </div>
    </div>
  );
};
export default Expense;
