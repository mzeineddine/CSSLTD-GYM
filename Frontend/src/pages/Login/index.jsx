import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import Logo from "./../../assets/logo.png";
import Land_image from "./../../assets/land_image.png";
import { useNavigate } from "react-router-dom";
import Edit_Popup from "../../components/Edit_Popup";
import FormDialog from "../../components/Form_Dailog";
import { axios_function } from "../../utilities/axios";
import {
  useMediaQuery,
  TextField,
  Button,
  Typography,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import { GeneralSettings_Context } from "../../context/GeneralSettings_Context";

const LoginPage = () => {
  const { generalSettings, update_generalSettings } = useContext(
    GeneralSettings_Context
  );
  const [logoUrl, setLogoUrl] = useState("#");

  useEffect(() => {
    if (!generalSettings) update_generalSettings();
  }, []);
  useEffect(() => {
    setLogoUrl("http://localhost/Projects/CSSLTD-GYM/" + generalSettings?.logo);
  }, [generalSettings]);

  const gym_description =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis nisi, natus maiores ipsum corporis odio, voluptatum dicta tempore laudantium fugiat repellat quia animi deleniti illum. Unde velit fugit ex similique.";
  const gym_image = Land_image;
  const gym_name = "CSSLTD";

  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({
    email: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
    is_remember: false,
  });
  const [emailError, setEmailError] = useState("");
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 800px)");
  const [showLeft, setShowLeft] = useState(!isMobile);

  useEffect(() => {
    setShowLeft(!isMobile);
  }, [isMobile]);

  const navigate = useNavigate();

  const handleClose = () => setOpen(false);
  const handleForgot = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [errorMessage, setErrorMessage] = useState("");
  const [openError, setOpenError] = useState(false);

  const onSubmit_handler = async (e) => {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const response = await axios_function(
      "POST",
      "http://localhost/Projects/CSSLTD-GYM/Backend/user/login",
      form
    );
    if (response.result) {
      console.log(response.message);
    } else {
      console.log("ERROR", );
      setErrorMessage(response.message);
      setOpenError(true);
    }
    if (response.result) {
      localStorage.setItem("access-token", response.token);
      localStorage.setItem("user_name", response.data.username);
      if (form.is_remember) {
        localStorage.setItem("email", form.email);
        localStorage.setItem("password", form.password);
      }
      setForm({ email: "", password: "", is_remember: false });
      navigate("/home");
    }
  };

  return (
    <div className="login-container">
      {showLeft && (
        <div className="left-side">
          <div className="logo-section">
            {/* <img src={logoUrl} alt="Gym Logo" className="logo" /> */}
            {generalSettings && (
              <Avatar
                src={logoUrl}
                alt="Logo Preview"
                sx={{
                  width: "40%",
                  maxWidth: "500px",
                  height: "40%",
                  borderRadius: 0,
                }}
              />
            )}
            <h2 className="tagline">{gym_description}</h2>
            <img
              src={gym_image}
              alt="Gym Illustration"
              className="illustration"
            />
          </div>
        </div>
      )}

      <div className="right-side">
        <div className="login-form h-[50%] flex flex-col justify-between items-start">
          {/* <div className="title"> */}
          <Typography variant="h4" gutterBottom>
            Welcome to <span className="highlight">{gym_name}</span>
          </Typography>
          <Typography variant="h6" gutterBottom>
            Sign In
          </Typography>
          {/* </div> */}
          <form
            onSubmit={onSubmit_handler}
            className="w-full h-full flex flex-col justify-between"
          >
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={form.email}
              error={!!emailError}
              helperText={emailError}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (emailError && validateEmail(e.target.value)) {
                  setEmailError("");
                }
              }}
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <div className="options">
              <div className="remember-me">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={form.is_remember}
                    onChange={(e) => {
                      setForm({ ...form, is_remember: e.target.checked });
                    }}
                  />
                  <span className="slider"></span>
                </label>
                <span className="remember-text">Remember Me</span>
              </div>
              <span className="highlight" onClick={handleForgot}>
                Forgot Password?
              </span>
              {showEdit && (
                <Edit_Popup
                  open={showEdit}
                  name="user"
                  onClose={() => setShowEdit(false)}
                  fields={{ email: "email", password: "password" }}
                  filled_field={{ email: form.email }}
                />
              )}
            </div>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                backgroundColor: "blueviolet",
                ":hover": { backgroundColor: "rgb(150, 55, 240);" },
              }}
            >
              Login
            </Button>
          </form>
        </div>
      </div>

      <FormDialog
        title="Reset Password"
        handleClose={handleClose}
        submit_text="Reset"
        open={open}
        message="Enter your email and submit to receive a password reset link."
      />
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginPage;
