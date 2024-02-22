import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { StaticCheckError, EvaluatorError } from "src/Functions/errors";

interface ErrorComponentProps {
  error: any;
}

export const ErrorComponent = ({ error }: ErrorComponentProps) => {
  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert
          severity="error"
          sx={{ justifyContent: "left", alignItems: "left", textAlign: "left" }}
        >
          <AlertTitle>
            {error instanceof StaticCheckError
              ? "Static Checks Error"
              : error instanceof EvaluatorError
              ? "Evaluator Error"
              : "Error"}{" "}
          </AlertTitle>
          {error.message}
        </Alert>
      </Stack>
    </div>
  );
};
