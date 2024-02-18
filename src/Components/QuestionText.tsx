import { useState } from "react";
import { IAnswer } from "./Interfaces";
import { TextField } from "@mui/material";
import React from "react";

interface QuestionTextProps {
  id: string;
  setAnswer: (questionId: string, ans: IAnswer) => void;
}

export const QuestionText = ({ id, setAnswer }: QuestionTextProps) => {
  const [text, setText] = useState("");

  const handleChange = (e: any) => {
    setText(e.target.value);
    setAnswer(id, { textSelection: e.target.value });
  };

  return (
    <TextField sx={{ width: "100%" }} value={text} onChange={handleChange} />
  );
};
