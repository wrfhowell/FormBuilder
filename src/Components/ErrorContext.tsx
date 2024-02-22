import React, { createContext, useContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

export interface IErrorContext {
  showError: (error: any) => void;
}

export const ErrorContext = createContext<IErrorContext>({
  showError: (error: any) => {},
});

export const useErrorContext = () => useContext(ErrorContext);

export const ErrorContextProvider = ({ children }: any) => {
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const showError = (error: any) => {
    setError(`Runtime Error: ${error.message}`);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
      {children}
    </ErrorContext.Provider>
  );
};
