import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Avatar,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import UploadIcon from "@mui/icons-material/Upload";
import { axios_function } from "../../utilities/axios";

const Settings = () => {
  const [formData, setFormData] = useState({
    logo: "",
    file_name: "",
    logoPreview: "",
    name: "",
    phone_nb: "",
  });

  const getData = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/global_setting/read",
      { id: 1 }
    );
    // setFormData({...formData, response})
    setFormData({
      ...formData,
      ...response.data[0],
      logoPreview: response.data[0].logo,
    });
  };
  useEffect(() => {
    getData();
    // setFormData({...formData, data});
  }, []);
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          file_name: file.name,
          logo: reader.result,
          logoPreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        logo: null,
        logoPreview: null,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios_function(
      "POST",
      "http://localhost/Projects/CSSLTD-GYM/Backend/global_setting/update",
      formData
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "96%",
        margin: "2%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        justifyContent: "center",
        backgroundColor: "rgb(250, 250, 250)",
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" align="center">
        Company Information
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          src={"http://localhost/Projects/CSSLTD-GYM/"+formData.logoPreview || ""}
          alt="Logo Preview"
          sx={{ width: 64, height: 64 }}
        />
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadIcon />}
          sx={{
            backgroundColor: "blueviolet",
          }}
        >
          Upload Logo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleLogoChange}
          />
        </Button>
      </Box>
      <TextField
        label="Company Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        variant="outlined"
        fullWidth
        required
        sx={{
          m: 0,
          p: 0,
          "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "blueviolet",
            },
          },
          "& .Mui-focused.MuiInputLabel-root": {
            color: "blueviolet",
          },
        }}
      />
      <TextField
        label="Phone Number"
        value={formData.phone_nb}
        onChange={(e) => setFormData({ ...formData, phone_nb: e.target.value })}
        variant="outlined"
        fullWidth
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          m: 0,
          p: 0,
          "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "blueviolet",
            },
          },
          "& .Mui-focused.MuiInputLabel-root": {
            color: "blueviolet",
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "blueviolet",
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Settings;
