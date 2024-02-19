import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { FunctionBinding, IPage, Vars } from "./Interfaces";
import { styled } from "@mui/material/styles";
import { useFileUpload } from "./Hooks";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Quiz from "@mui/icons-material/Quiz";
import { Evaluator } from "../AST/export";
import { FormGeneratorLexer } from "../AST/generated/FormGeneratorLexer";
import { FormGeneratorParser } from "../AST/generated/FormGeneratorParser";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeToAST } from "../AST/parser/ParseTreeToAST";
import React, { useState, useEffect } from "react";
import { useGlobalQuizContext } from "./Context";
import { evaluateVars } from "./functions";

interface MainProps {
  setPagesObj: (pagesObj: IPage[]) => void;
}

export const Main = ({ setPagesObj }: MainProps) => {
  const { fileContents, uploadFile } = useFileUpload();
  const [pages, setPages] = useState<IPage[]>([]);
  const [unevaluatedGlobalVars, setUnevaluatedGlobalVars] = useState<Vars[]>(
    []
  );

  const { setFunctionMap, functionMap, setFormState, formState } =
    useGlobalQuizContext();

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
    let pagesObj = programObj.pages as IPage[];
    let functionMap = programObj.FunctionsMap;
    let globalVariables = programObj.globalVariables as Vars[];

    setUnevaluatedGlobalVars(globalVariables);
    setFunctionMap(functionMap);
    setPages(pagesObj);

    console.log("pages: ", pagesObj);

    const initialFormState = new Map();
    pagesObj.forEach((page) => {
      initialFormState.set(page.id, new Map());
    });
    setFormState(initialFormState);
  };

  const evaluateGlobalVariables = (vars: Vars[]) => {
    const { currentEvaluatedVars } = evaluateVars(
      vars,
      {},
      {},
      formState,
      functionMap
    );
    window.globalVars = currentEvaluatedVars;
  };

  const startQuiz = () => {
    evaluateGlobalVariables(unevaluatedGlobalVars);
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

  useEffect(() => {
    if (fileContents !== "") {
      runStaticChecks();
    }
  }, [fileContents]);

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

      <h3>Start the Quiz</h3>
      <Button variant="contained" onClick={startQuiz} startIcon={<Quiz />}>
        Start Quiz
      </Button>
    </>
  );
};
