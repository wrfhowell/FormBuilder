import { ArrayCustom } from "../Nodes/ArrayCustom";
import { ArrayValue } from "../Nodes/ArrayValue";
import { Cond_Body } from "../Nodes/Cond_Body";
import { Conditional } from "../Nodes/Conditional";
import { Else_If_Cond } from "../Nodes/Else_If_Cond";
import { Expression } from "../Nodes/Expression";
import { FormStateAccess } from "../Nodes/FormStateAccess";
import { FunctionCustom } from "../Nodes/FunctionCustom";
import { Function_Body } from "../Nodes/Function_Body";
import { Function_Call } from "../Nodes/Function_Call";
import { Functions_Array } from "../Nodes/Functions_Array";
import { If_Cond } from "../Nodes/If_Cond";
import { MathExpression } from "../Nodes/MathExpression";
import { Question_Array } from "../Nodes/Question_Array";
import { Variable } from "../Nodes/Variable";
import { VariableName } from "../Nodes/VariableName";
import { VariablesArray } from "../Nodes/VariablesArray";
import { Page, Pages, Program, Question } from "../export";
import { VariableAssignment } from "../Nodes/VariableAssignment";
import { ExtendedMathExpression } from "../Nodes/ExtendedMathExpression";
import { MathOp } from "../Nodes/MathOp";

export interface Visitor<C, T> {
  visit(context: C, options: ArrayCustom): T;
  visit(context: C, option: ArrayValue): T;
  visit(context: C, condBody: Cond_Body): T;
  visit(context: C, conditional: Conditional): T;
  visit(context: C, elseIfCond: Else_If_Cond): T;
  visit(context: C, expression: Expression): T;
  visit(context: C, formStateAccess: FormStateAccess): T;
  visit(context: C, funcBody: Function_Body): T;
  visit(context: C, funcCall: Function_Call): T;
  visit(context: C, funcCustom: FunctionCustom): T;
  visit(context: C, funcArray: Functions_Array): T;
  visit(context: C, ifCond: If_Cond): T;
  visit(context: C, mathExpression: MathExpression): T;
  visit(context: C, extendedMathExpression: ExtendedMathExpression): T;
  visit(context: C, page: Page): T;
  visit(context: C, pages: Pages): T;
  visit(context: C, program: Program): T;
  visit(context: C, question: Question): T;
  visit(context: C, questionsArray: Question_Array): T;
  visit(context: C, variable: Variable): T;
  visit(context: C, variableAssignment: VariableAssignment): T;
  visit(context: C, id: VariableName): T;
  visit(context: C, variable: VariablesArray): T;
  visit(context: C, mathOp: MathOp): T;
}
