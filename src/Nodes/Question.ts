import {Header_Field, Id_Field, Instructions_Field, Node, Visitor} from "../export";
import {QuestionType_Field} from "./QuestionType_Field";
import {Label_Field} from "./Label_Field";
import {Options_Field} from "./Options_Field";
import {IsRequired_Field} from "./IsRequired_Field";
import {GoTo_Object} from "./GoTo_Object";
import {Question_Array} from "./Question_Array";

export class Question extends Node {

  private id: Id_Field;
  private type: QuestionType_Field;
  private label: Label_Field;
  private options: Options_Field;
  private isRequired: IsRequired_Field;

  constructor(id: Id_Field, type: QuestionType_Field, label: Label_Field, options: Options_Field, isRequired: IsRequired_Field) {
    super();
    this.id = id;
    this.type = QuestionType_Field;
    this.label = Label_Field;
    this.options = Options_Field;
    this.isRequired = IsRequired_Field;
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

  isQuestionRequired() {
    return this.isRequired;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
