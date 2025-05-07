import { Scheduler } from "@aldabil/react-scheduler";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Custom_Editor from "../Custom_Editor";
import "./calendar.css";
import Custom_Header from "../Custom_Header";
const Calendar = () => {
  // const [formData, setFormData] = useState({title:"", desc:"", color:"red"})
  const coaches = ["Jad", "Joe", "Jak"];
  return (
    <Scheduler
      view="month"
      height={500}
      hideHeader={true}
      // customHeader={(scheduler) => <Custom_Header scheduler={scheduler}/>}
      customEditor={(scheduler) => (
        <Custom_Editor scheduler={scheduler} coaches={coaches} />
      )}
      // fields={[
      //   {
      //     name: "title",
      //     type: "input" ,
      //     config: {
      //       label: "Title",
      //       required: true,
      //       min: 3,
      //       variant: "outlined"
      //     }
      //   },
      //   {
      //     name: "description",
      //     type: "input" ,
      //     config: {
      //       label: "Description",
      //       required: true,
      //       variant: "outlined"
      //     }
      //   },
      //   {
      //     name: "color",
      //     type: "select",
      //     id:"123",
      //     config: {
      //       label: "Color",
      //       required: true,
      //       variant: "outlined",
      //       options: [
      //         {value:"rgb(255,0,0)", text:"red", selected: true},
      //         {value:"rgb(0,255,0)", text:"green"},
      //         {value:"rgb(0,0,255)", text:"blue"}
      //       ],
      //     },
      //   }
      // ]}
      // events={[
      //   {
      //     event_id: 1,
      //     title: "Event 1",
      //     start: new Date("2025/5/10 09:30"),
      //     end: new Date("2025/5/10 10:30"),
      //     color: "red"
      //   },
      //   {
      //     event_id: 2,
      //     title: "Event 2",
      //     start: new Date("2025/5/8 10:00"),
      //     end: new Date("2025/5/8 11:00"),
      //   },
      // ]}
    />
  );
};
export default Calendar;
