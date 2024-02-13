import { IQuestion, IAnswer } from "./Interfaces";
import { QuestionRadio } from "./QuestionRadio";
import { QuestionCheckbox } from "./QuestionCheckbox";
import { QuestionText } from "./QuestionText";
import { QuestionDropdown } from "./QuestionDropdown";
import { useEffect, useState } from "react";

interface QuestionProps {
  question: IQuestion;
  setQuestionUserAnswer: (questionId: string, ans: IAnswer) => void;
  setQuestionCorrectAnswer: (questionId: string, ans: string) => void;
}

export const Question = ({
  question,
  setQuestionUserAnswer,
  setQuestionCorrectAnswer,
}: QuestionProps) => {
  const [evaluatedVars, setEvaluatedVars] = useState<{
    [key: string]: string | number;
  }>({});
  const [questionsRendered, setQuestionsRendered] = useState(false);
  const questionObj = {
    text: <QuestionText id={question.id} setAnswer={setQuestionUserAnswer} />,
    dropdown: (
      <QuestionDropdown
        id={question.id}
        setAnswer={setQuestionUserAnswer}
        options={question.options}
      />
    ),
    checkbox: (
      <QuestionCheckbox
        id={question.id}
        options={question.options}
        setAnswer={setQuestionUserAnswer}
      />
    ),
    radio: (
      <QuestionRadio
        options={question.options}
        id={question.id}
        setAnswer={setQuestionUserAnswer}
      />
    ),
  };

  // Get values for each of the variables for the Question
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

  // Get the values of a selection of evaluated variables
  const getEvaluatedVars = (vars: string[]): any[] => {
    let evaluatedVarsLocal = [];

    for (let variable of vars) {
      evaluatedVarsLocal.push(evaluatedVars[variable]);
    }
    return evaluatedVarsLocal;
  };

  // Evaluate the label for the question
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

  const getCorrectAnswer = () => {
    if (!question.correctAnswer) return;

    if (
      typeof question.correctAnswer.value === "string" ||
      typeof question.correctAnswer.value === "number"
    ) {
      setQuestionCorrectAnswer(
        question.id,
        question.correctAnswer.value.toString()
      );
      return;
    }

    if (!question.correctAnswer.args) {
      setQuestionCorrectAnswer(
        question.id,
        question.correctAnswer.value().toString()
      );
      question.correctAnswer.value();
    } else {
      let args = getEvaluatedVars(question.correctAnswer.args);
      setQuestionCorrectAnswer(
        question.id,
        question.correctAnswer.value(...args).toString()
      );
    }
  };

  useEffect(() => {
    evaluateVars();
    getCorrectAnswer();
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
