import { IQuestion, IAnswer } from "./Interfaces";
import { QuestionRadio } from "./QuestionRadio";
import { QuestionCheckbox } from "./QuestionCheckbox";
import { QuestionText } from "./QuestionText";
import { QuestionDropdown } from "./QuestionDropdown";

interface QuestionProps {
  question: IQuestion;
  setAnswer: (questionId: string, ans: IAnswer) => void;
}

export const Question = ({ question, setAnswer }: QuestionProps) => {
  const questionObj = {
    text: <QuestionText id={question.id} setAnswer={setAnswer} />,
    dropdown: (
      <QuestionDropdown
        id={question.id}
        setAnswer={setAnswer}
        options={question.options}
      />
    ),
    checkbox: (
      <QuestionCheckbox
        id={question.id}
        options={question.options}
        setAnswer={setAnswer}
      />
    ),
    radio: (
      <QuestionRadio
        options={question.options}
        id={question.id}
        setAnswer={setAnswer}
      />
    ),
  };

  return (
    <div>
      <h2>{question.label}</h2>
      {questionObj[question.type]}
    </div>
  );
};
