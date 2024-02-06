import {Pages, Page, Instructions_Field, Program, Id_Field, Question, Header_Field} from "../export";
import {Page_Array} from "../Nodes/Page_Array";
import {Variable} from "../Nodes/Variable";
import {Question_Array} from "../Nodes/Question_Array";
import {Array_Value} from "../Nodes/Array_Value";
import {ArrayCustom} from "../Nodes/ArrayCustom";
import {Go_Object} from "../Nodes/Go_Object";
import {GoTo_Object} from "../Nodes/GoTo_Object";
import {IsRequired_Field} from "../Nodes/IsRequired_Field";
import {Label_Field} from "../Nodes/Label_Field";
import {Loop_Field} from "../Nodes/Loop_Field";
import {Object_Value} from "../Nodes/Object_Value";
import {ObjectCustom} from "../Nodes/ObjectCustom";
import {Options_Field} from "../Nodes/Options_Field";
import {QuestionType_Field} from "../Nodes/QuestionType_Field";

export interface Visitor<C, T> {
  visit(context: C, arrayValue: Array_Value): T;
  visit(context: C, arrayCustom: ArrayCustom): T;
  visit(context: C, goObject: Go_Object): T;
  visit(context: C, goToObject: GoTo_Object): T;
  visit(context: C, header: Header_Field): T;
  visit(context: C, id: Id_Field): T;
  visit(context: C, instructions: Instructions_Field): T;
  visit(context: C, isRequiredField: IsRequired_Field): T;
  visit(context: C, label_Field: Label_Field): T;
  visit(context: C, loop_Field: Loop_Field): T;
  visit(context: C, objectValue: Object_Value): T;
  visit(context: C, objectCustom: ObjectCustom): T;
  visit(context: C, optionsField: Options_Field): T;
  visit(context: C, page: Page): T;
  visit(context: C, page_array: Page_Array): T;
  visit(context: C, pages: Pages): T;
  visit(context: C, program: Program): T;
  visit(context: C, questionsArray: Question_Array);
  visit(context: C, questions: Question);
  visit(context: C, questionType_Field: QuestionType_Field);
  visit(context: C, variable: Variable): T;
}
