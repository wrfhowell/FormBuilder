import { IQuestion, IAnswer, FunctionBinding, Vars } from "./Interfaces";
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
import { useGlobalQuizContext } from "./Context";
import { VariableName } from "../AST/Nodes/VariableName";
import { compareObjects, evaluateVars } from "./functions";

interface QuestionProps {
  pageId: string;
  question: IQuestion;
  setQuestionUserAnswer: (questionId: string, ans: IAnswer) => void;
}

export const Question = ({
  pageId,
  question,
  setQuestionUserAnswer,
}: QuestionProps) => {
  const { functionMap, formState, setFormState } = useGlobalQuizContext();
  const [evaluatedVars, setEvaluatedVars] = useState<{
    [key: string]: string | number;
  }>({});
  const [questionsRendered, setQuestionsRendered] = useState(false);
  const questionObj = {
    textInput: (
      <QuestionText id={question.id} setAnswer={setQuestionUserAnswer} />
    ),
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
  const evaluateQuestionVars = () => {
    if (!question.vars) return;
    const { currentEvaluatedVars, globalVars: updatedGlobalVars } =
      evaluateVars(
        question.vars,
        evaluatedVars,
        { ...window.globalVars },
        formState,
        functionMap
      );
    window.globalVars = updatedGlobalVars;

    console.log(
      "Finishing evaluateVars. Currently evaluated vars: ",
      currentEvaluatedVars
    );
    setEvaluatedVars(currentEvaluatedVars);
  };

  // Evaluate the label for the question
  const getQuestionLabel = (): string | number => {
    let questionLabel: string | number = evaluateProperty(question.label);
    return questionLabel;
  };

  const evaluateProperty = (
    property: string | FunctionBinding | VariableName
  ): string => {
    let propertyValue: string = "";

    if (typeof property === "string") {
      return property;
    } else if (property instanceof VariableName) {
      const functionEvaluator = new FunctionEvaluator();
      const updatedGlobalVars = { ...window.globalVars };
      const context: FunctionEvaluatorContext = {
        formState,
        globalVars: updatedGlobalVars,
        vars: { ...evaluatedVars },
        functions: functionMap,
        returnValue: 0,
      };
      functionEvaluator.visit(context, property);

      window.globalVars = updatedGlobalVars;
      return context.returnValue;
    }

    if (typeof property.value === "function") {
      if (!property.args) {
        propertyValue = property.value().toString();
      } else {
        let args = property.args;
        propertyValue = property.value(args).toString();
      }
    } else if (
      typeof property.value === "number" ||
      typeof property.value === "string"
    ) {
      propertyValue = property.value.toString();
    } else {
      const functionEvaluator = new FunctionEvaluator();
      const updatedGlobalVars = { ...window.globalVars };
      let context: FunctionEvaluatorContext = {
        formState,
        globalVars: updatedGlobalVars,
        passedArguments: property.args,
        vars: { ...evaluatedVars },
        functions: functionMap,
        returnValue: 0,
      };
      functionEvaluator.visit(context, property.value);
      window.globalVars = updatedGlobalVars;
      propertyValue = context.returnValue;
    }
    return propertyValue.toString();
  };

  const getCorrectAnswer = () => {
    if (!question.correctAnswer) return;
    const questionCorrectAnswer = evaluateProperty(question.correctAnswer);
    const updatedFormState = formState;
    updatedFormState
      .get(pageId)
      ?.set(`${question.id}-correctAnswer`, questionCorrectAnswer);
    setFormState(updatedFormState);
    console.log(formState);
  };

  const addQuestionIdToFormState = () => {
    const updatedFormState = formState;
    updatedFormState.get(pageId)?.set(question.id, "");
    setFormState(updatedFormState);
  };

  useEffect(() => {
    addQuestionIdToFormState();
    evaluateQuestionVars();
    getCorrectAnswer();
    setQuestionsRendered(true);
    console.log("here in question: ", question.id);
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
