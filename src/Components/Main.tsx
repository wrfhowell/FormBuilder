import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { IPage, Vars } from "./Interfaces";

interface MainProps {
  setPagesObj: (pagesObj: IPage[]) => void;
}

export const Main = ({ setPagesObj }: MainProps) => {
  const navigate = useNavigate();
  const startQuiz = () => {
    // Combination of user defined functions and "library" functions
    const functions = {
      mathRound: () => Math.round(1 + 99 * Math.random()),
      getVarValue: (item: any) => {
        return item;
      },
      getAdditionQuestion: (num1: any, num2: any) =>
        "" + num1 + " + " + num2 + " = ?",
      additionQAns: (num1: any, num2: any) => {
        return num1 + num2;
      },
    };

    // All variables for the quiz
    const vars: Vars = {
      "addition-q-num1": { value: functions.mathRound },
      "addition-q-num2": { value: functions.mathRound },
      "addition-q-ans": {
        value: functions.additionQAns,
        args: ["num1", "num2"],
      },
    };

    // Compiled quiz definition
    const pages: IPage[] = [
      {
        id: "classification-pg",
        header: "Classification",
        instructions: "Please classify yourself",
        goTo: (ans: Map<string, string>) => {
          if (ans.get("what-are-you") === "Metal") {
            return "metal-pg";
          } else if (ans.get("what-are-you") === "Nonmetal") {
            return "nonmetal-pg";
          } else if (ans.get("what-are-you") === "Metalloid") {
            return "metalloid-pg";
          }
          return "";
        },
        questions: [
          {
            id: "what-are-you",
            type: "dropdown",
            label: { value: "What are you?" },
            options: ["Metal", "Nonmetal", "Metalloid"],
            isRequired: true,
          },
        ],
      },
      {
        id: "metal-pg",
        header: "Metal",
        instructions: "Please specify the type of metal you are",
        goTo: (ans: Map<string, string>) => {
          return "test";
        },
        questions: [
          {
            id: "metal",
            type: "dropdown",
            label: { value: "What type of metal are you?" },
            options: [
              "Alkali Metal",
              "Alkaline Earth Metal",
              "Transition Metal",
              "Post-Transition Metal",
              "Lanthanide",
              "Actinide",
            ],
            isRequired: true,
          },
        ],
      },
      {
        id: "nonmetal-pg",
        header: "Nonmetal",
        instructions: "Please specify the type of nonmetal you are",
        goTo: (ans: Map<string, string>) => {
          if (ans.get("nonmetal") === "Noble Gas") {
            return "noble-gas";
          } else {
            return "reactive-nonmetal";
          }
        },
        questions: [
          {
            id: "nonmetal",
            type: "checkbox",
            label: { value: "What type of nonmetal are you?" },
            options: ["Reactive Nonmetal", "Noble Gas"],
            isRequired: true,
          },
        ],
      },
      {
        id: "noble-gas",
        header: "Congratulations, you are a Noble Gas.",
      },
      {
        id: "reactive-nonmetal",
        header: "Addition",
        instructions:
          "Please solve the following addition problems to prove you are a reactive non-metal",
        displayQuestions: 5,
        goTo: (ans, correctAns) => {
          if (ans.size !== correctAns.size) return "reactive-nonmetal-fail";
          let pass = true;
          ans.forEach((val, key) => {
            if (correctAns.get(key) !== ans.get(key)) {
              pass = false;
            }
          });
          return pass ? "reactive-nonmetal-pass" : "reactive-nonmetal-fail";
        },
        questions: [
          {
            id: "addition-q-",
            type: "text",
            label: {
              value: functions.getAdditionQuestion,
              args: ["num1", "num2"],
            },
            isRequired: true,
            correctAnswer: { value: functions.getVarValue, args: ["ans"] },
            loop: 5,
            vars: [
              { num1: vars["addition-q-num1"] },
              { num2: vars["addition-q-num2"] },
              { ans: vars["addition-q-ans"] },
            ],
          },
        ],
      },
      {
        id: "reactive-nonmetal-pass",
        header: "You have passed the test. You are a true Reactive Nonmetal.",
      },
      {
        id: "reactive-nonmetal-fail",
        header: "You have failed. You will never be a true Reactive Nonmetal.",
      },
    ];

    if (pages) {
      setPagesObj(pages);
      navigate(pages[0].id);
    }
  };
  return (
    <>
      <h1>Start the Quiz</h1>
      <Button variant="contained" onClick={startQuiz}>
        Start Quiz
      </Button>
    </>
  );
};
