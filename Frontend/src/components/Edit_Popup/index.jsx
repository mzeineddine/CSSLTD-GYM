import { useContext, useState } from "react";
import "./add_popup.css";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { axios_function } from "../../utilities/axios";
import { Members_Context } from "../../context/Members_Context";
import { Staffs_Context } from "../../context/Staffs_Context";
import { Coaches_Context } from "../../context/Coaches_Context";
import { Expenses_Context } from "../../context/Expenses_Context";
import { PaymentAccounts_Context } from "../../context/PaymentAccounts_Context";

// import CloseIcon from '@mui/icons-material';
const Edit_Popup = (props) => {
  const default_values = {};
  for (let [key, value] of Object.entries(props.fields)) {
    if (value == "date") {
      default_values[key] = dayjs();
      continue;
    }
    default_values[key] = "";
  }
  if (props.filled_field) {
    for (let [key, value] of Object.entries(props.filled_field)) {
      default_values[key] = value;
    }
  }
  const [formData, setFormData] = useState(default_values);
  console.log(formData);
  const { update_members } = useContext(Members_Context);
  const { update_staffs } = useContext(Staffs_Context);
  const { update_coaches } = useContext(Coaches_Context);
  const { update_expenses } = useContext(Expenses_Context);
  const { update_paymentAccounts } = useContext(PaymentAccounts_Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let name = props.name;
    if (props.name == "staff") {
      name = "user";
    }
    console.log(name.toLowerCase());
    await axios_function(
      "POST",
      "http://localhost/Projects/CSSLTD-GYM/Backend/" +
        name.toLowerCase() +
        "/update",
      formData
    );
    console.log("form submitted");
    if (props.name.toLowerCase() == "member") {
      update_members();
    } else if (props.name.toLowerCase() == "user") {
      update_staffs();
    } else if (props.name.toLowerCase() == "coach") {
      update_coaches();
    } else if (props.name.toLowerCase() == "expense") {
      update_expenses();
    } else if (
      props.name.toLowerCase() == "payment_account" ||
      props.name.toLowerCase() == "expense_payment"
    ) {
      update_paymentAccounts();
    }
    setFormData(default_values);
    props.onClose();
  };
  const title = "Add " + props.name == "User" ? "Staff" : props.name;
  const options = props.options;
  return (
    <Dialog open={props.open}>
      <DialogTitle>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <div className="flex flex-row flex-wrap justify-between items-end w-full gap-0.5">
          {Object.entries(props.fields).map(([k, v]) => {
            let isSelect = false;
            let isTextArea = false;
            let isNumber = false;
            let isDate = false;
            let isEmail = false;
            let isPassword = false;
            if (v == "email") {
              isEmail = true;
            } else if (v == "password") {
              isPassword = true;
            } else if (v == "select") {
              isSelect = true;
            } else if (v == "text-area") {
              isTextArea = true;
            } else if (v == "date") {
              isDate = true;
            } else if (v == "number") {
              isNumber = true;
            }
            return (
              <div key={k} className="w-[49%] flex-1/3">
                <Box component="form" autoComplete="off">
                  {isEmail ? (
                    <TextField
                      fullWidth
                      label={k}
                      type="email"
                      value={formData[k]}
                      onChange={(e) => {
                        setFormData({ ...formData, [k]: e.target.value });
                      }}
                      required
                    ></TextField>
                  ) : isPassword ? (
                    <TextField
                      fullWidth
                      label={k}
                      type="password"
                      value={formData[k]}
                      onChange={(e) => {
                        setFormData({ ...formData, [k]: e.target.value });
                      }}
                      required
                    />
                  ) : isDate ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DatePicker
                          label="Start Date Time"
                          value={formData[k]}
                          onChange={(newValue) => {
                            setFormData({ ...formData, [k]: newValue });
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  ) : isTextArea ? (
                    <Textarea
                      minRows={2}
                      label={k}
                      value={formData[k]}
                      onChange={(e) => {
                        setFormData({ ...formData, [k]: e.target.value });
                      }}
                      required
                      placeholder="Comment"
                    />
                  ) : isNumber ? (
                    <TextField
                      fullWidth
                      label={k}
                      type="number"
                      value={formData[k]}
                      onChange={(e) => {
                        setFormData({ ...formData, [k]: e.target.value });
                      }}
                      required
                    ></TextField>
                  ) : isSelect ? (
                    <TextField
                      fullWidth
                      label={k}
                      value={formData[k]}
                      onChange={(e) => {
                        setFormData({ ...formData, [k]: e.target.value });
                      }}
                      required
                      select
                    >
                      {options &&
                        options.map((value) => {
                          return (
                            <MenuItem value={value.id}>{value.name}</MenuItem>
                          );
                        })}
                    </TextField>
                  ) : (
                    <TextField
                      fullWidth
                      label={k}
                      value={formData[k]}
                      onChange={(e) => {
                        setFormData({ ...formData, [k]: e.target.value });
                      }}
                      required
                    ></TextField>
                  )}
                </Box>
              </div>
            );
          })}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.onClose();
            setFormData(default_values);
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};
export default Edit_Popup;
