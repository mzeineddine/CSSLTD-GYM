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
      create_expense: false,
      view_expense: false,
      edit_expense: false,
      delete_expense: false,

      create_account: false,
      view_account: false,
      edit_account: false,
      delete_account: false,

      create_account_payment: false,
      view_account_payment: false,
      edit_account_payment: false,
      delete_account_payment: false,
    };

    accesses.forEach((acc) => {
      if (acc.page === "expense") {
        if (acc.action == "1") newAccess.create_expense = true;
        if (acc.action == "2") newAccess.view_expense = true;
        if (acc.action == "3") newAccess.edit_expense = true;
        if (acc.action == "4") newAccess.delete_expense = true;
      }
      if (acc.page === "account") {
        if (acc.action == "1") newAccess.create_account = true;
        if (acc.action == "2") newAccess.view_account = true;
        if (acc.action == "3") newAccess.edit_account = true;
        if (acc.action == "4") newAccess.delete_account = true;
      }
      if (acc.page == "account_payment") {
        if (acc.action == "1") newAccess.create_account_payment = true;
        if (acc.action == "2") newAccess.view_account_payment = true;
        if (acc.action == "3") newAccess.edit_account_payment = true;
        if (acc.action == "4") newAccess.delete_account_payment = true;
      }
    });
    setAccess(newAccess);
  }, [accesses]);

  const { paymentAccounts } = useContext(PaymentAccounts_Context);
  return (
    <div className="expense">
      <div className="accounts-table m-[2%]">
        {access?.create_account && (
          <Page_Title_Add
            name="payment_account"
            fields={{
              name: "text",
              description: "text",
            }}
          />
        )}
        {access?.view_account && (
          <Table1
            title="paymentAccounts"
            // options_names={["Edit Account", "Add Payment", "View Payments"]}
            // options_functions = {["","",""]}
            options={
              (access?.edit_account ||
                access?.create_account_payment ||
                access?.view_account_payment) && [
                access?.edit_account && { "Edit Account": "edit_account" },
                access?.create_account_payment && {
                  "Add Payment": "add_payment",
                },
                access?.view_account_payment && {
                  "View Payments": "view_payment",
                },
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
        {paymentAccounts && access?.create_expense && (
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
        {access?.view_expense && (
          <Table1
            title="expense"
            id="expenses_table"
            options={
              access?.edit_expense && [{ "Edit expense": "edit_expense" }]
            }
            options_names={{
              edit_expense: "expense",
            }}
            options_functions_field={{
              edit_expense: {
                bill_amount: "number",
                comment: "text",
              },
            }}
            info={false}
            searchable={true}
            paging={true}
            exportable={true}
            visible={false}
            selectable={access?.delete_expense ? "multiple" : "none"}
          />
        )}

        {/* <Table1/> */}
      </div>
    </div>
  );
};
export default Expense;
