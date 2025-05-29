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
    start_date: event?.start
      ? dayjs(event.start)
      : dayjs(scheduler.state?.start.value),
    end_date: event?.end
      ? dayjs(event.end)
      : dayjs(scheduler.state?.start.value).add(1, "hour"),
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    color: "",
    coach_id: "",
    member_id: "",
    start_date: "",
    end_date: "",
  });

  // Validate single field on change
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
        if (!value.trim()) error = "Title is required.";
        break;
      case "color":
        if (!value) error = "Color is required.";
        break;
      case "member_id":
        if (!value) error = "Member is required.";
        break;
      case "coach_id":
        if (!value) error = "Coach is required.";
        break;
      case "start_date":
        if (!value || !dayjs(value).isValid())
          error = "Start date is required.";
        else if (
          state.end_date &&
          dayjs(value).isValid() &&
          dayjs(state.end_date).isValid() &&
          dayjs(value).isAfter(dayjs(state.end_date))
        ) {
          error = "Start date must be before end date.";
        }
        break;
      case "end_date":
        if (!value || !dayjs(value).isValid()) error = "End date is required.";
        else if (
          state.start_date &&
          dayjs(state.start_date).isValid() &&
          dayjs(value).isValid() &&
          dayjs(state.start_date).isAfter(dayjs(value))
        ) {
          error = "End date must be after start date.";
        }
        break;
      default:
        break;
    }

    return error;
  };

  // Handle changes with validation
  const handleChange = (value, name) => {
    setState((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Full form validation on submit
  const validateForm = () => {
    const errors = {};

    errors.title = validateField("title", state.title);
    errors.color = validateField("color", state.color);
    errors.member_id = validateField("member_id", state.member_id);
    errors.coach_id = validateField("coach_id", state.coach_id);
    errors.start_date = validateField("start_date", state.start_date);
    errors.end_date = validateField("end_date", state.end_date);

    // Remove empty errors
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) delete errors[key];
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Disable confirm button if form invalid
  const isFormValid =
    !Object.values(formErrors).some((e) => e) &&
    state.title.trim() &&
    state.color &&
    state.member_id &&
    state.coach_id &&
    dayjs(state.start_date).isValid() &&
    dayjs(state.end_date).isValid() &&
    dayjs(state.start_date).isBefore(dayjs(state.end_date));

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      scheduler.loading(true);
      const added_updated_event = {
        event_id: event?.event_id || state.id,
        title: state.title,
        color: state.color,
        coach_id: state.coach_id,
        member_id: state.member_id,
        start: state.start_date.toDate(),
        end: state.end_date.toDate(),
      };

      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");

      await axios_function(
        "POST",
        `http://localhost/Projects/CSSLTD-GYM/Backend/appointment/${
          event ? "update" : "create"
        }`,
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
        <DemoContainer components={["TextField", "DateTimePicker", "Select"]}>
          <TextField
            label="Title"
            value={state.title}
            onChange={(e) => handleChange(e.target.value, "title")}
            fullWidth
            required
            error={!!formErrors.title}
            helperText={formErrors.title}
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
                  slotProps={{
                    textField: {
                      error: !!formErrors.start_date,
                      helperText: formErrors.start_date,
                    },
                  }}
                />
                <DateTimePicker
                  label="End Date Time"
                  value={state.end_date}
                  onChange={(newValue) =>
                    handleChange(dayjs(newValue), "end_date")
                  }
                  slotProps={{
                    textField: {
                      error: !!formErrors.end_date,
                      helperText: formErrors.end_date,
                    },
                  }}
                />
              </div>
            </DemoContainer>
          </LocalizationProvider>

          <Autocomplete
            options={members}
            getOptionLabel={(option) => option.full_name}
            value={members.find((m) => m.id === state.member_id) || null}
            onChange={(e, member) =>
              handleChange(member ? member.id : "", "member_id")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Member"
                required
                fullWidth
                error={!!formErrors.member_id}
                helperText={formErrors.member_id}
              />
            )}
          />

          <Autocomplete
            options={coaches}
            getOptionLabel={(coach) => coach.full_name}
            value={coaches.find((c) => c.id === state.coach_id) || null}
            onChange={(e, coach) =>
              handleChange(coach ? coach.id : "", "coach_id")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Coach"
                required
                fullWidth
                error={!!formErrors.coach_id}
                helperText={formErrors.coach_id}
              />
            )}
          />

          {/* <TextField
            label="Color"
            value={state.color}
            onChange={(e) => handleChange(e.target.value, "color")}
            required
            select
            error={!!formErrors.color}
            helperText={formErrors.color}
          >
            <MenuItem value={"red"}>Red</MenuItem>
            <MenuItem value={"green"}>Green</MenuItem>
            <MenuItem value={"blue"}>Blue</MenuItem>
          </TextField> */}
          <TextField
            label="Color"
            type="color"
            value={state.color || "#000000"}
            onChange={(e) => handleChange(e.target.value, "color")}
            required
            error={!!formErrors.color}
            helperText={formErrors.color}
          />
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
