import React, { useContext, useEffect, useState } from "react";
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
import { GeneralSettings_Context } from "../../context/GeneralSettings_Context";
import { Accesses_Context } from "../../context/Access_Context";

const Settings = () => {
  const { generalSettings, update_generalSettings } = useContext(
    GeneralSettings_Context
  );
  const { accesses, update_accesses } = useContext(Accesses_Context);
  const [access, setAccess] = useState(null);
  if (!accesses) update_accesses();
  useEffect(() => {
    if (!accesses) return;

    const newAccess = {
      create: false,
      view: false,
      edit: false,
      delete: false,
    };

    accesses.forEach((acc) => {
      if (acc.page === "settings") {
        if (acc.action == "1") newAccess.create = true;
        if (acc.action == "2") newAccess.view = true;
        if (acc.action == "3") newAccess.edit = true;
        if (acc.action == "4") newAccess.delete = true;
      }
    });

    setAccess(newAccess);
  }, [accesses]);
  const [formData, setFormData] = useState({
    logo: "",
    file_name: "",
    logoPreview: "",
    name: "",
    phone_nb: "",
  });

  const getData = async () => {
    if (!generalSettings) update_generalSettings();
    else {
      setFormData({
        ...formData,
        ...generalSettings,
        logoPreview:
          "http://localhost/Projects/CSSLTD-GYM/" + generalSettings?.logo,
      });
    }
  };
  useEffect(() => {
    getData();
    // setFormData({...formData, data});
  }, [generalSettings]);
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
        logoPreview: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.logo == generalSettings.logo) {
      console.log("unchanged logo");
      const response = await axios_function(
        "POST",
        "http://localhost/Projects/CSSLTD-GYM/Backend/global_setting/update",
        { ...formData, logo: "unchanged" }
      );
      if (response.result) {
        console.log(response.message);
        update_generalSettings();
      } else {
        console.log("ERROR", response.message);
      }
    } else {
      e.preventDefault();
      const response = await axios_function(
        "POST",
        "http://localhost/Projects/CSSLTD-GYM/Backend/global_setting/update",
        formData
      );
      if (response.result) {
        console.log(response.message);
        // console.log(formData)
        update_generalSettings();
      } else {
        console.log("ERROR", response.message);
      }
    }
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
          src={formData.logoPreview}
          alt="Logo Preview"
          sx={{ width: 64, height: 64 }}
        />
        {access?.edit && (
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
        )}
      </Box>
      <TextField
        label="Company Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        variant="outlined"
        fullWidth
        required
        disabled={!access?.edit}
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
        disabled={!access?.edit}
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

      {access?.edit && (
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
      )}
    </Box>
  );
};

export default Settings;
