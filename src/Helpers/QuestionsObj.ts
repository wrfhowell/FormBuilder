import { QuestionObj } from "../export";
export class QuestionsObj {
  questions: QuestionObj[];
  constructor() {
    this.questions = [];
  }

  addQuestion(question: QuestionObj) {
    this.questions.push(question);
  }
}
