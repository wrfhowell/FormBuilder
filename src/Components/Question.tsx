import { IQuestion, IAnswer } from "./Interfaces";
import { QuestionRadio } from "./QuestionRadio";
import { QuestionCheckbox } from "./QuestionCheckbox";
import { QuestionText } from "./QuestionText";
import { QuestionDropdown } from "./QuestionDropdown";
import { useEffect, useState } from "react";
import React from "react";
import { useGlobalQuizContext } from "./Context";
import {
  evaluateVars,
  evaluateOptions,
  evaluateProperty,
} from "../Functions/functions";
import { Divider } from "@mui/material";

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
    [key: string]: string | number | (string | number)[];
  }>({});
  const [questionsRendered, setQuestionsRendered] = useState(false);

  // Retrieves the correct type of question to render on the page
  const getQuestionObj = () => {
    let questionOptions: (string | number)[];
    if (question.options) {
      questionOptions = evaluateOptions(
        question.options,
        evaluatedVars,
        {
          ...window.globalVars,
        },
        formState,
        functionMap
      );
    } else {
      questionOptions = [];
    }
    return {
      textInput: (
        <QuestionText id={question.id} setAnswer={setQuestionUserAnswer} />
      ),
      dropdown: (
        <QuestionDropdown
          id={question.id}
          setAnswer={setQuestionUserAnswer}
          options={questionOptions}
        />
      ),
      checkbox: (
        <QuestionCheckbox
          id={question.id}
          options={questionOptions}
          setAnswer={setQuestionUserAnswer}
        />
      ),
      radio: (
        <QuestionRadio
          options={questionOptions}
          id={question.id}
          setAnswer={setQuestionUserAnswer}
        />
      ),
    };
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
    setEvaluatedVars(currentEvaluatedVars);
    console.log("evaluated vars: ", currentEvaluatedVars);
  };

  // Evaluate the label for the Question
  const getQuestionLabel = (): string | number => {
    let questionLabel: string | number = evaluateProperty(
      question.label,
      formState,
      functionMap,
      { ...evaluatedVars }
    );
    return questionLabel;
  };

  // Evaluates the correct answer for the question
  const getCorrectAnswer = () => {
    if (!question.correctAnswer) return;
    const questionCorrectAnswer = evaluateProperty(
      question.correctAnswer,
      formState,
      functionMap,
      { ...evaluatedVars }
    );
    const updatedFormState = formState;
    updatedFormState
      .get(pageId)
      ?.set(`${question.id}-correctAnswer`, questionCorrectAnswer);
    setFormState(updatedFormState);
  };

  // Adds the Question ID to the Form State for retrieval in other Questions or functions
  const addQuestionIdToFormState = () => {
    const updatedFormState = formState;
    updatedFormState.get(pageId)?.set(question.id, "");
    setFormState(updatedFormState);
  };

  // Selectively renders the component based on the value of the dependsOn property
  const evaluateDependsOn = () => {
    if (questionsRendered && !question.dependsOn) {
      return;
    } else if (questionsRendered && question.dependsOn) {
      const questionAns = formState.get(pageId)?.get(question.dependsOn);

      if (question.displayIf && questionAns !== question.displayIf) {
        setQuestionsRendered(false);
      }
    } else if (!questionsRendered && !question.dependsOn) {
      evaluateQuestionVars();
      getCorrectAnswer();
      setQuestionsRendered(true);
    } else if (!questionsRendered && question.dependsOn) {
      const questionAns = formState.get(pageId)?.get(question.dependsOn);
      if (question.displayIf && questionAns === question.displayIf) {
        evaluateQuestionVars();
        getCorrectAnswer();
        setQuestionsRendered(true);
      } else if (!question.displayIf && questionAns !== "") {
        evaluateQuestionVars();
        getCorrectAnswer();
        setQuestionsRendered(true);
      }
    }
  };

  useEffect(() => {
    evaluateDependsOn();
  }, [formState]);

  useEffect(() => {
    addQuestionIdToFormState();
  }, []);

  return (
    <div>
      {questionsRendered && (
        <div>
          <Divider />
          <h2>{getQuestionLabel()}</h2>
          {getQuestionObj()[question.type]}
        </div>
      )}
    </div>
  );
};
