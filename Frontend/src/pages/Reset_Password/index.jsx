import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { axios_function } from "../../utilities/axios";

const Reset_Password = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleClick = async () => {
    let response = await axios_function(
      "POST",
      "http://localhost/Projects/CSSLTD-GYM/Backend/user/reset",
      formData
    );
    alert(response.message)
  };
  return (
    <div className="reset-password w-[100%] flex flex-col justify-center items-center">
      <div className="form w-[50%] flex flex-col justify-center items-center bg-gray-50 rounded-2xl m-2">
        <div className="email w-[90%] p-2 flex flex-col gap-2">
          <TextField
            required={true}
            fullWidth={true}
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <TextField
            required={true}
            fullWidth={true}
            label="Password"
            type="Password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          <Button onClick={handleClick}>Reset</Button>
        </div>
      </div>
    </div>
  );
};

export default Reset_Password;
