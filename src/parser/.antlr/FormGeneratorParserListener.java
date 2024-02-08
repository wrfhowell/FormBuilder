// Generated from c:/Users/RSF/OneDrive/BCS/cpsc 410/Group14Project1/src/parser/FormGeneratorParser.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link FormGeneratorParser}.
 */
public interface FormGeneratorParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#program}.
	 * @param ctx the parse tree
	 */
	void enterProgram(FormGeneratorParser.ProgramContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#program}.
	 * @param ctx the parse tree
	 */
	void exitProgram(FormGeneratorParser.ProgramContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#pages}.
	 * @param ctx the parse tree
	 */
	void enterPages(FormGeneratorParser.PagesContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#pages}.
	 * @param ctx the parse tree
	 */
	void exitPages(FormGeneratorParser.PagesContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#page_array}.
	 * @param ctx the parse tree
	 */
	void enterPage_array(FormGeneratorParser.Page_arrayContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#page_array}.
	 * @param ctx the parse tree
	 */
	void exitPage_array(FormGeneratorParser.Page_arrayContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#page}.
	 * @param ctx the parse tree
	 */
	void enterPage(FormGeneratorParser.PageContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#page}.
	 * @param ctx the parse tree
	 */
	void exitPage(FormGeneratorParser.PageContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#page_fields}.
	 * @param ctx the parse tree
	 */
	void enterPage_fields(FormGeneratorParser.Page_fieldsContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#page_fields}.
	 * @param ctx the parse tree
	 */
	void exitPage_fields(FormGeneratorParser.Page_fieldsContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#id_field}.
	 * @param ctx the parse tree
	 */
	void enterId_field(FormGeneratorParser.Id_fieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#id_field}.
	 * @param ctx the parse tree
	 */
	void exitId_field(FormGeneratorParser.Id_fieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#header_field}.
	 * @param ctx the parse tree
	 */
	void enterHeader_field(FormGeneratorParser.Header_fieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#header_field}.
	 * @param ctx the parse tree
	 */
	void exitHeader_field(FormGeneratorParser.Header_fieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#instructions_field}.
	 * @param ctx the parse tree
	 */
	void enterInstructions_field(FormGeneratorParser.Instructions_fieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#instructions_field}.
	 * @param ctx the parse tree
	 */
	void exitInstructions_field(FormGeneratorParser.Instructions_fieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#questions_field}.
	 * @param ctx the parse tree
	 */
	void enterQuestions_field(FormGeneratorParser.Questions_fieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#questions_field}.
	 * @param ctx the parse tree
	 */
	void exitQuestions_field(FormGeneratorParser.Questions_fieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#goTo_field}.
	 * @param ctx the parse tree
	 */
	void enterGoTo_field(FormGeneratorParser.GoTo_fieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#goTo_field}.
	 * @param ctx the parse tree
	 */
	void exitGoTo_field(FormGeneratorParser.GoTo_fieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#displayQuestions_field}.
	 * @param ctx the parse tree
	 */
	void enterDisplayQuestions_field(FormGeneratorParser.DisplayQuestions_fieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#displayQuestions_field}.
	 * @param ctx the parse tree
	 */
	void exitDisplayQuestions_field(FormGeneratorParser.DisplayQuestions_fieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#variables}.
	 * @param ctx the parse tree
	 */
	void enterVariables(FormGeneratorParser.VariablesContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#variables}.
	 * @param ctx the parse tree
	 */
	void exitVariables(FormGeneratorParser.VariablesContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#variables_object}.
	 * @param ctx the parse tree
	 */
	void enterVariables_object(FormGeneratorParser.Variables_objectContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#variables_object}.
	 * @param ctx the parse tree
	 */
	void exitVariables_object(FormGeneratorParser.Variables_objectContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#variable_value}.
	 * @param ctx the parse tree
	 */
	void enterVariable_value(FormGeneratorParser.Variable_valueContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#variable_value}.
	 * @param ctx the parse tree
	 */
	void exitVariable_value(FormGeneratorParser.Variable_valueContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#question_array}.
	 * @param ctx the parse tree
	 */
	void enterQuestion_array(FormGeneratorParser.Question_arrayContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#question_array}.
	 * @param ctx the parse tree
	 */
	void exitQuestion_array(FormGeneratorParser.Question_arrayContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#question}.
	 * @param ctx the parse tree
	 */
	void enterQuestion(FormGeneratorParser.QuestionContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#question}.
	 * @param ctx the parse tree
	 */
	void exitQuestion(FormGeneratorParser.QuestionContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#question_fields}.
	 * @param ctx the parse tree
	 */
	void enterQuestion_fields(FormGeneratorParser.Question_fieldsContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#question_fields}.
	 * @param ctx the parse tree
	 */
	void exitQuestion_fields(FormGeneratorParser.Question_fieldsContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#type_field}.
	 * @param ctx the parse tree
	 */
	void enterType_field(FormGeneratorParser.Type_fieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#type_field}.
	 * @param ctx the parse tree
	 */
	void exitType_field(FormGeneratorParser.Type_fieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#label_field}.
	 * @param ctx the parse tree
	 */
	void enterLabel_field(FormGeneratorParser.Label_fieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#label_field}.
	 * @param ctx the parse tree
	 */
	void exitLabel_field(FormGeneratorParser.Label_fieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#options_field}.
	 * @param ctx the parse tree
	 */
	void enterOptions_field(FormGeneratorParser.Options_fieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#options_field}.
	 * @param ctx the parse tree
	 */
	void exitOptions_field(FormGeneratorParser.Options_fieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#dependsOn_field}.
	 * @param ctx the parse tree
	 */
	void enterDependsOn_field(FormGeneratorParser.DependsOn_fieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#dependsOn_field}.
	 * @param ctx the parse tree
	 */
	void exitDependsOn_field(FormGeneratorParser.DependsOn_fieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#displayIf_field}.
	 * @param ctx the parse tree
	 */
	void enterDisplayIf_field(FormGeneratorParser.DisplayIf_fieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#displayIf_field}.
	 * @param ctx the parse tree
	 */
	void exitDisplayIf_field(FormGeneratorParser.DisplayIf_fieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#loop_field}.
	 * @param ctx the parse tree
	 */
	void enterLoop_field(FormGeneratorParser.Loop_fieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#loop_field}.
	 * @param ctx the parse tree
	 */
	void exitLoop_field(FormGeneratorParser.Loop_fieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#isRequired_field}.
	 * @param ctx the parse tree
	 */
	void enterIsRequired_field(FormGeneratorParser.IsRequired_fieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#isRequired_field}.
	 * @param ctx the parse tree
	 */
	void exitIsRequired_field(FormGeneratorParser.IsRequired_fieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#correctAnswer_field}.
	 * @param ctx the parse tree
	 */
	void enterCorrectAnswer_field(FormGeneratorParser.CorrectAnswer_fieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#correctAnswer_field}.
	 * @param ctx the parse tree
	 */
	void exitCorrectAnswer_field(FormGeneratorParser.CorrectAnswer_fieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#array}.
	 * @param ctx the parse tree
	 */
	void enterArray(FormGeneratorParser.ArrayContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#array}.
	 * @param ctx the parse tree
	 */
	void exitArray(FormGeneratorParser.ArrayContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#array_value}.
	 * @param ctx the parse tree
	 */
	void enterArray_value(FormGeneratorParser.Array_valueContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#array_value}.
	 * @param ctx the parse tree
	 */
	void exitArray_value(FormGeneratorParser.Array_valueContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#object}.
	 * @param ctx the parse tree
	 */
	void enterObject(FormGeneratorParser.ObjectContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#object}.
	 * @param ctx the parse tree
	 */
	void exitObject(FormGeneratorParser.ObjectContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#object_value}.
	 * @param ctx the parse tree
	 */
	void enterObject_value(FormGeneratorParser.Object_valueContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#object_value}.
	 * @param ctx the parse tree
	 */
	void exitObject_value(FormGeneratorParser.Object_valueContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#question_type}.
	 * @param ctx the parse tree
	 */
	void enterQuestion_type(FormGeneratorParser.Question_typeContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#question_type}.
	 * @param ctx the parse tree
	 */
	void exitQuestion_type(FormGeneratorParser.Question_typeContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#select_question_type}.
	 * @param ctx the parse tree
	 */
	void enterSelect_question_type(FormGeneratorParser.Select_question_typeContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#select_question_type}.
	 * @param ctx the parse tree
	 */
	void exitSelect_question_type(FormGeneratorParser.Select_question_typeContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#functions}.
	 * @param ctx the parse tree
	 */
	void enterFunctions(FormGeneratorParser.FunctionsContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#functions}.
	 * @param ctx the parse tree
	 */
	void exitFunctions(FormGeneratorParser.FunctionsContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#function_array}.
	 * @param ctx the parse tree
	 */
	void enterFunction_array(FormGeneratorParser.Function_arrayContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#function_array}.
	 * @param ctx the parse tree
	 */
	void exitFunction_array(FormGeneratorParser.Function_arrayContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#function}.
	 * @param ctx the parse tree
	 */
	void enterFunction(FormGeneratorParser.FunctionContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#function}.
	 * @param ctx the parse tree
	 */
	void exitFunction(FormGeneratorParser.FunctionContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#function_params}.
	 * @param ctx the parse tree
	 */
	void enterFunction_params(FormGeneratorParser.Function_paramsContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#function_params}.
	 * @param ctx the parse tree
	 */
	void exitFunction_params(FormGeneratorParser.Function_paramsContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#parameter}.
	 * @param ctx the parse tree
	 */
	void enterParameter(FormGeneratorParser.ParameterContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#parameter}.
	 * @param ctx the parse tree
	 */
	void exitParameter(FormGeneratorParser.ParameterContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#function_body}.
	 * @param ctx the parse tree
	 */
	void enterFunction_body(FormGeneratorParser.Function_bodyContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#function_body}.
	 * @param ctx the parse tree
	 */
	void exitFunction_body(FormGeneratorParser.Function_bodyContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterStatement(FormGeneratorParser.StatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitStatement(FormGeneratorParser.StatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#function_call}.
	 * @param ctx the parse tree
	 */
	void enterFunction_call(FormGeneratorParser.Function_callContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#function_call}.
	 * @param ctx the parse tree
	 */
	void exitFunction_call(FormGeneratorParser.Function_callContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#conditional}.
	 * @param ctx the parse tree
	 */
	void enterConditional(FormGeneratorParser.ConditionalContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#conditional}.
	 * @param ctx the parse tree
	 */
	void exitConditional(FormGeneratorParser.ConditionalContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#condition}.
	 * @param ctx the parse tree
	 */
	void enterCondition(FormGeneratorParser.ConditionContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#condition}.
	 * @param ctx the parse tree
	 */
	void exitCondition(FormGeneratorParser.ConditionContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#cond_body}.
	 * @param ctx the parse tree
	 */
	void enterCond_body(FormGeneratorParser.Cond_bodyContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#cond_body}.
	 * @param ctx the parse tree
	 */
	void exitCond_body(FormGeneratorParser.Cond_bodyContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterExpression(FormGeneratorParser.ExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitExpression(FormGeneratorParser.ExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#math_expression}.
	 * @param ctx the parse tree
	 */
	void enterMath_expression(FormGeneratorParser.Math_expressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#math_expression}.
	 * @param ctx the parse tree
	 */
	void exitMath_expression(FormGeneratorParser.Math_expressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#string_expression}.
	 * @param ctx the parse tree
	 */
	void enterString_expression(FormGeneratorParser.String_expressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#string_expression}.
	 * @param ctx the parse tree
	 */
	void exitString_expression(FormGeneratorParser.String_expressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#boolean_expression}.
	 * @param ctx the parse tree
	 */
	void enterBoolean_expression(FormGeneratorParser.Boolean_expressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#boolean_expression}.
	 * @param ctx the parse tree
	 */
	void exitBoolean_expression(FormGeneratorParser.Boolean_expressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#static_function}.
	 * @param ctx the parse tree
	 */
	void enterStatic_function(FormGeneratorParser.Static_functionContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#static_function}.
	 * @param ctx the parse tree
	 */
	void exitStatic_function(FormGeneratorParser.Static_functionContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#form_state_access}.
	 * @param ctx the parse tree
	 */
	void enterForm_state_access(FormGeneratorParser.Form_state_accessContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#form_state_access}.
	 * @param ctx the parse tree
	 */
	void exitForm_state_access(FormGeneratorParser.Form_state_accessContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#path_to_key}.
	 * @param ctx the parse tree
	 */
	void enterPath_to_key(FormGeneratorParser.Path_to_keyContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#path_to_key}.
	 * @param ctx the parse tree
	 */
	void exitPath_to_key(FormGeneratorParser.Path_to_keyContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#boolean}.
	 * @param ctx the parse tree
	 */
	void enterBoolean(FormGeneratorParser.BooleanContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#boolean}.
	 * @param ctx the parse tree
	 */
	void exitBoolean(FormGeneratorParser.BooleanContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#math_op}.
	 * @param ctx the parse tree
	 */
	void enterMath_op(FormGeneratorParser.Math_opContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#math_op}.
	 * @param ctx the parse tree
	 */
	void exitMath_op(FormGeneratorParser.Math_opContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#string_equality_op}.
	 * @param ctx the parse tree
	 */
	void enterString_equality_op(FormGeneratorParser.String_equality_opContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#string_equality_op}.
	 * @param ctx the parse tree
	 */
	void exitString_equality_op(FormGeneratorParser.String_equality_opContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormGeneratorParser#num_equality_op}.
	 * @param ctx the parse tree
	 */
	void enterNum_equality_op(FormGeneratorParser.Num_equality_opContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormGeneratorParser#num_equality_op}.
	 * @param ctx the parse tree
	 */
	void exitNum_equality_op(FormGeneratorParser.Num_equality_opContext ctx);
}