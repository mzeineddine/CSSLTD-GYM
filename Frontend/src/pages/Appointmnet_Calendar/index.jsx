import Graph from "../../components/Graph";
import PiChart from "../../components/PiChart";
import "./appointment_calendar.css";
import Page_Title_Add from "../../components/Page_Title_Add";
import Calendar from "../../components/Calendar";
import { Appointments_Context } from "../../context/Appointments_Context";
import { useContext, useEffect, useState } from "react";
import { Coaches_Context } from "../../context/Coaches_Context";
import { Members_Context } from "../../context/Members_Context";

const Appointment_Calendar = () => {
  const { appointments, update_appointments } =
    useContext(Appointments_Context);
  const { coaches, update_coaches } = useContext(Coaches_Context);
  const { members, update_members } = useContext(Members_Context);

  const [appointment, setAppointment] = useState(appointments);
  const [coach, setCoach] = useState(coaches);
  const [member, setMember] = useState(members);

  const coach_data = [];
  const member_data = [];
  useEffect(() => {
    if (!appointment) {
      update_appointments();
      setAppointment(appointments);
    } else if (!coach) {
      update_coaches();
      setCoach(coaches);
    } else if (!member) {
      update_members();
      setMember(members);
    }
  }, [appointments, coaches, members]);
  return (
    <div className="appointment-calendar m-[2%]">
      <h1 className="font-bold w-full text-left text-3xl my-1">Calendar</h1>
      {coach_data && member_data && appointment && (
        <Calendar appointments={appointment} />
      )}
    </div>
  );
};
export default Appointment_Calendar;
