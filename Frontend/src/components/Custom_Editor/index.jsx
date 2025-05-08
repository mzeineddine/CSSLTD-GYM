import { useState } from "react";
import { TextField, Button, DialogActions, Select, MenuItem, InputLabel } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export  function DateTimePickerValue(props) {
    const [start, setStart] = useState(dayjs(props.start));
    const [end, setEnd] = useState(dayjs(props.end));
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
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


const Custom_Editor = ({ scheduler, coaches }) => {
    const event = scheduler.edited;
    // Make your own form/state
    const [state, setState] = useState({
        title: event?.title || "",
        description: event?.description || "",
        color: event?.color || "",
        coach: event?.coach || "",
        start_date_time: scheduler.state.start.value,
        end_date_time: scheduler.state.end.value
    });
    const [error, setError] = useState("");
    const handleChange = (value, name) => {
        setState((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };
    const handleSubmit = async () => {
        // Your own validation
        if (state.title.length < 3) {
            return setError("Min 3 letters");
        }
        try {
            scheduler.loading(true);
            /**Simulate remote data saving */
            const added_updated_event = (await new Promise((res) => {
                /**
                 * Make sure the event have 4 mandatory fields
                 * event_id: string|number
                 * title: string
                 * start: Date|string
                 * end: Date|string
                 */
                res({
                    event_id: event?.event_id || Math.random(),
                    title: state.title,
                    description: state.description,
                    color:state.color,
                    start: state.start_date_time,
                    end: state.end_date_time
                });
            }));
            scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
            scheduler.close();
        } finally {
            scheduler.loading(false);
        }
    };
    return (
        <div>
            <div className=" flex-col h-full gap-1 justify-center items-center p-2">
                <p>Load your custom form/fields</p>
                <DemoContainer components={['TextField', 'TextField', 'DateTimePickerValue,Select,Select']}>
                    <TextField
                        label="Title"
                        value={state.title}
                        onChange={(e) => handleChange(e.target.value, "title")}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Description"
                        value={state.description}
                        onChange={(e) => handleChange(e.target.value, "description")}
                        fullWidth
                        required
                    />
                    <DateTimePickerValue 
                        orientation="landscape" 
                        start={state.start_date_time} 
                        end={state.end_date_time}
                        required
                    />
                    <TextField 
                        label="Coach"
                        value={state.coach}
                        onChange={(e) => handleChange(e.target.value, "coach")}
                        required
                        select
                    >
                        {coaches.map((value) => {
                            return(<MenuItem value={value}>{value}</MenuItem>);
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
export default Custom_Editor