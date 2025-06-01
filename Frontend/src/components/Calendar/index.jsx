import { Scheduler } from "@aldabil/react-scheduler";
import { useContext, useEffect, useState } from "react";
import Custom_Editor from "../Custom_Editor";
import "./calendar.css";
import { Appointments_Context } from "../../context/Appointments_Context";
import { axios_function } from "../../utilities/axios";
import { Accesses_Context } from "../../context/Access_Context";
import SnackBar from "../Snackbar";

const Calendar = () => {
  const { accesses, update_accesses } = useContext(Accesses_Context);
  const [access, setAccess] = useState(null);

  // Load accesses on mount
  useEffect(() => {
    if (!accesses) update_accesses();
  }, []);

  // Update access state when accesses change
  useEffect(() => {
    if (!accesses) return;

    const newAccess = {
      create: false,
      view: false,
      edit: false,
      delete: false,
    };
    accesses.forEach((acc) => {
      if (acc.page === "calendar") {
        if (acc.action == "1") newAccess.create = true;
        if (acc.action == "2") newAccess.view = true;
        if (acc.action == "3") newAccess.edit = true;
        if (acc.action == "4") newAccess.delete = true;
      }
    });
    setAccess(newAccess);
  }, [accesses]);

  const { appointments, update_appointments } =
    useContext(Appointments_Context);

  const [formattedEvents, setFormattedEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (!access?.view) return;

    setFormattedEvents(
      [appointments].flat().map((e) => ({
        event_id: e.id,
        title: e.title,
        coach_id: e.coach_id,
        member_id: e.member_id,
        color: e.color,
        start: new Date(e.start_date),
        end: new Date(e.end_date),
      }))
    );
  }, [appointments, access]);

  const update_db = async (event) => {
    const response = await axios_function(
      "POST",
      "http://localhost/Projects/CSSLTD-GYM/Backend/appointment/update",
      event
    );
    if (response.result) {
      setMessage(response.message);
      setOpenSnack(true);
      setSuccess(true);
    } else {
      setMessage(response.message);
      setOpenSnack(true);
      setSuccess(false);
    }
  };

  // Don't render Scheduler until access is loaded
  if (!access) return <div>Loading...</div>;

  return (
    <>
      <Scheduler
        editable={access.edit}
        draggable={access.edit}
        deletable={access.delete}
        // onCellClick={access?.create? {} : (e)=>{e.preventDefault()}}
        view="month"
        day={{ startHour: 0, endHour: 24, step: 60 }}
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
          update_appointments();
        }}
        onConfirm={access.edit && update_appointments}
        onDelete={async (deletedId) => {
          const response = await axios_function(
            "DELETE",
            "http://localhost/Projects/CSSLTD-GYM/Backend/appointment/delete",
            { id: deletedId }
          );
          if (response.result) {
            setMessage(response.message);
            setOpenSnack(true);
            setSuccess(true);
          } else {
            setMessage(response.message);
            setOpenSnack(true);
            setSuccess(false);
          }
          setFormattedEvents((prev) =>
            prev.filter((event) => event.event_id !== deletedId)
          );
          update_appointments();
        }}
        customEditor={(scheduler) => <Custom_Editor scheduler={scheduler} />}
      />
      <SnackBar
        success={success}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
        message={message}
      />
    </>
  );
};

export default Calendar;
