import { IQuestion, IAnswer } from "./Interfaces";
import { QuestionRadio } from "./QuestionRadio";
import { QuestionCheckbox } from "./QuestionCheckbox";
import { QuestionText } from "./QuestionText";
import { QuestionDropdown } from "./QuestionDropdown";
import { useEffect, useState } from "react";

interface QuestionProps {
  question: IQuestion;
  setAnswer: (questionId: string, ans: IAnswer) => void;
}

export const Question = ({ question, setAnswer }: QuestionProps) => {
  const [evaluatedVars, setEvaluatedVars] = useState<{
    [key: string]: string | number;
  }>({});
  const [questionsRendered, setQuestionsRendered] = useState(false);
  const questionObj = {
    text: <QuestionText id={question.id} setAnswer={setAnswer} />,
    dropdown: (
      <QuestionDropdown
        id={question.id}
        setAnswer={setAnswer}
        options={question.options}
      />
    ),
    checkbox: (
      <QuestionCheckbox
        id={question.id}
        options={question.options}
        setAnswer={setAnswer}
      />
    ),
    radio: (
      <QuestionRadio
        options={question.options}
        id={question.id}
        setAnswer={setAnswer}
      />
    ),
  };

  const evaluateVars = () => {
    let currentEvaluatedVars = evaluatedVars;
    if (question.vars) {
      for (let variable of question?.vars) {
        for (let [key, functionBinding] of Object.entries(variable)) {
          if (typeof functionBinding.value !== "function") {
            currentEvaluatedVars[key] = functionBinding.value;
          } else {
            if (!functionBinding.args) {
              currentEvaluatedVars[key] = functionBinding.value();
            } else {
              let args = getEvaluatedVars(functionBinding.args);
              currentEvaluatedVars[key] = functionBinding.value(...args);
            }
          }
        }
      }
    }
    setEvaluatedVars(currentEvaluatedVars);
  };

  const getEvaluatedVars = (vars: string[]): any[] => {
    let evaluatedVarsLocal = [];

    for (let variable of vars) {
      evaluatedVarsLocal.push(evaluatedVars[variable]);
    }
    return evaluatedVarsLocal;
  };

  const getQuestionLabel = (): string | number => {
    let questionLabel: string | number = "";

    if (typeof question.label.value === "function") {
      if (!question.label.args) {
        questionLabel = question.label.value();
      } else {
        let args = getEvaluatedVars(question.label.args);
        questionLabel = question.label.value(...args);
      }
    } else {
      questionLabel = question.label.value.toString();
    }
    return questionLabel;
  };

  useEffect(() => {
    evaluateVars();
    setQuestionsRendered(true);
  }, []);

  return (
    <div>
      {questionsRendered && (
        <div>
          <h2>{getQuestionLabel()}</h2>
          {questionObj[question.type]}
        </div>
      )}
    </div>
  );
};
