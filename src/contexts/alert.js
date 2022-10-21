import React, { useContext, createContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const AlertContext = createContext();

const useAlert = () => useContext(AlertContext);

const ProvideAlert = ({ children }) => {
  const ALERT_TYPES = {
    SUCCESS: "SUCCESS",
    FAIL: "FAIL",
  };

  const [open, setOpen] = useState(false);
  const [type, setType] = useState();
  const [message, setMessage] = useState("");

  const emitAlert = ({ type, message }) => {
    setOpen(true);
    setType(ALERT_TYPES[type]);
    setMessage(message);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ emitAlert, ALERT_TYPES }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </AlertContext.Provider>
  );
};

export { ProvideAlert, useAlert };
