import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { IPage, Vars } from "./Interfaces";
import { styled } from "@mui/material/styles";
import { useFileUpload } from "./Hooks";

import { pages } from "./Compiled_Quiz_Example";

interface MainProps {
  setPagesObj: (pagesObj: IPage[]) => void;
}

export const Main = ({ setPagesObj }: MainProps) => {
  const { fileContents, uploadFile } = useFileUpload();

  const navigate = useNavigate();
  const startQuiz = () => {
    if (pages) {
      setPagesObj(pages);
      navigate(pages[0].id);
    }
  };

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
      <h1>Upload Quiz DSL File</h1>
      <Button variant="contained" component="label">
        Upload
        <VisuallyHiddenInput onChange={uploadFile} type="file" />
      </Button>

      <h1>Start the Quiz</h1>
      <Button variant="contained" onClick={startQuiz}>
        Start Quiz
      </Button>
    </>
  );
};
