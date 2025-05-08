import Page_Title_Add from "../../components/Page_Title_Add";
import Table from "../../components/Table";
import "./expense.css"
const Expense = () => {
    const headers = ["FullName", "Contact", "Title", "Start Date", "End Date"];
    const data = [
        [1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]
    ];
    return(
        <div className="expense">
            <div className="expenses-table m-[2%]">
                <Page_Title_Add name="expense" options={[1,2,3,4,5]} fields={{"date": "date","account": "select","bill_amount":"number","paid_amount":"number", "comments":"text-area"}}/> 
                <Table 
                    headers={headers} 
                    data={data} 
                    title="Expense"
                    info={false}
                    searchable={true}
                    paging={true}
                    exportable={true}
                    visible={false}
                />
            </div>
        </div>
    );
}
export default Expense