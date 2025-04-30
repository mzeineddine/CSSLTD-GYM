import axios from "axios";
import { useEffect } from "react";
import DashboardStatCard from "../../components/DashboardStatCard";
import "./dashboard.css"
import icon from "../../assets/icons/member_icon.svg"
import Table from "../../components/Table";
const Dashboard = () => {
    const effectFunction = () =>{
        const getData = async () =>{
            console.log("in getData")
            let response = await axios({
                method: 'post',
                url: 'http://localhost/Projects/CSSLTD-GYM/Backend/member/read',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer"+localStorage.getItem("token123")
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
        <div className="dashboard">
            <div className="dashboardStatCards">
                <DashboardStatCard icon={icon} title="Patients" count="270"/>
                <DashboardStatCard icon={icon} title="Patients" count="270"/>
                <DashboardStatCard icon={icon} title="Patients" count="270"/>
                {/* <DashboardStatCard icon={icon} title="Patients" count="270"/> */}
                {/* <DashboardStatCard icon={icon} title="Patients" count="270"/> */}
                {/* <DashboardStatCard icon={icon} title="Patients" count="270"/> */}
            </div>
            <div className="appointment-table">
                <Table headers={headers} data={data} />
            </div>
            <div className="graphs">
                {/* <Graph/>
                <PiChart/> */}
            </div>
        </div>
    );
}
export default Dashboard;