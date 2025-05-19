import React, { useState } from "react";
import "./login.css";
import Logo from "./../../assets/logo.png";
import Land_image from "./../../assets/land_image.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Edit_Popup from "../../components/Edit_Popup";
import FormDialog from "../../components/Form_Dailog";
import { axios_function } from "../../utilities/axios";
const LoginPage = () => {
  const logo = Logo;
  const gym_description =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, rerum corporis voluptas unde, aspernatur maiores debitis tenetur ab veniam optio sit laborum, dolores maxime? Accusantium iure similique ipsam ipsa explicabo.";
  const gym_image = Land_image;
  const gym_name = "CSSLTD";
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({
    email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
    password: localStorage.getItem("password")
      ? localStorage.getItem("password")
      : "",
    is_remember: false,
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleForgot = async (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const onSubmit_handler = async (event) => {
    event.preventDefault();
    let response = await axios_function(
      "POST",
      "http://localhost/Projects/CSSLTD-GYM/Backend/user/login",
      form
    );
    if (response.result) {
      localStorage.setItem("access-token", response.token);
      localStorage.setItem("user_name", response.data.username);
      navigate("/home");
    }
    if (form.is_remember) {
      localStorage.setItem("email", form.email);
      localStorage.setItem("password", form.password);
    }
    setForm({ email: "", password: "", is_remember: false });
  };
  return (
    <div className="login-container">
      <div className="left-side">
        <div className="logo-section">
          <img src={logo} alt="Gym Logo" className="logo" />
          <h2 className="tagline">{gym_description}</h2>
          <img src={gym_image} alt="Gym Image" className="illustration" />
        </div>
      </div>

      <div className="right-side">
        <div className="login-form">
          <div className="title">
            <h2>
              Welcome To <span className="highlight">{gym_name}</span>
            </h2>
            <h3>Sign In</h3>
          </div>
          <form onSubmit={onSubmit_handler}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
              placeholder="Email"
            />
            <input
              type="password"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
              placeholder="Password"
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
              <button
                style={{ backgroundColor: "transparent", color: "blueviolet" }}
                onClick={handleForgot}
              >
                Forgot Password?
              </button>
              {showEdit && (
                <Edit_Popup
                  open={showEdit}
                  name={"user"}
                  onClose={() => {
                    setShowEdit(false);
                  }}
                  fields={{ email: "email", password: "password" }}
                  filled_field={{ email: form.email }}
                />
              )}
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      <FormDialog
        title={"Reset Password"}
        handleClose={handleClose}
        submit_text={"Reset"}
        open={open}
        message={
          "Enter Your Email and then submit the form to get the reset link by the passed email"
        }
      />
    </div>
  );
};

export default LoginPage;
