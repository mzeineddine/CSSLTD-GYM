import { useContext, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { axios_function } from "../../utilities/axios";
import { Members_Context } from "../../context/Members_Context";
import { Staffs_Context } from "../../context/Staffs_Context";
import { Coaches_Context } from "../../context/Coaches_Context";
import { Expenses_Context } from "../../context/Expenses_Context";
import { PaymentAccounts_Context } from "../../context/PaymentAccounts_Context";
import { ExpensePayments_Context } from "../../context/ExpensePayments_Context";
import { SubscriptionPayments_Context } from "../../context/SubscriptionPayments_Context";
import { Categories_Context } from "../../context/Categories_Context";
import SnackBar from "../Snackbar";
import { Subscriptions_Context } from "../../context/Subscriptions_Context";

const Edit_Popup = ({
  name,
  open,
  onClose,
  fields,
  options = {},
  filled_field = {},
}) => {
  const defaultValues = {};
  const defaultErrors = {};

  for (const [key, type] of Object.entries(fields)) {
    defaultValues[key] = type === "date" ? dayjs() : "";
    defaultErrors[key] = "";
  }

  for (const [key, val] of Object.entries(filled_field)) {
    defaultValues[key] = fields[key] === "date" ? dayjs(val) : val;
    if (key == "type") {
      if (val == "Month") {
        defaultValues["type"] = 0;
      } else if (val == "Class") {
        defaultValues["type"] = 1;
      }
    } else if (key == "access_level") {
      if (val == "Admin") {
        defaultValues["access_level"] = 1;
      } else if (val == "User") {
        defaultValues["access_level"] = 2;
      } else if (val == "Supervisor") {
        defaultValues["access_level"] = 3;
      } else if (val == "Manager") {
        defaultValues["access_level"] = 4;
      } else if (val == "Auditor") {
        defaultValues["access_level"] = 5;
      }
    } else if (key == "status") {
      if (val == "active") {
        defaultValues["status"] = 0;
      } else if (val == "inactive") {
        defaultValues["status"] = 1;
      }
    }
  }

  const [formData, setFormData] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState(defaultErrors);

  useEffect(() => {
    setFormData(defaultValues);
    setFormErrors(defaultErrors);
  }, [filled_field]);

  const {
    update_members,
    update_staffs,
    update_coaches,
    update_categories,
    update_expenses,
    update_paymentAccounts,
    update_expensePayments,
    update_subscriptionPayments,
    update_subscriptions,
  } = {
    ...useContext(Members_Context),
    ...useContext(Staffs_Context),
    ...useContext(Coaches_Context),
    ...useContext(Categories_Context),
    ...useContext(Expenses_Context),
    ...useContext(PaymentAccounts_Context),
    ...useContext(ExpensePayments_Context),
    ...useContext(SubscriptionPayments_Context),
    ...useContext(Subscriptions_Context),
  };
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [success, setSuccess] = useState(false);
  const validateField = (key, value, type) => {
    if (type === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Invalid email format";
    }
    if (type === "password") {
      return value.length >= 6 ? "" : "Password must be at least 6 characters";
    }
    if (type === "number") {
      return !isNaN(value) && value !== "" ? "" : "Must be a valid number";
    }
    if (type === "select") {
      return value || value == 0 ? "" : "Selection required.";
    }
    if (type === "dropdown") {
      return value || value == 0 ? "" : "Selection required.";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    for (const [key, type] of Object.entries(fields)) {
      const err = validateField(key, formData[key], type);
      newErrors[key] = err;
      if (err) valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const endpoint = name === "staff" ? "user" : name.toLowerCase();

    const payload = { ...formData };
    if (fields["date"]) {
      payload["date"] = formData["date"]?.toISOString?.();
    }

    if (name.toLowerCase() === "member") {
      const response = await axios_function(
        "POST",
        `http://localhost/Projects/CSSLTD-GYM/Backend/${endpoint}/update`,
        payload
      );
      if (response.result) {
        console.log(response.message);
        setMessage(response.message);
        setOpenSnack(true);
        setSuccess(true);
        // const response_1 = await axios_function(
        //   "POST",
        //   "http://localhost/Projects/CSSLTD-GYM/Backend/subscription/update",
        //   {
        //     ...formData,
        //     member_id: response.result,
        //   }
        // );
        // if (response_1.result) {
        //   setMessage(response_1.message);
        //   setOpenSnack(true);
        //   setSuccess(true);
        // } else {
        //   setMessage(response_1.message);
        //   setOpenSnack(true);
        //   setSuccess(false);
        // }
      } else {
        setMessage(response.message);
        setOpenSnack(true);
        setSuccess(false);
      }
    } else {
      const response = await axios_function(
        "POST",
        `http://localhost/Projects/CSSLTD-GYM/Backend/${endpoint}/update`,
        payload
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

    switch (name.toLowerCase()) {
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
        break;
      case "payment_account":
        update_paymentAccounts();
        break;
      case "category":
        update_categories();
        break;
      case "subscription_payment":
        update_members();
        update_subscriptionPayments();
        break;
      case "expense_payment":
        update_expenses();
        update_expensePayments();
        break;
      case "subscription":
        update_subscriptions();
        update_members();
        break;
    }

    setTimeout(function () {
      onClose();
    }, 2000);
    setFormData(defaultValues);
    setFormErrors(defaultErrors);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        <Typography variant="h6">{`Edit ${
          name === "User" ? "Staff" : name
        }`}</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <div className="flex flex-row flex-wrap justify-between items-end w-full gap-0.5">
          {Object.entries(fields).map(([k, v]) => {
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
                  <TextField key={k} type="email" {...commonProps} />
                ) : v === "password" ? (
                  <TextField key={k} type="password" {...commonProps} />
                ) : v === "number" ? (
                  <TextField key={k} type="number" {...commonProps} />
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
                    // required
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
                      const updated = {
                        ...formData,
                        [k]: selectedOption?.id || "",
                      };
                      if (
                        (name.toLowerCase() === "member" ||
                          name.toLowerCase() === "subscription") &&
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
                      value={formData[k]}
                      label={k}
                      onChange={(e) => {
                        const val = e.target.value;
                        console.log(val);
                        const updated = { ...formData, [k]: val };
                        const selectedOption = options[k]?.find(
                          (o) => o.id === val
                        );
                        if (
                          (name.toLowerCase() === "member" ||
                            name.toLowerCase() === "subscription") &&
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
            onClose();
            setFormData(defaultValues);
            setFormErrors(defaultErrors);
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
export default Edit_Popup;
