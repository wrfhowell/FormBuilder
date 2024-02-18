import { FunctionCustom } from "../AST/Nodes/FunctionCustom";
import { Function_Call } from "../AST/Nodes/Function_Call";

export interface IPage {
  id: string;
  header?: string;
  displayQuestions?: number;
  instructions?: string;
  goTo?: (ans: Map<string, string>, correctAns: Map<string, string>) => string;
  questions?: IQuestion[];
}

export type QuestionType = "radio" | "checkbox" | "dropdown" | "text";

export interface IQuestion {
  id: string;
  type: QuestionType;
  label: FunctionBinding;
  isRequired: boolean;
  options?: string[];
  loop?: number;
  correctAnswer?: FunctionBinding;
  vars?: Vars[];
}

export interface IAnswer {
  radioSelection?: string;
  textSelection?: string;
  dropdownSelection?: boolean;
  checkboxSelection?: string[];
}

export interface FunctionBinding {
  value: Function;
  args?: (string | number | Function_Call)[];
}

export type Function =
  | string
  | number
  | FunctionCustom
  | ((...args: any[]) => string)
  | ((...args: any[]) => number);

export type Vars = {
  [key: string]: FunctionBinding;
};
