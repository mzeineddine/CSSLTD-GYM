import { useContext, useState } from "react";
import {
  TextField,
  Button,
  DialogActions,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { axios_function } from "../../utilities/axios";
import { Appointments_Context } from "../../context/Appointments_Context";
import { Members_Context } from "../../context/Members_Context";
import { Coaches_Context } from "../../context/Coaches_Context";

const Custom_Editor = ({ scheduler }) => {
  const { members } = useContext(Members_Context);
  const { coaches } = useContext(Coaches_Context);
  const { update_appointments } = useContext(Appointments_Context);
  const event = scheduler.edited;

  const [state, setState] = useState({
    id: event?.event_id || null,
    title: event?.title || "",
    color: event?.color || "",
    coach_id: event?.coach_id || "",
    member_id: event?.member_id || "",
    start_date: event?.start ? dayjs(event.start) : dayjs(), // safer fallback
    end_date: event?.end ? dayjs(event.end) : dayjs().add(1, "hour"),
  });

  const handleChange = (value, name) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      scheduler.loading(true);
      const added_updated_event = {
        event_id: event?.event_id || state.id,
        title: state.title,
        color: state.color,
        coach_id: state.coach_id,
        member_id: state.member_id,
        start: state.start_date.toDate(), // convert to native Date
        end: state.end_date.toDate(),
      };

      const event_type = event ? "update" : "create";

      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");

      // Send raw values (strings) to backend if needed
      await axios_function(
        "POST",
        `http://localhost/Projects/CSSLTD-GYM/Backend/appointment/${event_type}`,
        {
          ...state,
          start_date: state.start_date.format("YYYY-MM-DD HH:mm:ss"),
          end_date: state.end_date.format("YYYY-MM-DD HH:mm:ss"),
        }
      );

      update_appointments();
      scheduler.close();
    } finally {
      scheduler.loading(false);
    }
  };

  return (
    <div>
      <div className="flex-col h-full gap-1 justify-center items-center p-2">
        <p>Load your custom form/fields</p>
        <DemoContainer components={["TextField", "DateTimePicker", "Select"]}>
          <TextField
            label="Title"
            value={state.title}
            onChange={(e) => handleChange(e.target.value, "title")}
            fullWidth
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <div className="flex gap-1">
                <DateTimePicker
                  label="Start Date Time"
                  value={state.start_date}
                  onChange={(newValue) =>
                    handleChange(dayjs(newValue), "start_date")
                  }
                />
                <DateTimePicker
                  label="End Date Time"
                  value={state.end_date}
                  onChange={(newValue) =>
                    handleChange(dayjs(newValue), "end_date")
                  }
                />
              </div>
            </DemoContainer>
          </LocalizationProvider>

          <Autocomplete
            options={members}
            getOptionLabel={(option) => option.full_name}
            value={
              members.find((member) => member.id === state.member_id) || null
            }
            onChange={(event, member) => {
              if (member) handleChange(member.id, "member_id");
            }}
            renderInput={(params) => (
              <TextField {...params} label="Member" required fullWidth />
            )}
          />

          <Autocomplete
            options={coaches}
            getOptionLabel={(coach) => coach.full_name}
            value={coaches.find((coach) => coach.id === state.coach_id) || null}
            onChange={(event, coach) => {
              if (coach) handleChange(coach.id, "coach_id");
            }}
            renderInput={(params) => (
              <TextField {...params} label="Coach" required fullWidth />
            )}
          />

          <TextField
            label="Color"
            value={state.color}
            onChange={(e) => handleChange(e.target.value, "color")}
            required
            select
          >
            <MenuItem value={"red"}>Red</MenuItem>
            <MenuItem value={"green"}>Green</MenuItem>
            <MenuItem value={"blue"}>Blue</MenuItem>
          </TextField>
        </DemoContainer>
      </div>

      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </div>
  );
};

export default Custom_Editor;
