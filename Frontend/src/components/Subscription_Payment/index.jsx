import { useLocation } from "react-router-dom";
import Page_Title_Add from "../Page_Title_Add";
import Table1 from "../Table/tables";

export default function Subscription_Payment() {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="subscription_payment m-[2%]">
      <Page_Title_Add
        name="subscription_payment"
        data={data}
        id_change={"account_id"}
        fields={{
          amount: "text",
        }}
      />
      <Table1
        title="subscriptionPayments"
        options={[
          { "Edit Payment": "edit_payment" }
        ]}
        options_names={{
          edit_payment: "subscription_payment"
        }}
        options_functions_field={{
          edit_payment: {
            amount: "number",
          },
        }}
        data_filter={{"member_id": data.id}}
        info={false}
        searchable={true}
        paging={true}
        exportable={true}
        visible={false}
      />
    </div>
  );
}
