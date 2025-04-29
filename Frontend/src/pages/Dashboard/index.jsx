import axios from "axios";
import { useEffect } from "react";

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
                // data: form
            }).catch(err => {
                console.log(err);
            });
            // if(response.data.result){
                console.log(response.data)
            // }
        }
        // console.log("useEffect triggered")
        getData();
    }
    useEffect(effectFunction,[])
    return(
        <div>
            <h1>From Dashboard</h1>
        </div>
    );
}
export default Dashboard;