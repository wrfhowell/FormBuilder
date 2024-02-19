// Generated from ./src/AST/parser/FormGeneratorParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `FormGeneratorParser`.
 */
export interface FormGeneratorParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `FormGeneratorParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.pages`.
	 * @param ctx the parse tree
	 */
	enterPages?: (ctx: PagesContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.pages`.
	 * @param ctx the parse tree
	 */
	exitPages?: (ctx: PagesContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.page_array`.
	 * @param ctx the parse tree
	 */
	enterPage_array?: (ctx: Page_arrayContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.page_array`.
	 * @param ctx the parse tree
	 */
	exitPage_array?: (ctx: Page_arrayContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.page`.
	 * @param ctx the parse tree
	 */
	enterPage?: (ctx: PageContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.page`.
	 * @param ctx the parse tree
	 */
	exitPage?: (ctx: PageContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.page_fields`.
	 * @param ctx the parse tree
	 */
	enterPage_fields?: (ctx: Page_fieldsContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.page_fields`.
	 * @param ctx the parse tree
	 */
	exitPage_fields?: (ctx: Page_fieldsContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.page_field`.
	 * @param ctx the parse tree
	 */
	enterPage_field?: (ctx: Page_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.page_field`.
	 * @param ctx the parse tree
	 */
	exitPage_field?: (ctx: Page_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.page_id_field`.
	 * @param ctx the parse tree
	 */
	enterPage_id_field?: (ctx: Page_id_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.page_id_field`.
	 * @param ctx the parse tree
	 */
	exitPage_id_field?: (ctx: Page_id_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.header_field`.
	 * @param ctx the parse tree
	 */
	enterHeader_field?: (ctx: Header_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.header_field`.
	 * @param ctx the parse tree
	 */
	exitHeader_field?: (ctx: Header_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.instructions_field`.
	 * @param ctx the parse tree
	 */
	enterInstructions_field?: (ctx: Instructions_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.instructions_field`.
	 * @param ctx the parse tree
	 */
	exitInstructions_field?: (ctx: Instructions_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.questions_field`.
	 * @param ctx the parse tree
	 */
	enterQuestions_field?: (ctx: Questions_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.questions_field`.
	 * @param ctx the parse tree
	 */
	exitQuestions_field?: (ctx: Questions_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.goTo_field`.
	 * @param ctx the parse tree
	 */
	enterGoTo_field?: (ctx: GoTo_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.goTo_field`.
	 * @param ctx the parse tree
	 */
	exitGoTo_field?: (ctx: GoTo_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.displayQuestions_field`.
	 * @param ctx the parse tree
	 */
	enterDisplayQuestions_field?: (ctx: DisplayQuestions_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.displayQuestions_field`.
	 * @param ctx the parse tree
	 */
	exitDisplayQuestions_field?: (ctx: DisplayQuestions_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.text_field_value`.
	 * @param ctx the parse tree
	 */
	enterText_field_value?: (ctx: Text_field_valueContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.text_field_value`.
	 * @param ctx the parse tree
	 */
	exitText_field_value?: (ctx: Text_field_valueContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.variables`.
	 * @param ctx the parse tree
	 */
	enterVariables?: (ctx: VariablesContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.variables`.
	 * @param ctx the parse tree
	 */
	exitVariables?: (ctx: VariablesContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.variables_object`.
	 * @param ctx the parse tree
	 */
	enterVariables_object?: (ctx: Variables_objectContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.variables_object`.
	 * @param ctx the parse tree
	 */
	exitVariables_object?: (ctx: Variables_objectContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.variable`.
	 * @param ctx the parse tree
	 */
	enterVariable?: (ctx: VariableContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.variable`.
	 * @param ctx the parse tree
	 */
	exitVariable?: (ctx: VariableContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.variable_value`.
	 * @param ctx the parse tree
	 */
	enterVariable_value?: (ctx: Variable_valueContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.variable_value`.
	 * @param ctx the parse tree
	 */
	exitVariable_value?: (ctx: Variable_valueContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.question_array`.
	 * @param ctx the parse tree
	 */
	enterQuestion_array?: (ctx: Question_arrayContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.question_array`.
	 * @param ctx the parse tree
	 */
	exitQuestion_array?: (ctx: Question_arrayContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.question`.
	 * @param ctx the parse tree
	 */
	enterQuestion?: (ctx: QuestionContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.question`.
	 * @param ctx the parse tree
	 */
	exitQuestion?: (ctx: QuestionContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.question_fields`.
	 * @param ctx the parse tree
	 */
	enterQuestion_fields?: (ctx: Question_fieldsContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.question_fields`.
	 * @param ctx the parse tree
	 */
	exitQuestion_fields?: (ctx: Question_fieldsContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.question_field`.
	 * @param ctx the parse tree
	 */
	enterQuestion_field?: (ctx: Question_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.question_field`.
	 * @param ctx the parse tree
	 */
	exitQuestion_field?: (ctx: Question_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.id_field`.
	 * @param ctx the parse tree
	 */
	enterId_field?: (ctx: Id_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.id_field`.
	 * @param ctx the parse tree
	 */
	exitId_field?: (ctx: Id_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.type_field`.
	 * @param ctx the parse tree
	 */
	enterType_field?: (ctx: Type_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.type_field`.
	 * @param ctx the parse tree
	 */
	exitType_field?: (ctx: Type_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.label_field`.
	 * @param ctx the parse tree
	 */
	enterLabel_field?: (ctx: Label_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.label_field`.
	 * @param ctx the parse tree
	 */
	exitLabel_field?: (ctx: Label_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.options_field`.
	 * @param ctx the parse tree
	 */
	enterOptions_field?: (ctx: Options_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.options_field`.
	 * @param ctx the parse tree
	 */
	exitOptions_field?: (ctx: Options_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.dependsOn_field`.
	 * @param ctx the parse tree
	 */
	enterDependsOn_field?: (ctx: DependsOn_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.dependsOn_field`.
	 * @param ctx the parse tree
	 */
	exitDependsOn_field?: (ctx: DependsOn_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.displayIf_field`.
	 * @param ctx the parse tree
	 */
	enterDisplayIf_field?: (ctx: DisplayIf_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.displayIf_field`.
	 * @param ctx the parse tree
	 */
	exitDisplayIf_field?: (ctx: DisplayIf_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.loop_field`.
	 * @param ctx the parse tree
	 */
	enterLoop_field?: (ctx: Loop_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.loop_field`.
	 * @param ctx the parse tree
	 */
	exitLoop_field?: (ctx: Loop_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.isRequired_field`.
	 * @param ctx the parse tree
	 */
	enterIsRequired_field?: (ctx: IsRequired_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.isRequired_field`.
	 * @param ctx the parse tree
	 */
	exitIsRequired_field?: (ctx: IsRequired_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.correctAnswer_field`.
	 * @param ctx the parse tree
	 */
	enterCorrectAnswer_field?: (ctx: CorrectAnswer_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.correctAnswer_field`.
	 * @param ctx the parse tree
	 */
	exitCorrectAnswer_field?: (ctx: CorrectAnswer_fieldContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.array`.
	 * @param ctx the parse tree
	 */
	enterArray?: (ctx: ArrayContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.array`.
	 * @param ctx the parse tree
	 */
	exitArray?: (ctx: ArrayContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.array_value`.
	 * @param ctx the parse tree
	 */
	enterArray_value?: (ctx: Array_valueContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.array_value`.
	 * @param ctx the parse tree
	 */
	exitArray_value?: (ctx: Array_valueContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.question_type`.
	 * @param ctx the parse tree
	 */
	enterQuestion_type?: (ctx: Question_typeContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.question_type`.
	 * @param ctx the parse tree
	 */
	exitQuestion_type?: (ctx: Question_typeContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.functions`.
	 * @param ctx the parse tree
	 */
	enterFunctions?: (ctx: FunctionsContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.functions`.
	 * @param ctx the parse tree
	 */
	exitFunctions?: (ctx: FunctionsContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.function_array`.
	 * @param ctx the parse tree
	 */
	enterFunction_array?: (ctx: Function_arrayContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.function_array`.
	 * @param ctx the parse tree
	 */
	exitFunction_array?: (ctx: Function_arrayContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.function`.
	 * @param ctx the parse tree
	 */
	enterFunction?: (ctx: FunctionContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.function`.
	 * @param ctx the parse tree
	 */
	exitFunction?: (ctx: FunctionContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.function_params`.
	 * @param ctx the parse tree
	 */
	enterFunction_params?: (ctx: Function_paramsContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.function_params`.
	 * @param ctx the parse tree
	 */
	exitFunction_params?: (ctx: Function_paramsContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.parameter`.
	 * @param ctx the parse tree
	 */
	enterParameter?: (ctx: ParameterContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.parameter`.
	 * @param ctx the parse tree
	 */
	exitParameter?: (ctx: ParameterContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.function_body`.
	 * @param ctx the parse tree
	 */
	enterFunction_body?: (ctx: Function_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.function_body`.
	 * @param ctx the parse tree
	 */
	exitFunction_body?: (ctx: Function_bodyContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.var_assignment`.
	 * @param ctx the parse tree
	 */
	enterVar_assignment?: (ctx: Var_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.var_assignment`.
	 * @param ctx the parse tree
	 */
	exitVar_assignment?: (ctx: Var_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.returnValue`.
	 * @param ctx the parse tree
	 */
	enterReturnValue?: (ctx: ReturnValueContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.returnValue`.
	 * @param ctx the parse tree
	 */
	exitReturnValue?: (ctx: ReturnValueContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.function_call`.
	 * @param ctx the parse tree
	 */
	enterFunction_call?: (ctx: Function_callContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.function_call`.
	 * @param ctx the parse tree
	 */
	exitFunction_call?: (ctx: Function_callContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.conditional`.
	 * @param ctx the parse tree
	 */
	enterConditional?: (ctx: ConditionalContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.conditional`.
	 * @param ctx the parse tree
	 */
	exitConditional?: (ctx: ConditionalContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.if_cond`.
	 * @param ctx the parse tree
	 */
	enterIf_cond?: (ctx: If_condContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.if_cond`.
	 * @param ctx the parse tree
	 */
	exitIf_cond?: (ctx: If_condContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.else_if_cond`.
	 * @param ctx the parse tree
	 */
	enterElse_if_cond?: (ctx: Else_if_condContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.else_if_cond`.
	 * @param ctx the parse tree
	 */
	exitElse_if_cond?: (ctx: Else_if_condContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.else_cond`.
	 * @param ctx the parse tree
	 */
	enterElse_cond?: (ctx: Else_condContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.else_cond`.
	 * @param ctx the parse tree
	 */
	exitElse_cond?: (ctx: Else_condContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.condition`.
	 * @param ctx the parse tree
	 */
	enterCondition?: (ctx: ConditionContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.condition`.
	 * @param ctx the parse tree
	 */
	exitCondition?: (ctx: ConditionContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.cond_body`.
	 * @param ctx the parse tree
	 */
	enterCond_body?: (ctx: Cond_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.cond_body`.
	 * @param ctx the parse tree
	 */
	exitCond_body?: (ctx: Cond_bodyContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.returnValueIf`.
	 * @param ctx the parse tree
	 */
	enterReturnValueIf?: (ctx: ReturnValueIfContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.returnValueIf`.
	 * @param ctx the parse tree
	 */
	exitReturnValueIf?: (ctx: ReturnValueIfContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.math_expression`.
	 * @param ctx the parse tree
	 */
	enterMath_expression?: (ctx: Math_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.math_expression`.
	 * @param ctx the parse tree
	 */
	exitMath_expression?: (ctx: Math_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.extended_math_expression`.
	 * @param ctx the parse tree
	 */
	enterExtended_math_expression?: (ctx: Extended_math_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.extended_math_expression`.
	 * @param ctx the parse tree
	 */
	exitExtended_math_expression?: (ctx: Extended_math_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.math_op`.
	 * @param ctx the parse tree
	 */
	enterMath_op?: (ctx: Math_opContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.math_op`.
	 * @param ctx the parse tree
	 */
	exitMath_op?: (ctx: Math_opContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.form_state_access`.
	 * @param ctx the parse tree
	 */
	enterForm_state_access?: (ctx: Form_state_accessContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.form_state_access`.
	 * @param ctx the parse tree
	 */
	exitForm_state_access?: (ctx: Form_state_accessContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.path_to_key`.
	 * @param ctx the parse tree
	 */
	enterPath_to_key?: (ctx: Path_to_keyContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.path_to_key`.
	 * @param ctx the parse tree
	 */
	exitPath_to_key?: (ctx: Path_to_keyContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.path_to_page_key`.
	 * @param ctx the parse tree
	 */
	enterPath_to_page_key?: (ctx: Path_to_page_keyContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.path_to_page_key`.
	 * @param ctx the parse tree
	 */
	exitPath_to_page_key?: (ctx: Path_to_page_keyContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.path_to_question_key`.
	 * @param ctx the parse tree
	 */
	enterPath_to_question_key?: (ctx: Path_to_question_keyContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.path_to_question_key`.
	 * @param ctx the parse tree
	 */
	exitPath_to_question_key?: (ctx: Path_to_question_keyContext) => void;

	/**
	 * Enter a parse tree produced by `FormGeneratorParser.boolean`.
	 * @param ctx the parse tree
	 */
	enterBoolean?: (ctx: BooleanContext) => void;
	/**
	 * Exit a parse tree produced by `FormGeneratorParser.boolean`.
	 * @param ctx the parse tree
	 */
	exitBoolean?: (ctx: BooleanContext) => void;
}

