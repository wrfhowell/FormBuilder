import { IAnswer } from "./Interfaces";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { VariableName } from "src/AST/Nodes/VariableName";

interface QuestionDropdownProps {
  id: string;
  setAnswer: (questionId: string, ans: IAnswer) => void;
  options?: (string | number)[];
}

export const QuestionDropdown = ({
  id,
  setAnswer,
  options,
}: QuestionDropdownProps) => {
  const [selection, setSelection] = useState("");

  const optionsInitial: (string | number)[] = options ? ["", ...options] : [""];

  const handleChange = (e: any) => {
    setSelection(e.target.value);
    setAnswer(id, { dropdownSelection: e.target.value });
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`dropdown-select-label-${id}`}>Selection</InputLabel>
      <Select
        labelId={`dropdown-select-label-${id}`}
        id={`dropdown-select-${id}`}
        value={selection}
        label="Selection"
        onChange={handleChange}
      >
        {optionsInitial?.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
