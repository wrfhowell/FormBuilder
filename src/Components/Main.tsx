import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { IPage, Vars } from "./Interfaces";
import { useFileUpload } from "./Hooks";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Quiz from "@mui/icons-material/Quiz";
import { Evaluator } from "../AST/export";
import React, { useState, useEffect } from "react";
import { useGlobalQuizContext } from "./Context";
import { evaluateVars } from "../Functions/functions";
import { VisuallyHiddenInput } from "./VisuallyHiddenInput";
import { ErrorComponent } from "./ErrorComponent";
import { parseProgram } from "src/Functions/uiEvaluatorFunctions";
import { Box, Grid } from "@mui/material";
import { updateConsoleErrors } from "src/Functions/window";

interface MainProps {
  setPagesObj: (pagesObj: IPage[]) => void;
}

export const Main = ({ setPagesObj }: MainProps) => {
  const navigate = useNavigate();
  const { fileContents, uploadFile } = useFileUpload();
  const [staticChecksPassed, setStaticChecksPassed] = useState(false);
  const [staticChecksError, setStaticChecksError] = useState<any>();
  const [pages, setPages] = useState<IPage[]>([]);
  const [unevaluatedGlobalVars, setUnevaluatedGlobalVars] = useState<Vars[]>(
    []
  );
  const { setFunctionMap, functionMap, setFormState, formState } =
    useGlobalQuizContext();

  // Run static checks on uploaded program, display errors if encountered
  const runStaticChecks = () => {
    try {
      const { programGlobalVariables, programFunctions, programPages } =
        parseProgram(fileContents);
      setUnevaluatedGlobalVars(programGlobalVariables);
      setFunctionMap(programFunctions);
      setPages(programPages);

      const initialFormState = new Map();
      programPages.forEach((page) => {
        initialFormState.set(page.id, new Map());
      });
      setFormState(initialFormState);
      setStaticChecksPassed(true);
    } catch (err) {
      setStaticChecksError(err);
    }
    return;

    // For some reason, getting compilation errors without the following line?
    const evaluator = new Evaluator();
  };

  const evaluateGlobalVariables = (vars: Vars[]) => {
    try {
      const { currentEvaluatedVars } = evaluateVars(
        vars,
        {},
        {},
        formState,
        functionMap
      );
      window.globalVars = currentEvaluatedVars;
    } catch (err) {
      setStaticChecksError(err);
    }
  };

  const startQuiz = () => {
    evaluateGlobalVariables(unevaluatedGlobalVars);

    if (pages) {
      setPagesObj(pages);
      navigate(pages[0].id);
    }
  };

  useEffect(() => {
    setStaticChecksError(undefined);
    setStaticChecksPassed(false);
    if (fileContents !== "" && fileContents !== undefined) {
      runStaticChecks();
    }
  }, [fileContents]);

  useEffect(() => {
    updateConsoleErrors();
  }, []);

  return (
    <Grid container>
      <Grid item xs={3} md={4}></Grid>
      <Grid item xs={3} md={4}>
        <Box sx={{ marginBottom: 2 }}>
          <h1>Mountain Learn</h1>
          <h3>Upload Quiz DSL File</h3>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload
            <VisuallyHiddenInput onChange={uploadFile} type="file" />
          </Button>
        </Box>
        {staticChecksError && <ErrorComponent error={staticChecksError} />}

        {staticChecksPassed && (
          <>
            <h3>Start the Quiz</h3>
            <Button
              variant="contained"
              onClick={startQuiz}
              startIcon={<Quiz />}
            >
              Start Quiz
            </Button>
          </>
        )}
      </Grid>
      <Grid item xs={3} md={4}></Grid>
    </Grid>
  );
};
