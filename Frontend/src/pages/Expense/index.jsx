import Page_Title_Add from "../../components/Page_Title_Add";
import Table1 from "../../components/Table/tables";
// import Table from "../../components/Table";
// import Table1 from "../../components/Table/tables";
import { PaymentAccounts_Context } from "../../context/PaymentAccounts_Context";
import "./expense.css";
import { useContext } from "react";

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
          info={false}
          searchable={true}
          paging={true}
          exportable={true}
          visible={false}
          actions={[{"Edit_Account": "edit_account()"},{'add_payment': "add_payment()"},{'view_payments': "view_payments()"}]}
        />
      </div>
      <div className="expenses-table m-[2%]">
        <Page_Title_Add
          name="expense"
          options={paymentAccounts}
          fields={{
            date: "date",
            account_id: "select",
            bill_amount: "number",
            paid_amount: "number",
            comment: "text-area",
          }}
        />
        <Table1
          title="expense"
          id="expenses_table"
          info={false}
          searchable={true}
          paging={true}
          exportable={true}
          visible={false}
        />

        {/* <Table1/> */}
      </div>
    </div>
  );
};
export default Expense;
