import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { axios_function } from "../../utilities/axios";

export default function FormDialog(props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios_function(
        "post",
        "http://localhost/Projects/CSSLTD-GYM/Backend/user/reset_password",
        { email: email }
      );
      if (response.result) {
        console.log(response.message);
      } else {
        console.log("ERROR", response.message);
      }
      props.handleClose();
      setEmail(""); // Clear after success
    } catch (error) {
      console.error("Failed to send reset request:", error);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.message}</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!!emailError || email === ""}
          >
            {props.submit_text}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
