import { IPage, IAnswer, IQuestion } from "./Interfaces";
import { Question } from "./Question";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";
import { Divider } from "@mui/material";

interface PageProps {
  page: IPage;
}

export const Page = ({ page }: PageProps) => {
  const navigate = useNavigate();
  const [userAnswers, setUserAnswers] = useState<Map<string, IAnswer>>(
    new Map()
  );
  const [questionCorrectAnswers, setQuestionCorrectAnswers] = useState<
    Map<string, string>
  >(new Map());
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
      } else if (question.type === "text") {
        new_answers.set(
          question.id,
          answers.get(question.id)?.textSelection || ""
        );
      }
    });
    return new_answers;
  };

  const validateRequiredQuestions = (
    questions: IQuestion[],
    answers_map: Map<string, string>
  ): boolean => {
    let validationPassed = true;
    questions.forEach((question) => {
      if (question.isRequired && answers_map.get(question.id) === "") {
        console.log(`Question ${question.label} is required`);
        validationPassed = false;
      }
    });
    return validationPassed;
  };

  const handleSubmit = () => {
    if (page.questions) {
      let converted_answers = new Map<string, string>();
      converted_answers = convertIAnswerToAnswer(pageQuestions, userAnswers);
      const validationPassed = validateRequiredQuestions(
        pageQuestions,
        converted_answers
      );
      if (validationPassed && page.goTo) {
        const nextPage = page.goTo(converted_answers, questionCorrectAnswers);
        navigate(`/${nextPage}`);
      }
    }
  };

  const updateCorrectAnswers = (questionId: string, ans: string) => {
    const currentQuestionCorrectAnswers = questionCorrectAnswers;
    currentQuestionCorrectAnswers.set(questionId, ans);
    setQuestionCorrectAnswers(currentQuestionCorrectAnswers);
    console.log("page correct answers: ", currentQuestionCorrectAnswers);
  };

  const updateAnswers = (questionId: string, ans: IAnswer) => {
    const currentAnswers = userAnswers;
    currentAnswers.set(questionId, ans);
    setUserAnswers(currentAnswers);
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
          console.log(questions);
          loopVar--;
          loopIndex++;
        }
      } else {
        questions.push(question);
      }
    });

    setPageQuestions(questions);
  };

  useEffect(() => {
    unravelQuestions();
  }, [page]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Stack spacing={2}>
          <h1>{page.header}</h1>
          <p>{page.instructions}</p>
          {pageQuestions?.map((question) => (
            <>
              <Divider />
              <Question
                setQuestionUserAnswer={updateAnswers}
                setQuestionCorrectAnswer={updateCorrectAnswers}
                key={question.id}
                question={question}
              />
            </>
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
