import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { IPage } from "./Interfaces";

interface MainProps {
  setPagesObj: (pagesObj: IPage[]) => void;
}

export const Main = ({ setPagesObj }: MainProps) => {
  const navigate = useNavigate();
  const startQuiz = () => {
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
            label: "What are you?",
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
            label: "What type of metal are you?",
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
            label: "What type of nonmetal are you?",
            options: ["Reactive Nonmetal", "Noble Gas"],
            isRequired: true,
          },
          // {
          //   id: "test",
          //   type: "text",
          //   label: "This is a text field",
          //   isRequired: false,
          // },
        ],
      },
      {
        id: "noble-gas",
        header: "Congratulations, you are a Noble Gas.",
      },
      {
        id: "reactive-nonmetal",
        header: "Congratulations. You are a Reactive Nonmetal.",
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
