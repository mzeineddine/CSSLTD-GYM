import axios from "axios";
import Graph from "../../components/Graph";
import PiChart from "../../components/PiChart";
import Table from "../../components/Table";
import { useEffect } from "react";
import "./coach.css"
import Page_Title_Add from "../../components/Page_Title_Add";
import CalendarComponent from "../../components/Calendar";

const Appointment_Calendar = () => {
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

    return(
        <div className="appointment-calendar">
            <CalendarComponent/>
        </div>
    );
}
export default Appointment_Calendar