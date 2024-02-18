import React from "react";
import { IAnswer } from "./Interfaces";
import { RadioGroup, Radio, FormControlLabel } from "@mui/material";

interface QuestionRadioProps {
  id: string;
  setAnswer: (questionId: string, ans: IAnswer) => void;
  options?: string[];
}

export const QuestionRadio = ({
  id,
  setAnswer,
  options,
}: QuestionRadioProps) => {
  const optionsList = options || [];

  const handleChange = (e: any) => {
    setAnswer(id, { radioSelection: e.target.value });
  };

  return (
    <RadioGroup name="radio-buttons-group">
      {optionsList.map((option) => (
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
