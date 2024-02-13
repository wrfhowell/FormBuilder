import { QuestionsObj, QuestionObj } from "../export";

export class PageObj {
  private header: string | undefined;
  private instructions: string | undefined;
  private id: string | undefined;
  private questions: QuestionsObj | undefined;

  constructor() {}

  initQuestions() {
    this.questions = new QuestionsObj();
  }

  setHeader(str: string) {
    this.header = str;
  }

  setInstructions(str: string) {
    this.instructions = str;
  }

  setId(str: string) {
    this.id = str;
  }

  getId(): string {
    return this.id ?? "";
  }

  getHeader(): string {
    return this.header ?? "";
  }

  getInstructions(): string {
    return this.instructions ?? "";
  }

  getQuestions(): QuestionsObj | undefined {
    return this.questions;
  }

  addQuestion(q: QuestionObj) {
    this.questions?.addQuestion(q);
  }
}
