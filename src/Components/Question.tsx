import { IQuestion, IAnswer, FunctionBinding } from "./Interfaces";
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
import { VariableName } from "../AST/Nodes/VariableName";

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
    let currentEvaluatedVars = evaluatedVars;
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
    let questionLabel: string | number = evaluateProperty(question.label);
    return questionLabel;
  };

  const evaluateProperty = (
    property: string | FunctionBinding | VariableName
  ) => {
    let propertyValue: string | number = "";

    if (typeof property === "string") {
      return property;
    } else if (property instanceof VariableName) {
      const functionEvaluator = new FunctionEvaluator();
      const context: FunctionEvaluatorContext = {
        vars: { ...evaluatedVars },
        functions: functionMap,
        returnValue: 0,
      };
      functionEvaluator.visit(context, property);
      return context.returnValue;
    }

    if (typeof property.value === "function") {
      if (!property.args) {
        propertyValue = property.value();
      } else {
        let args = property.args;
        propertyValue = property.value(args);
      }
    } else if (
      typeof property.value === "number" ||
      typeof property.value === "string"
    ) {
      propertyValue = property.value.toString();
    } else {
      const functionEvaluator = new FunctionEvaluator();
      let context: FunctionEvaluatorContext = {
        passedArguments: property.args,
        vars: { ...evaluatedVars },
        functions: functionMap,
        returnValue: 0,
      };
      functionEvaluator.visit(context, property.value);
      propertyValue = context.returnValue;
    }
    return propertyValue;
  };

  const getCorrectAnswer = () => {
    if (!question.correctAnswer) return;
    const questionCorrectAnswer = evaluateProperty(question.correctAnswer);
    setQuestionCorrectAnswer(question.id, questionCorrectAnswer);
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
