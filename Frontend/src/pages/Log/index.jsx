import Table1 from "../../components/Table/tables";

const Log = () => {
  return (
    <div className="log m-[2%]">
      <Table1
        title="log"
        info={true}
        searchable={true}
        paging={true}
        exportable={true}
        // visible={5}
      />
    </div>
  );
};
export default Log;
