import { IPage, IAnswer, IQuestion } from "./Interfaces";
import { Question } from "./Question";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";
import { Divider } from "@mui/material";
import React from "react";
import { useGlobalQuizContext } from "./Context";
import { evaluateProperty } from "src/Functions/functions";
import { useErrorContext } from "./ErrorContext";
import { getGlobalVariables } from "src/Functions/window";

interface PageProps {
  page: IPage;
  iteration: number;
}

export const Page = ({ page, iteration }: PageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showError } = useErrorContext();
  const { setFormState, formState, functionMap } = useGlobalQuizContext();
  const [userAnswers, setUserAnswers] = useState<Map<string, IAnswer>>(
    new Map()
  );
  const [pageQuestions, setPageQuestions] = useState<IQuestion[]>([]);
  const [pageHeader, setPageHeader] = useState<string | number>();
  const [pageInstructions, setPageInstructions] = useState<string | number>();

  const validateRequiredQuestions = (): {
    validationPassed: boolean;
    requiredQuestionId: string | undefined;
  } => {
    let validationPassed = true;
    let requiredQuestionId;
    pageQuestions.forEach((question) => {
      if (
        question.isRequired &&
        formState.get(page.id)?.get(question.id) === ""
      ) {
        validationPassed = false;
        requiredQuestionId = question.id;
      }
    });
    return { validationPassed, requiredQuestionId };
  };

  const handleSubmit = () => {
    if (page.questions) {
      const { validationPassed } = validateRequiredQuestions();

      if (!validationPassed) {
        showError(
          new Error(`There are still required questions that must be answered`)
        );
        return;
      }

      if (page.goTo) {
        try {
          const nextPage = evaluateProperty(
            page.goTo,
            formState,
            functionMap,
            {}
          ).replace(/["]/g, "");
          if (nextPage === location.pathname) {
            navigate(`/${nextPage}`, { state: iteration + 1, replace: true });
          } else {
            navigate(`/${nextPage}`, { replace: true });
          }
        } catch (err) {
          showError(err);
        }
      }
    }
  };

  const convertIAnswerToString = (ans: IAnswer): string => {
    let ansString = "";

    if (ans.checkboxSelection) {
      ansString = ans.checkboxSelection.join();
    } else if (ans.dropdownSelection) {
      ansString = ans.dropdownSelection.toString();
    } else if (ans.radioSelection) {
      ansString = ans.radioSelection.toString();
    } else if (ans.textSelection) {
      ansString = ans.textSelection;
    }
    return ansString;
  };

  const updateAnswers = (questionId: string, ans: IAnswer) => {
    const currentAnswers = userAnswers;
    currentAnswers.set(questionId, ans);
    setUserAnswers(currentAnswers);

    // Update form state for question
    const updatedFormState = new Map(formState);
    const questionAnswerString = convertIAnswerToString(ans);
    updatedFormState.get(page.id)?.set(questionId, questionAnswerString);
    setFormState(updatedFormState);
  };

  const unravelQuestions = () => {
    let questions: any[] = [];

    page.questions?.forEach((question) => {
      if (question.loop) {
        let loopVar = question.loop;
        let loopIndex = 0;
        while (loopVar > 0) {
          questions.push(Object.assign({}, question));
          questions[questions.length - 1].vars.push({
            loopIndex: { value: loopIndex },
          });
          loopVar--;
          loopIndex++;
        }
      } else {
        questions.push(question);
      }
    });

    if (page.displayQuestions && page.displayQuestions < questions.length) {
      let condensedQuestions: any[] = [];
      const indexesToInclude = generateUniqueNumbers(
        page.displayQuestions,
        questions.length
      );
      indexesToInclude.forEach((num) => {
        condensedQuestions.push(questions[num]);
      });
      setPageQuestions(condensedQuestions);
    } else {
      setPageQuestions(questions);
    }
  };

  const generateUniqueNumbers = (count: number, max: number): number[] => {
    const included = new Set();
    const numbers: number[] = [];
    while (numbers.length < count) {
      let newNum = Math.floor(Math.random() * max);
      if (!included.has(newNum)) {
        numbers.push(newNum);
        included.add(newNum);
      }
    }
    return numbers;
  };

  const evaluatePageHeader = () => {
    if (!page.header) return;

    try {
      const pageHeaderEvaluated = evaluateProperty(
        page.header,
        formState,
        functionMap,
        {
          ...getGlobalVariables(),
        }
      );
      setPageHeader(pageHeaderEvaluated);
    } catch (err) {
      showError(err);
    }
  };

  const evaluatePageInstructions = () => {
    if (!page.instructions) return;

    try {
      const pageInstructionsEvaluated = evaluateProperty(
        page.instructions,
        formState,
        functionMap,
        {
          ...getGlobalVariables(),
        }
      );
      setPageInstructions(pageInstructionsEvaluated);
    } catch (err) {
      showError(err);
    }
  };

  useEffect(() => {
    clearQuestions();
    evaluatePageHeader();
    evaluatePageInstructions();
  }, [page, location]);

  const clearQuestions = () => {
    setPageQuestions([]);
    setPageInstructions("");
  };

  useEffect(() => {
    if (page.questions && pageQuestions.length === 0) {
      unravelQuestions();
    }
  }, [pageQuestions, location]);

  useEffect(() => {
    evaluatePageHeader();
    evaluatePageInstructions();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Stack spacing={2}>
          {pageHeader && <h1>{pageHeader}</h1>}
          {pageInstructions && <p>{pageInstructions}</p>}
          {pageQuestions?.map((question, index) => (
            <div key={`question-div-${index}`}>
              <Question
                pageId={page.id}
                setQuestionUserAnswer={updateAnswers}
                key={`question-${index}`}
                question={question}
              />
            </div>
          ))}
          {pageQuestions.length > 0 && (
            <>
              <Divider />
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </>
          )}
        </Stack>
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  );
};
