// Generated from ./src/AST/parser/FormGeneratorParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ProgramContext } from "./FormGeneratorParser";
import { PagesContext } from "./FormGeneratorParser";
import { Page_arrayContext } from "./FormGeneratorParser";
import { PageContext } from "./FormGeneratorParser";
import { Page_fieldsContext } from "./FormGeneratorParser";
import { Page_fieldContext } from "./FormGeneratorParser";
import { Page_id_fieldContext } from "./FormGeneratorParser";
import { Header_fieldContext } from "./FormGeneratorParser";
import { Instructions_fieldContext } from "./FormGeneratorParser";
import { Questions_fieldContext } from "./FormGeneratorParser";
import { GoTo_fieldContext } from "./FormGeneratorParser";
import { DisplayQuestions_fieldContext } from "./FormGeneratorParser";
import { Text_field_valueContext } from "./FormGeneratorParser";
import { VariablesContext } from "./FormGeneratorParser";
import { Variables_objectContext } from "./FormGeneratorParser";
import { VariableContext } from "./FormGeneratorParser";
import { Variable_valueContext } from "./FormGeneratorParser";
import { Question_arrayContext } from "./FormGeneratorParser";
import { QuestionContext } from "./FormGeneratorParser";
import { Question_fieldsContext } from "./FormGeneratorParser";
import { Question_fieldContext } from "./FormGeneratorParser";
import { Id_fieldContext } from "./FormGeneratorParser";
import { Type_fieldContext } from "./FormGeneratorParser";
import { Label_fieldContext } from "./FormGeneratorParser";
import { Options_fieldContext } from "./FormGeneratorParser";
import { DependsOn_fieldContext } from "./FormGeneratorParser";
import { DisplayIf_fieldContext } from "./FormGeneratorParser";
import { Loop_fieldContext } from "./FormGeneratorParser";
import { IsRequired_fieldContext } from "./FormGeneratorParser";
import { CorrectAnswer_fieldContext } from "./FormGeneratorParser";
import { ArrayContext } from "./FormGeneratorParser";
import { Array_valueContext } from "./FormGeneratorParser";
import { Question_typeContext } from "./FormGeneratorParser";
import { FunctionsContext } from "./FormGeneratorParser";
import { Function_arrayContext } from "./FormGeneratorParser";
import { FunctionContext } from "./FormGeneratorParser";
import { Function_paramsContext } from "./FormGeneratorParser";
import { ParameterContext } from "./FormGeneratorParser";
import { Function_bodyContext } from "./FormGeneratorParser";
import { StatementContext } from "./FormGeneratorParser";
import { Var_assignmentContext } from "./FormGeneratorParser";
import { ReturnValueContext } from "./FormGeneratorParser";
import { Function_callContext } from "./FormGeneratorParser";
import { ConditionalContext } from "./FormGeneratorParser";
import { If_condContext } from "./FormGeneratorParser";
import { Else_if_condContext } from "./FormGeneratorParser";
import { Else_condContext } from "./FormGeneratorParser";
import { ConditionContext } from "./FormGeneratorParser";
import { Cond_bodyContext } from "./FormGeneratorParser";
import { ReturnValueIfContext } from "./FormGeneratorParser";
import { ExpressionContext } from "./FormGeneratorParser";
import { Math_expressionContext } from "./FormGeneratorParser";
import { Extended_math_expressionContext } from "./FormGeneratorParser";
import { Math_opContext } from "./FormGeneratorParser";
import { Form_state_accessContext } from "./FormGeneratorParser";
import { Path_to_keyContext } from "./FormGeneratorParser";
import { Path_to_page_keyContext } from "./FormGeneratorParser";
import { Path_to_question_keyContext } from "./FormGeneratorParser";
import { BooleanContext } from "./FormGeneratorParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `FormGeneratorParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface FormGeneratorParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `FormGeneratorParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.pages`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPages?: (ctx: PagesContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.page_array`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPage_array?: (ctx: Page_arrayContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.page`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPage?: (ctx: PageContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.page_fields`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPage_fields?: (ctx: Page_fieldsContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.page_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPage_field?: (ctx: Page_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.page_id_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPage_id_field?: (ctx: Page_id_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.header_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHeader_field?: (ctx: Header_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.instructions_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstructions_field?: (ctx: Instructions_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.questions_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuestions_field?: (ctx: Questions_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.goTo_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGoTo_field?: (ctx: GoTo_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.displayQuestions_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDisplayQuestions_field?: (ctx: DisplayQuestions_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.text_field_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitText_field_value?: (ctx: Text_field_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.variables`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariables?: (ctx: VariablesContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.variables_object`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariables_object?: (ctx: Variables_objectContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.variable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable?: (ctx: VariableContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.variable_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_value?: (ctx: Variable_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.question_array`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuestion_array?: (ctx: Question_arrayContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.question`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuestion?: (ctx: QuestionContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.question_fields`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuestion_fields?: (ctx: Question_fieldsContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.question_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuestion_field?: (ctx: Question_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.id_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitId_field?: (ctx: Id_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.type_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_field?: (ctx: Type_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.label_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLabel_field?: (ctx: Label_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.options_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptions_field?: (ctx: Options_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.dependsOn_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDependsOn_field?: (ctx: DependsOn_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.displayIf_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDisplayIf_field?: (ctx: DisplayIf_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.loop_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoop_field?: (ctx: Loop_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.isRequired_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIsRequired_field?: (ctx: IsRequired_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.correctAnswer_field`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCorrectAnswer_field?: (ctx: CorrectAnswer_fieldContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.array`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray?: (ctx: ArrayContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.array_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_value?: (ctx: Array_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.question_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuestion_type?: (ctx: Question_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.functions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctions?: (ctx: FunctionsContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.function_array`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_array?: (ctx: Function_arrayContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.function`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction?: (ctx: FunctionContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.function_params`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_params?: (ctx: Function_paramsContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.parameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter?: (ctx: ParameterContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.function_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_body?: (ctx: Function_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.var_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVar_assignment?: (ctx: Var_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.returnValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnValue?: (ctx: ReturnValueContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.function_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_call?: (ctx: Function_callContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.conditional`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditional?: (ctx: ConditionalContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.if_cond`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_cond?: (ctx: If_condContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.else_if_cond`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElse_if_cond?: (ctx: Else_if_condContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.else_cond`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElse_cond?: (ctx: Else_condContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCondition?: (ctx: ConditionContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.cond_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCond_body?: (ctx: Cond_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.returnValueIf`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnValueIf?: (ctx: ReturnValueIfContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.math_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMath_expression?: (ctx: Math_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.extended_math_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExtended_math_expression?: (ctx: Extended_math_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.math_op`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMath_op?: (ctx: Math_opContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.form_state_access`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForm_state_access?: (ctx: Form_state_accessContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.path_to_key`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPath_to_key?: (ctx: Path_to_keyContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.path_to_page_key`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPath_to_page_key?: (ctx: Path_to_page_keyContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.path_to_question_key`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPath_to_question_key?: (ctx: Path_to_question_keyContext) => Result;

	/**
	 * Visit a parse tree produced by `FormGeneratorParser.boolean`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolean?: (ctx: BooleanContext) => Result;
}

