import { useContext } from "react";
import Page_Title_Add from "../../components/Page_Title_Add";
import Table1 from "../../components/Table/tables";
// import Table from "../../components/Table";
// import Table1 from "../../components/Table/tables";
import { PaymentAccounts_Context } from "../../context/PaymentAccounts_Context";
import "./expense.css";

const Expense = () => {
  const { paymentAccounts } = useContext(PaymentAccounts_Context);
  return (
    <div className="expense">
      <div className="accounts-table m-[2%]">
        <Page_Title_Add
          name="payment_account"
          fields={{
            name: "text",
            description: "text",
          }}
        />
        <Table1
          title="paymentAccounts"
          // options_names={["Edit Account", "Add Payment", "View Payments"]}
          // options_functions = {["","",""]}
          options={[
            { "Edit Account": "edit_account" },
            { "Add Payment": "add_payment" },
            { "View Payments": "view_payment" },
          ]}
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
          selectable={"multiple"}
          actions={[
            { Edit_Account: "edit_account()" },
            { add_payment: "add_payment()" },
            { view_payments: "view_payments()" },
          ]}
        />
      </div>
      <div className="expenses-table m-[2%]">
        {paymentAccounts && (
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
        <Table1
          title="expense"
          id="expenses_table"
          info={false}
          searchable={true}
          paging={true}
          exportable={true}
          visible={false}
          selectable={"multiple"}
        />

        {/* <Table1/> */}
      </div>
    </div>
  );
};
export default Expense;
