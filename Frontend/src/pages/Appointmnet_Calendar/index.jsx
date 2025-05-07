import axios from "axios";
import Graph from "../../components/Graph";
import PiChart from "../../components/PiChart";
import Table from "../../components/Table";
import { useEffect } from "react";
import "./appointment_calendar.css"
import Page_Title_Add from "../../components/Page_Title_Add";
import Calendar from "../../components/Calendar";

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
        <div className="appointment-calendar m-[2%]">
            <h1 className="font-bold w-full text-left text-3xl my-1">Calendar</h1>
            <Calendar/>
        </div>
    );
}
export default Appointment_Calendar