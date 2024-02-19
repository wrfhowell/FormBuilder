import { IPage, IAnswer, IQuestion, FunctionBinding } from "./Interfaces";
import { Question } from "./Question";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";
import { Divider } from "@mui/material";
import React from "react";
import { useGlobalQuizContext } from "./Context";
import {
  FunctionEvaluator,
  FunctionEvaluatorContext,
} from "../AST/Evaluator/FunctionEvaluator";
import { VariableName } from "src/AST/Nodes/VariableName";

interface PageProps {
  page: IPage;
  iteration: number;
}

export const Page = ({ page, iteration }: PageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setFormState, formState, functionMap } = useGlobalQuizContext();
  const [userAnswers, setUserAnswers] = useState<Map<string, IAnswer>>(
    new Map()
  );
  const [pageQuestions, setPageQuestions] = useState<IQuestion[]>([]);

  const convertIAnswerToAnswer = (
    questions: IQuestion[],
    answers: Map<string, IAnswer>
  ): Map<string, string> => {
    const new_answers = new Map<string, string>();
    questions.forEach((question, index) => {
      if (question.type === "checkbox") {
        new_answers.set(
          question.id,
          (answers.get(question.id)?.checkboxSelection || [""]).join(",")
        );
      } else if (question.type === "radio") {
        new_answers.set(
          question.id,
          answers.get(question.id)?.radioSelection || ""
        );
      } else if (question.type === "dropdown") {
        new_answers.set(
          question.id,
          answers.get(question.id)?.dropdownSelection?.toString() || ""
        );
      } else if (question.type === "textInput") {
        new_answers.set(
          question.id,
          answers.get(question.id)?.textSelection || ""
        );
      }
    });
    return new_answers;
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
        vars: {},
        globalVars: updatedGlobalVars,
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
        passedArguments: property.args,
        vars: {},
        globalVars: updatedGlobalVars,
        functions: functionMap,
        returnValue: 0,
      };
      functionEvaluator.visit(context, property.value);
      window.globalVars = updatedGlobalVars;
      propertyValue = context.returnValue;
    }
    return propertyValue.toString();
  };

  const validateRequiredQuestions = (
    questions: IQuestion[],
    answers_map: Map<string, string>
  ): boolean => {
    let validationPassed = true;
    questions.forEach((question) => {
      if (question.isRequired && answers_map.get(question.id) === "") {
        // console.log(`Question ${question.label} is required`);
        validationPassed = false;
      }
    });
    return validationPassed;
  };

  const handleSubmit = () => {
    if (page.questions) {
      // let converted_answers = new Map<string, string>();
      // converted_answers = convertIAnswerToAnswer(pageQuestions, userAnswers);

      // const validationPassed = validateRequiredQuestions(
      //   pageQuestions,
      //   converted_answers
      // );
      // if (validationPassed && page.goTo) {

      if (page.goTo) {
        const nextPage = evaluateProperty(page.goTo).replace(/["]/g, "");
        if (nextPage === location.pathname) {
          navigate(`/${nextPage}`, { state: iteration + 1, replace: true });
        } else {
          navigate(`/${nextPage}`, { replace: true });
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
          questions[questions.length - 1].id = question.id + loopIndex;
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

  useEffect(() => {
    clearQuestions();
  }, [page, location]);

  const clearQuestions = () => {
    setPageQuestions([]);
  };

  useEffect(() => {
    if (page.questions && pageQuestions.length === 0) {
      unravelQuestions();
    }
  }, [pageQuestions, location]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Stack spacing={2}>
          <h1>{page.header}</h1>
          <p>{page.instructions}</p>
          {pageQuestions?.map((question) => (
            <div key={question.id}>
              <Question
                pageId={page.id}
                setQuestionUserAnswer={updateAnswers}
                key={question.id}
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
