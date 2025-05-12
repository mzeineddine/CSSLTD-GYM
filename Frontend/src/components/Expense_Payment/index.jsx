import { useLocation } from "react-router-dom";
import Page_Title_Add from "../Page_Title_Add";
import Table1 from "../Table/tables";

export default function Expense_Payment() {
  const location = useLocation();
  const data = location.state;
  console.log(data)
  return (
    <div className="expense_payment m-[2%]">
      <Page_Title_Add
        name="expense_payment"
        data={data}
        id_change={"account_id"}
        fields={{
          amount: "text",
        }}
      />
      <Table1
        title="expensePayments"
        options={[
          { "Edit Payment": "edit_payment" }
        ]}
        options_names={{
          edit_payment: "expense_payment"
        }}
        options_functions_field={{
          edit_payment: {
            amount: "number",
          },
        }}
        data_filter={{"account_id": data.id}}
        info={false}
        searchable={true}
        paging={true}
        exportable={true}
        visible={false}
        actions={[
          { Edit_Payment: "edit_payment()" }
        ]}
      />
    </div>
  );
}
