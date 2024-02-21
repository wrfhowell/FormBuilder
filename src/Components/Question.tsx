import { IQuestion, IAnswer } from "./Interfaces";
import { QuestionRadio } from "./QuestionRadio";
import { QuestionCheckbox } from "./QuestionCheckbox";
import { QuestionText } from "./QuestionText";
import { QuestionDropdown } from "./QuestionDropdown";
import { useEffect, useState } from "react";
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
  const { showError } = useErrorContext();

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
        ?.set(`${question.id}-correctAnswer`, questionCorrectAnswer);
      setFormState(updatedFormState);
    } catch (err) {
      showError(err);
    }
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
      getQuestionLabel();
      getCorrectAnswer();
      setQuestionsRendered(true);
    } else if (!questionsRendered && question.dependsOn) {
      const questionAns = formState.get(pageId)?.get(question.dependsOn);
      if (question.displayIf && questionAns === question.displayIf) {
        evaluateQuestionVars();
        getQuestionLabel();
        getCorrectAnswer();
        setQuestionsRendered(true);
      } else if (!question.displayIf && questionAns !== "") {
        evaluateQuestionVars();
        getQuestionLabel();
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
          {questionLabel && (
            <div>
              <h3>{questionLabel}</h3>
              {question.isRequired && <p>*Required</p>}
            </div>
          )}
          {getQuestionObj()[question.type]}
        </div>
      )}
    </div>
  );
};
