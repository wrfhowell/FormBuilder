import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { IPage } from "./Interfaces";
import { styled } from "@mui/material/styles";
import { useFileUpload } from "./Hooks";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Quiz from "@mui/icons-material/Quiz";
import { Evaluator } from "../AST/export";
import { FormGeneratorLexer } from "../AST/generated/FormGeneratorLexer";
import { FormGeneratorParser } from "../AST/generated/FormGeneratorParser";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeToAST } from "../AST/parser/ParseTreeToAST";
import React, { useState } from "react";
import { GlobalQuizContextProvider, useGlobalQuizContext } from "./Context";

// import { pages } from "./Compiled_Quiz_Example";

interface MainProps {
  setPagesObj: (pagesObj: IPage[]) => void;
}

export const Main = ({ setPagesObj }: MainProps) => {
  const { fileContents, uploadFile } = useFileUpload();
  const [pages, setPages] = useState<any>();

  const { setFunctionMap, setFormState } = useGlobalQuizContext();

  const navigate = useNavigate();

  const runStaticChecks = () => {
    const fileStream = CharStreams.fromString(fileContents);
    const lexer = new FormGeneratorLexer(fileStream);
    const tokens = new CommonTokenStream(lexer);
    const parser = new FormGeneratorParser(tokens);
    const visitor = new ParseTreeToAST();
    // @ts-ignore
    const parsedProgram = parser.program().accept(visitor);
    const evaluator = new Evaluator();
    let programObj: any = parsedProgram.accept({}, evaluator);
    let pages = programObj.pages as IPage[];
    let functionMap = programObj.FunctionsMap;
    console.log("pages: ", pages);
    console.log("functions: ", functionMap);

    setFunctionMap(functionMap);
    setPages(pages);

    const initialFormState = new Map();
    pages.forEach((page) => {
      initialFormState.set(page.id, new Map());
    });
    setFormState(initialFormState);
  };

  const startQuiz = () => {
    if (pages) {
      setPagesObj(pages);
      navigate(pages[0].id);
    }
  };

  // Reference: Material UI Documentation
  // https://mui.com/material-ui/react-button/
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <h1>Quiz Creator DSL</h1>
      <h3>Upload Quiz DSL File</h3>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
      >
        Upload
        <VisuallyHiddenInput onChange={uploadFile} type="file" />
      </Button>

      <h3>Run Static Checks</h3>
      <Button variant="contained" onClick={runStaticChecks}>
        Run Static Checks
      </Button>

      <h3>Start the Quiz</h3>
      <Button variant="contained" onClick={startQuiz} startIcon={<Quiz />}>
        Start Quiz
      </Button>
    </>
  );
};
