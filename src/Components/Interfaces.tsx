export interface IPage {
  id: string;
  header?: string;
  instructions?: string;
  goTo?: (ans: Map<string, string>) => string;
  questions?: IQuestion[];
}

export type QuestionType = "radio" | "checkbox" | "dropdown" | "text";

export interface IQuestion {
  id: string;
  type: QuestionType;
  label: string;
  options?: string[];
  isRequired: boolean;
}

export interface IAnswer {
  radioSelection?: string;
  textSelection?: string;
  dropdownSelection?: boolean;
  checkboxSelection?: string[];
}
