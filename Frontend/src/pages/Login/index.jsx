import React, { useEffect, useState } from "react";
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
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";

const LoginPage = () => {
  const logo = Logo;
  const gym_description =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit...";
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
            <img src={logo} alt="Gym Logo" className="logo" />
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
        <div className="login-form">
          <div className="title">
            <Typography variant="h4" gutterBottom>
              Welcome to <span className="highlight">{gym_name}</span>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Sign In
            </Typography>
          </div>
          <form onSubmit={onSubmit_handler} style={{ width: "100%" }}>
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

            <div className="options" style={{ marginTop: "0.5rem" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.is_remember}
                    onChange={(e) =>
                      setForm({ ...form, is_remember: e.target.checked })
                    }
                    color="primary"
                  />
                }
                label="Remember Me"
              />

              <Button
                variant="text"
                color="secondary"
                onClick={handleForgot}
                sx={{ marginLeft: "auto", textTransform: "none" }}
              >
                Forgot Password?
              </Button>

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
              sx={{ mt: 2 }}
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
    </div>
  );
};

export default LoginPage;
