import {Node, Visitor} from "../export";

import {Options} from "./Options";
import {Expression} from "./Expression";
import {Regex} from "./Regex";
import {VariablesArray} from "./VariablesArray";
import {VariableName} from "./VariableName";

export class Question extends Node {
  private id: string;
  private type: string | undefined;
  private label:  string | Expression | VariableName | undefined;
  private options: Options;
  private displayIf: string | Regex | Expression | undefined;
  private loop: number | undefined;
  private isRequired: boolean | undefined;
  private correctAnswer: string | number | Regex | Expression | undefined;
  private questionVariables: VariablesArray | undefined

  constructor(id: string, type: string | undefined, label: string | Expression | VariableName | undefined,
              options: Options, dependsOn: string | undefined,
              displayIf: string | Regex | Expression | undefined,
              loop: number | undefined, isRequired: boolean | undefined,
              correctAnswer: string | number | Regex | Expression | undefined, questionVariables: VariablesArray | undefined) {
    super();
    this.id = id;
    this.type = type;
    this.label = label;
    this.options = options;
    this.displayIf = displayIf;
    this.loop = loop;
    this.isRequired = isRequired;
    this.correctAnswer = correctAnswer;
    this.questionVariables = questionVariables;
  }

  getId() {
    return this.id;
  }

  getQuestionType() {
    return this.type;
  }

  getLabel() {
    return this.label;
  }

  getOptions() {
    return this.options
  }

  getDisplayIf() {
    return this.displayIf;
  }

  getLoop() {
    return this.loop;
  }

  isQuestionRequired() {
    return this.isRequired;
  }

  getCorrectAnswer() {
    return this.correctAnswer;
  }

  getQuestionVariables() {
    return this.questionVariables;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
