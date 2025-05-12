import { Scheduler } from "@aldabil/react-scheduler";
import { useContext, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Custom_Editor from "../Custom_Editor";
import "./calendar.css";
import Custom_Header from "../Custom_Header";
import { Appointments_Context } from "../../context/Appointments_Context";
import { axios_function } from "../../utilities/axios";
const Calendar = (props) => {
  const { appointments, update_appointments } =
    useContext(Appointments_Context);
  const coaches = props.coaches;
  const members = props.members;

  const [formattedEvents, setFormattedEvents] = useState(
    [props.appointments].flat().map((e) => {
      return {
        event_id: e.id,
        title: e.title,
        coach_id: e.coach_id,
        member_id: e.member_id,
        color: e.color,
        start: new Date(e.start_date),
        end: new Date(e.end_date),
      };
    })
  );

  // useEffect(() => {
  //   setFormattedEvents(
  //     [props.appointments].flat().map((e) => {
  //       return {
  //         event_id: e.id,
  //         title: e.title,
  //         coach_id: e.coach_id,
  //         member_id: e.member_id,
  //         color: e.color,
  //         start: new Date(e.start_date),
  //         end: new Date(e.end_date),
  //       };
  //     })
  //   );
  // }, [appointments]);

  const update_db = async (event) => {
    await axios_function(
      "POST",
      "http://localhost/Projects/CSSLTD-GYM/Backend/appointment/update",
      event
    );
  };
  return (
    <Scheduler
      view="month"
      height={500}
      hideHeader={true}
      events={formattedEvents}
      onEventDrop={async (droppedEvent, newStart, newEnd) => {
        await update_db({
          id: newEnd.event_id,
          title: newEnd.title,
          coach_id: newEnd.coach_id,
          member_id: newEnd.member_id,
          color: newEnd.color,
          start_date: newEnd.start,
          end_date: newEnd.end,
        });
        setFormattedEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.event_id === newEnd.event_id ? newEnd : event
          )
        );
        update_appointments(); // optionally reload from context/backend
      }}
      onConfirm={update_appointments}
      customEditor={(scheduler) => (
        <Custom_Editor
          scheduler={scheduler}
          members={members}
          coaches={coaches}
        />
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
