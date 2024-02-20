import React, { useState } from "react";
import { IAnswer } from "./Interfaces";
import { RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { VariableName } from "src/AST/Nodes/VariableName";

interface QuestionRadioProps {
  id: string;
  setAnswer: (questionId: string, ans: IAnswer) => void;
  options?: (string | number)[];
}

export const QuestionRadio = ({
  id,
  setAnswer,
  options,
}: QuestionRadioProps) => {
  const handleChange = (e: any) => {
    setAnswer(id, { radioSelection: e.target.value });
  };

  const evaluateOptions = () => {};

  return (
    <RadioGroup name="radio-buttons-group">
      {options?.map((option) => (
        <FormControlLabel
          key={option}
          onChange={handleChange}
          value={option}
          control={<Radio />}
          label={option}
        />
      ))}
    </RadioGroup>
  );
};
