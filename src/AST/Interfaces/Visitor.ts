import {Pages, Page, Program, Question} from "../export";
import {VariablesArray} from "../Nodes/VariablesArray";
import {Question_Array} from "../Nodes/Question_Array";
import {Options} from "../Nodes/Options";
import {Expression} from "../Nodes/Expression";
import {GoTo_Object} from "../Nodes/GoTo_Object";
import {Option} from "../Nodes/Option";
import {Regex} from "../Nodes/Regex";
import {Variable} from "../Nodes/Variable";
import {VariableName} from "../Nodes/VariableName";
import {MathExpression} from "../Nodes/MathExpression";
import {StringExpression} from "../Nodes/StringExpression";

export interface Visitor<C, T> {
  visit(context: C, expression: Expression): T;
  visit(context: C, goToObject: GoTo_Object): T;
  visit(context: C, mathExpression: MathExpression): T;
  visit(context: C, option: Option): T;
  visit(context: C, options: Options): T;
  visit(context: C, page: Page): T;
  visit(context: C, pages: Pages): T;
  visit(context: C, program: Program): T;
  visit(context: C, question: Question): T;
  visit(context: C, questionsArray: Question_Array): T;
  visit(context: C, regex: Regex): T;
  visit(context: C, stringExpression: StringExpression): T;
  visit(context: C, variable: Variable): T;
  visit(context: C, id: VariableName): T;
  visit(context: C, variable: VariablesArray): T;
}
