import axios from "axios";
import Graph from "../../components/Graph";
import PiChart from "../../components/PiChart";
import Table from "../../components/Table";
import { useEffect } from "react";
import "./member.css"
import Page_Title_Add from "../../components/Page_Title_Add";
import Table_Search_Export from "../../components/Table_Search_Export";

const Member = () => {
    const effectFunction = () =>{
        const getData = async () =>{
            console.log("in getData")
            let response = await axios({
                method: 'post',
                url: 'http://localhost/Projects/CSSLTD-GYM/Backend/member/read',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer"+localStorage.getItem("access-token")
                }, 
            }).catch(err => {
                console.log(err);
            });
                console.log(response.data)
        }
        getData();
    }
    useEffect(effectFunction,[])

    const headers = ["FullName", "Contact", "Title", "Start Date", "End Date"];
    const data = [
        [1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]
    ];
    return(
        <div className="member">
            <div className="graphs">
                <Graph />
                <PiChart/>
            </div>
            <Page_Title_Add name="member"/>
            <Table_Search_Export />
            <div className="appointment-table">
                <Table headers={headers} data={data} />
            </div>
        </div>
    );
}
export default Member