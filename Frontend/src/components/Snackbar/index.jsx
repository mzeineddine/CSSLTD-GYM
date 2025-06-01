import React from "react";
import { Alert, Snackbar } from "@mui/material";

const SnackBar = (props) => {
  return (
    <Snackbar
      open={props.openSnack}
      autoHideDuration={3000}
      onClose={() => props.setOpenSnack(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={() => props.setOpenSnack(false)}
        severity={props.success ? "success" : "error"}
        sx={{ width: "100%" }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
