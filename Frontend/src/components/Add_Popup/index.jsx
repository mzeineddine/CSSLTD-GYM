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
  Autocomplete,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
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
import { ExpensePayments_Context } from "../../context/ExpensePayments_Context";
import { Categories_Context } from "../../context/Categories_Context";
import SnackBar from "../Snackbar";
import { Subscriptions_Context } from "../../context/Subscriptions_Context";

// import CloseIcon from '@mui/icons-material';
const Add_Popup = (props) => {
  const default_values = {};
  const default_errors = {};
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [success, setSuccess] = useState(false);
  for (let [key, value] of Object.entries(props.fields)) {
    if (value === "date") {
      default_values[key] = dayjs();
    } else {
      default_values[key] = "";
    }
    default_errors[key] = "";
  }

  if (props.filled_field) {
    for (let [key, value] of Object.entries(props.filled_field)) {
      default_values[key] = value;
    }
  }

  const [formData, setFormData] = useState(default_values);
  const [formErrors, setFormErrors] = useState(default_errors);

  // Contexts
  const { update_members } = useContext(Members_Context);
  const { update_staffs } = useContext(Staffs_Context);
  const { update_coaches } = useContext(Coaches_Context);
  const { update_categories } = useContext(Categories_Context);
  const { update_expenses } = useContext(Expenses_Context);
  const { update_paymentAccounts } = useContext(PaymentAccounts_Context);
  const { update_expensePayments } = useContext(ExpensePayments_Context);
  const { update_subscriptions } = useContext(Subscriptions_Context);


  const validateField = (key, value, type) => {
    if (type === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Invalid email format.";
    }
    if (type === "password") {
      return value.length < 6 ? "Password must be at least 6 characters." : "";
    }
    if (type === "number") {
      return value === "" || isNaN(value) ? "Must be a number." : "";
    }
    if (type === "text-area" || type === "text") {
      return value.trim() === "" ? "This field is required." : "";
    }
    if (type === "select") {
      return value || value == 0 ? "" : "Selection required.";
    }
    if (type === "dropdown") {
      return value || value == 0 ? "" : "Selection required.";
    }
    return "";
  };

  const validateAllFields = () => {
    let hasError = false;
    const newErrors = {};

    Object.entries(props.fields).forEach(([key, type]) => {
      const error = validateField(key, formData[key], type);
      if (error) hasError = true;
      newErrors[key] = error;
    });

    setFormErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!validateAllFields()) return;

    let name = props.name === "staff" ? "user" : props.name;
    const isMember = props.name.toLowerCase() === "member";

    try {
      if (isMember) {
        const response = await axios_function(
          "POST",
          `http://localhost/Projects/CSSLTD-GYM/Backend/${name.toLowerCase()}/create`,
          formData
        );
        if (response.result) {
          const response_1 = await axios_function(
            "POST",
            `http://localhost/Projects/CSSLTD-GYM/Backend/subscription/create`,
            { ...formData, member_id: response.result }
          );
          if (response_1.result) {
            setMessage(response_1.message);
            setOpenSnack(true);
            setSuccess(true);
          } else {
            setMessage(response_1.message);
            setOpenSnack(true);
            setSuccess(false);
          }
        } else {
          setMessage(response.message);
          setOpenSnack(true);
          setSuccess(false);
        }
      } else {
        const response = await axios_function(
          "POST",
          `http://localhost/Projects/CSSLTD-GYM/Backend/${name.toLowerCase()}/create`,
          formData
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
      }
      switch (props.name.toLowerCase()) {
        case "subscription_payment":
        case "member":
          update_members();
          break;
        case "user":
          update_staffs();
          break;
        case "coach":
          update_coaches();
          break;
        case "expense":
          update_expenses();
          update_paymentAccounts();
          break;
        case "payment_account":
        case "expense_payment":
          update_paymentAccounts();
          break;
        case "category":
          update_categories();
          break;
        case "subscription":
          update_subscriptions(formData.member_id);
          update_members();
          break;
      }
      if (props.name.toLowerCase() === "expense_payment")
        update_expensePayments();

      setFormData(default_values);
      setFormErrors(default_errors);
      setTimeout(function () {
        props.onClose();
      }, 2000);
    } catch (error) {
      console.error("Submit failed", error);
    }
  };

  const title = props.name === "User" ? "Add Staff" : "Add " + props.name;
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
            const commonProps = {
              fullWidth: true,
              label: k.split("_").join(" "),
              value: formData[k],
              error: !!formErrors[k],
              helperText: formErrors[k],
              required: true,
              onChange: (e) => {
                const val = e.target.value;
                setFormData({ ...formData, [k]: val });
                setFormErrors({ ...formErrors, [k]: validateField(k, val, v) });
              },
            };
            return (
              <div key={k} className="w-[49%] flex-1/3">
                {v === "email" ? (
                  <TextField key={k} type="email" {...commonProps} required />
                ) : v === "password" ? (
                  <TextField
                    key={k}
                    type="password"
                    {...commonProps}
                    required
                  />
                ) : v === "number" ? (
                  <TextField key={k} type="number" {...commonProps} required />
                ) : v === "date" ? (
                  <LocalizationProvider key={k} dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        sx={{ width: "100%" }}
                        label={k.split("_").join(" ")}
                        value={formData[k]}
                        onChange={(newValue) => {
                          setFormData({ ...formData, [k]: newValue });
                          setFormErrors({ ...formErrors, [k]: "" });
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                ) : v === "text-area" ? (
                  <Textarea
                    key={k}
                    minRows={2}
                    placeholder={k}
                    value={formData[k]}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData({ ...formData, [k]: val });
                      setFormErrors({
                        ...formErrors,
                        [k]: validateField(k, val, v),
                      });
                    }}
                    required
                  />
                ) : v === "select" ? (
                  <Autocomplete
                    key={k}
                    options={options[k] || []}
                    getOptionLabel={(opt) => opt.name || ""}
                    isOptionEqualToValue={(opt, val) => opt.id === val.id}
                    value={
                      options[k]?.find((o) => o.id === formData[k]) || null
                    }
                    onChange={(e, selectedOption) => {
                      console.log(formData);
                      const updated = {
                        ...formData,
                        [k]: selectedOption?.id || "",
                      };
                      if (
                        (props.name.toLowerCase() === "member" ||
                          props.name.toLowerCase() === "subscription") &&
                        selectedOption?.price
                      ) {
                        updated.cost = selectedOption.price;
                      }
                      setFormData(updated);
                      setFormErrors({
                        ...formErrors,
                        [k]: selectedOption ? "" : "Required field.",
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={k.split("_").join(" ")}
                        error={!!formErrors[k]}
                        helperText={formErrors[k]}
                        required
                      />
                    )}
                  />
                ) : v === "dropdown" ? (
                  <FormControl fullWidth required error={!!formErrors[k]}>
                    <InputLabel>{k.split("_").join(" ")}</InputLabel>
                    <Select
                      required
                      value={formData[k]}
                      label={k}
                      onChange={(e) => {
                        console.log(formData);
                        const val = e.target.value;
                        // console.log(val);
                        const updated = { ...formData, [k]: val };
                        const selectedOption = options[k]?.find(
                          (o) => o.id === val
                        );
                        if (
                          (props.name.toLowerCase() === "member" ||
                            props.name.toLowerCase() === "subscription") &&
                          selectedOption?.price
                        ) {
                          updated.cost = selectedOption.price;
                        }

                        setFormData(updated);
                        setFormErrors({
                          ...formErrors,
                          [k]: val || val == 0 ? "" : "Required field.",
                        });
                      }}
                    >
                      {options[k]?.map((option) => {
                        // const not_from_context = k == "type" || k == "status";
                        const not_from_context = false;
                        // console.log({ not_from_context });
                        return (
                          <MenuItem
                            key={option.id}
                            value={not_from_context ? option.id - 1 : option.id}
                          >
                            {option.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{formErrors[k]}</FormHelperText>
                  </FormControl>
                ) : (
                  <TextField key={k} type="text" {...commonProps} />
                )}
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
            setFormErrors(default_errors);
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
      <SnackBar
        success={success}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
        message={message}
      />
    </Dialog>
  );
};
export default Add_Popup;
