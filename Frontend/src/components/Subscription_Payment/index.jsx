import { useLocation } from "react-router-dom";
import Page_Title_Add from "../Page_Title_Add";
import Table1 from "../Table/tables";
import { useContext, useEffect, useState } from "react";
import { Accesses_Context } from "../../context/Access_Context";

export default function Subscription_Payment() {
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
      if (acc.page === "member_payment") {
        if (acc.action == "1") newAccess.create = true;
        if (acc.action == "2") newAccess.view = true;
        if (acc.action == "3") newAccess.edit = true;
        if (acc.action == "4") newAccess.delete = true;
      }
    });

    setAccess(newAccess);
  }, [accesses]);
  console.log(data)
  return (
    <div className="subscription_payment m-[2%]">
      {access?.create && (
        <Page_Title_Add
          name="subscription_payment"
          data={data}
          id_change={"member_id"}
          fields={{
            amount: "text",
          }}
        />
      )}
      <Table1
        title="subscriptionPayments"
        options={[access?.edit &&{ "Edit Payment": "edit_payment" }]}
        options_names={{
          edit_payment: "subscription_payment",
        }}
        options_functions_field={{
          edit_payment: {
            amount: "number",
          },
        }}
        data_filter={{ member_id: data.id }}
        info={false}
        searchable={true}
        paging={true}
        exportable={true}
        visible={false}
        selectable={access?.delete ? "multiple" : "none"}
      />
    </div>
  );
}
