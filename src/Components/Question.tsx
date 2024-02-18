import { IQuestion, IAnswer } from "./Interfaces";
import { QuestionRadio } from "./QuestionRadio";
import { QuestionCheckbox } from "./QuestionCheckbox";
import { QuestionText } from "./QuestionText";
import { QuestionDropdown } from "./QuestionDropdown";
import { useEffect, useState } from "react";
import {
  FunctionEvaluator,
  FunctionEvaluatorContext,
} from "../AST/Evaluator/FunctionEvaluator";
import React from "react";
import { Function_Call } from "../AST/Nodes/Function_Call";
import { useGlobalQuizContext } from "./Context";

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
  const { functionMap } = useGlobalQuizContext();
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
    console.log("Starting evaluteVars");
    let currentEvaluatedVars = evaluatedVars;
    console.log("question vars: ", question.vars);
    if (question.vars) {
      for (let variable of question?.vars) {
        for (let [key, functionBinding] of Object.entries(variable)) {
          if (
            typeof functionBinding.value === "string" ||
            typeof functionBinding.value === "number"
          ) {
            // Function binding value is a string / number
            currentEvaluatedVars[key] = functionBinding.value;
          } else if (typeof functionBinding.value === "function") {
            if (!functionBinding.args) {
              // Function Binding is function without arguments
              currentEvaluatedVars[key] = functionBinding.value();
            } else {
              // Function Binding is function with arguments
              let args = getArgValues(
                functionBinding.args,
                currentEvaluatedVars
              );
              currentEvaluatedVars[key] = functionBinding.value(args);
            }
          } else {
            // function binding is a FunctionCustom and needs to be evaluated
            const functionEvaluator = new FunctionEvaluator();
            const context: FunctionEvaluatorContext = {
              passedArguments: functionBinding.args,
              vars: { ...currentEvaluatedVars },
              functions: functionMap,
              returnValue: 0,
            };
            functionEvaluator.visit(context, functionBinding.value);
            currentEvaluatedVars[key] = context.returnValue;
          }
        }
      }
    }

    console.log(
      "Finishing evaluateVars. Currently evaluated vars: ",
      currentEvaluatedVars
    );
    setEvaluatedVars(currentEvaluatedVars);
  };

  const getArgValues = (
    args: (string | number | Function_Call)[],
    evaluatedVars: { [key: string]: string | number }
  ): (string | number)[] => {
    let argValues: (string | number)[] = [];

    args.forEach((arg) => {
      const functionEvaluator: FunctionEvaluator = new FunctionEvaluator();
      const context: FunctionEvaluatorContext = {
        vars: evaluatedVars,
        functions: functionMap,
        passedArguments: [],
        returnValue: 0,
      };

      functionEvaluator.visit(context, arg);
      argValues.push(context.returnValue);
    });

    return argValues;
  };

  // Evaluate the label for the question
  const getQuestionLabel = (): string | number => {
    let questionLabel: string | number = "";

    console.log("question label: ", question.label);

    if (typeof question.label.value === "function") {
      if (!question.label.args) {
        questionLabel = question.label.value();
      } else {
        // let args = getArgValues(question.label.args);
        let args = question.label.args;
        questionLabel = question.label.value(args);
        console.log("question function: ", question.label.value);
        console.log("question args: ", question.label.args);
        console.log(questionLabel);
      }
    } else if (
      typeof question.label.value === "number" ||
      typeof question.label.value === "string"
    ) {
      questionLabel = question.label.value.toString();
    } else {
      console.log(
        "Starting FunctionEvaluator for Question Label: ",
        questionLabel
      );
      console.log("Current evaluated vars: ", evaluatedVars);
      const functionEvaluator = new FunctionEvaluator();
      let context: FunctionEvaluatorContext = {
        passedArguments: question.label.args,
        vars: { ...evaluatedVars },
        functions: functionMap,
        returnValue: 0,
      };
      functionEvaluator.visit(context, question.label.value);
      questionLabel = context.returnValue;
    }
    return questionLabel;
  };

  // const getCorrectAnswer = () => {
  //   console.log("question correct answer: ", question.correctAnswer);

  //   if (!question.correctAnswer) return;

  //   if (
  //     typeof question.correctAnswer.value === "string" ||
  //     typeof question.correctAnswer.value === "number"
  //   ) {
  //     setQuestionCorrectAnswer(
  //       question.id,
  //       question.correctAnswer.value.toString()
  //     );
  //     return;
  //   }

  //   if (!question.correctAnswer.args) {
  //     setQuestionCorrectAnswer(
  //       question.id,
  //       question.correctAnswer.value().toString()
  //     );
  //     question.correctAnswer.value();
  //   } else {
  //     let args = getEvaluatedVars(question.correctAnswer.args);
  //     setQuestionCorrectAnswer(
  //       question.id,
  //       question.correctAnswer.value(...args).toString()
  //     );
  //   }
  // };

  useEffect(() => {
    evaluateVars();
    // getCorrectAnswer();
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
