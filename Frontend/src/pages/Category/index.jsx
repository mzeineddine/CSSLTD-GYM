import Page_Title_Add from "../../components/Page_Title_Add";
import Table1 from "../../components/Table/tables";

const Category = () => {
  return (
    <div className="category">
      <Page_Title_Add
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
      />
      <div className="appointment-table">
        <Table1
          title="categories"
          options={[{ "Edit category": "edit_category" }]}
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
          selectable={"multiple"}
          actions={[
            { Edit_Account: "edit_account()" },
            { add_payment: "add_payment()" },
            { view_payments: "view_payments()" },
          ]}
        />
      </div>
    </div>
  );
};
export default Category;
