import { useContext, useState } from "react";
import {
  TextField,
  Button,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { axios_function } from "../../utilities/axios";
import { Appointments_Context } from "../../context/Appointments_Context";

export function DateTimePickerValue(props) {
  const [start, setStart] = useState(dayjs(props.start));
  const [end, setEnd] = useState(dayjs(props.end));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        <div className="flex gap-1">
          <DateTimePicker
            label="Start Date Time"
            value={start}
            onChange={(newValue) => setStart(newValue)}
          />
          <DateTimePicker
            label="End Date Time"
            value={end}
            onChange={(newValue) => setEnd(newValue)}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}

const Custom_Editor = ({ scheduler, coaches, members }) => {

  const event = scheduler.edited;
  // Make your own form/state
  const [state, setState] = useState({
    id: event?.event_id || null,
    title: event?.title || "",
    // description: event?.description || "",
    color: event?.color || "",
    coach_id: event?.coach_id || "",
    member_id: event?.member_id || "",
    start_date: scheduler.state.start.value,
    end_date: scheduler.state.end.value,
  });
  
  const [error, setError] = useState("");
  const handleChange = (value, name) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async () => {
    try {
      scheduler.loading(true);
      /**Simulate remote data saving */
      const added_updated_event = await new Promise((res) => {
        /**
         * Make sure the event have 4 mandatory fields
         * event_id: string|number
         * title: string
         * start: Date|string
         * end: Date|string
         */
        res({
          event_id: event?.event_id || state.id,
          title: event?.title || state.title,
          // description: state.description,
          color: event?.color || state.color,
          coach_id: event?.coach_id ||  state.coach_id,
          member_id: event?.member_id || state.member_id,
          start: state.start_date,
          end: state.end_date,
        });
      });
      let event_type = event ? "update" : "create";
      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      await axios_function(
        "POST",
        "http://localhost/Projects/CSSLTD-GYM/Backend/appointment/" +
          event_type,
        state
      );
      scheduler.close();
    } finally {
      scheduler.loading(false);
    }
  };
  return (
      <div>
        {console.log("ID: "+state.id)}
      <div className=" flex-col h-full gap-1 justify-center items-center p-2">
        <p>Load your custom form/fields</p>
        <DemoContainer
          components={[
            "TextField",
            "TextField",
            "DateTimePickerValue,Select,Select",
          ]}
        >
          <TextField
            label="Title"
            value={state.title}
            onChange={(e) => handleChange(e.target.value, "title")}
            fullWidth
            required
          />
          {/* <TextField
                        label="Description"
                        value={state.description}
                        onChange={(e) => handleChange(e.target.value, "description")}
                        fullWidth
                        required
                    /> */}
          <DateTimePickerValue
            orientation="landscape"
            start={state.start_date}
            end={state.end_date}
            required
          />
          <TextField
            label="Member"
            value={state.member_id}
            onChange={(e) => handleChange(e.target.value, "member_id")}
            required
            select
          >
            {members.map((value) => {
              const key = Object.keys(value)[0];
              return <MenuItem value={key}>{value[key]}</MenuItem>;
            })}
          </TextField>

          <TextField
            label="Coach"
            value={state.coach_id}
            onChange={(e) => handleChange(e.target.value, "coach_id")}
            required
            select
          >
            {coaches.map((value) => {
              const key = Object.keys(value)[0];
              return <MenuItem value={key}>{value[key]}</MenuItem>;
            })}
          </TextField>

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
