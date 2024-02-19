import { useState } from "react";
import { IAnswer } from "./Interfaces";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";
import { VariableName } from "src/AST/Nodes/VariableName";

interface QuestionCheckboxProps {
  id: string;
  setAnswer: (questionId: string, ans: IAnswer) => void;
  options?: (string | number)[];
}

export const QuestionCheckbox = ({
  id,
  setAnswer,
  options,
}: QuestionCheckboxProps) => {
  const [checked, setChecked] = useState<string[]>([]);

  const handleCheck = (e: any) => {
    let currentlyChecked = checked;
    if (e.target.checked) {
      if (currentlyChecked.indexOf(e.target.value) < 0) {
        currentlyChecked = [...currentlyChecked, e.target.value];
      }
    } else {
      let index = currentlyChecked.indexOf(e.target.value);
      if (index > -1) {
        currentlyChecked.splice(index, 1);
      }
    }
    setChecked(currentlyChecked);
    setAnswer(id, { checkboxSelection: currentlyChecked });
  };

  return (
    <FormGroup>
      {options?.map((item) => {
        return (
          <FormControlLabel
            onChange={handleCheck}
            control={<Checkbox />}
            label={item}
            value={item}
          />
        );
      })}
    </FormGroup>
  );
};
