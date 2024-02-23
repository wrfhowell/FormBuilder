import { IQuestion, IAnswer, QuestionType } from "./Interfaces";
import { QuestionRadio } from "./QuestionRadio";
import { QuestionCheckbox } from "./QuestionCheckbox";
import { QuestionText } from "./QuestionText";
import { QuestionDropdown } from "./QuestionDropdown";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { useGlobalQuizContext } from "./Context";
import { useErrorContext } from "./ErrorContext";
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
  const [questionLabel, setQuestionLabel] = useState<string>();
  const questionId = useRef<string>("");
  const { showError } = useErrorContext();
  const [questionObj, setQuestionObj] = useState<JSX.Element>(<></>);

  // Retrieves the correct type of question to render on the page
  const getQuestionObj = (questionType: QuestionType) => {
    let questionOptions: (string | number)[];
    if (question.options) {
      try {
        questionOptions = evaluateOptions(
          question.options,
          evaluatedVars,
          {
            ...window.globalVars,
          },
          formState,
          functionMap
        );
      } catch (err) {
        showError(err);
        questionOptions = [];
      }
    } else {
      questionOptions = [];
    }
    const questionTypes = {
      textInput: (
        <QuestionText
          id={questionId.current}
          setAnswer={setQuestionUserAnswer}
        />
      ),
      dropdown: (
        <QuestionDropdown
          id={questionId.current}
          setAnswer={setQuestionUserAnswer}
          options={questionOptions}
        />
      ),
      checkbox: (
        <QuestionCheckbox
          id={questionId.current}
          options={questionOptions}
          setAnswer={setQuestionUserAnswer}
        />
      ),
      radio: (
        <QuestionRadio
          options={questionOptions}
          id={questionId.current}
          setAnswer={setQuestionUserAnswer}
        />
      ),
    };

    setQuestionObj(questionTypes[questionType]);
  };

  // Get values for each of the variables for the Question
  const evaluateQuestionVars = () => {
    if (!question.vars) return;

    try {
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
    } catch (err) {
      showError(err);
    }
  };

  // Evaluate the question id for the Question
  const getQuestionId = () => {
    try {
      let questionIdEvaluated: string | number = evaluateProperty(
        question.id,
        formState,
        functionMap,
        { ...evaluatedVars }
      );
      questionId.current = questionIdEvaluated;
    } catch (err) {
      showError(err);
      throw err;
    }
  };

  // Evaluate the label for the Question
  const getQuestionLabel = () => {
    try {
      let questionLabel: string | number = evaluateProperty(
        question.label,
        formState,
        functionMap,
        { ...evaluatedVars }
      );
      if (typeof questionLabel !== "string" && isNaN(questionLabel)) {
        throw new Error("Could not evaluate question label");
      }
      setQuestionLabel(questionLabel);
    } catch (err) {
      showError(err);
    }
  };

  // Evaluates the correct answer for the question
  const getCorrectAnswer = () => {
    if (!question.correctAnswer) return;

    try {
      const questionCorrectAnswer = evaluateProperty(
        question.correctAnswer,
        formState,
        functionMap,
        { ...evaluatedVars }
      );
      const updatedFormState = formState;
      updatedFormState
        .get(pageId)
        ?.set(`${questionId.current}-correctAnswer`, questionCorrectAnswer);
      setFormState(updatedFormState);
    } catch (err) {
      showError(err);
    }
  };

  // Adds the Question ID to the Form State for retrieval in other Questions or functions
  const addQuestionIdToFormState = () => {
    const updatedFormState = formState;
    updatedFormState.get(pageId)?.set(questionId.current, "");
    setFormState(updatedFormState);
  };

  // Selectively renders the component based on the value of the dependsOn property
  const evaluateDependsOn = () => {
    if (!questionsRendered) {
    }

    if (questionsRendered && !question.dependsOn) {
      return;
    } else if (questionsRendered && question.dependsOn) {
      const questionAns = formState.get(pageId)?.get(question.dependsOn);

      if (question.displayIf && questionAns !== question.displayIf) {
        setQuestionsRendered(false);
      }
    } else if (!questionsRendered && !question.dependsOn) {
      evaluateQuestionVars();
      getQuestionId();
      getQuestionLabel();
      getCorrectAnswer();
      getQuestionObj(question.type);
      setQuestionsRendered(true);
    } else if (!questionsRendered && question.dependsOn) {
      const questionAns = formState.get(pageId)?.get(question.dependsOn);
      if (question.displayIf && questionAns === question.displayIf) {
        evaluateQuestionVars();
        getQuestionId();
        getQuestionLabel();
        getCorrectAnswer();
        getQuestionObj(question.type);
        setQuestionsRendered(true);
      } else if (!question.displayIf && questionAns !== "") {
        evaluateQuestionVars();
        getQuestionId();
        getQuestionLabel();
        getCorrectAnswer();
        getQuestionObj(question.type);
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
          {questionLabel && (
            <div>
              <h3>{questionLabel}</h3>
              {question.isRequired && <p>*Required</p>}
            </div>
          )}
          {questionObj}
        </div>
      )}
    </div>
  );
};
