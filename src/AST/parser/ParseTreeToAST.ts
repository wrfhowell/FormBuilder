import { AbstractParseTreeVisitor } from "antlr4ts/tree";
import {
	ArrayContext,
	Boolean_expressionContext,
	Cond_bodyContext,
	ConditionalContext,
	CorrectAnswer_fieldContext,
	DisplayIf_fieldContext,
	DisplayQuestions_fieldContext,
	ExpressionContext,
	Form_state_accessContext,
	FunctionContext,
	Function_arrayContext,
	Function_bodyContext,
	Function_callContext,
	Function_paramsContext,
	GoTo_fieldContext,
	Header_fieldContext,
	Instructions_fieldContext,
	Label_fieldContext,
	Math_expressionContext,
	Num_boolean_expressionContext,
	Options_fieldContext,
	PageContext,
	PagesContext,
	ParameterContext,
	ProgramContext,
	QuestionContext,
	Question_arrayContext,
	Scoped_expressionContext,
	StatementContext,
	Static_functionContext,
	String_boolean_expressionContext,
	String_expressionContext,
	Unscoped_expressionContext,
	Variables_objectContext,
} from "../../../generated/FormGeneratorParser";
import { FormGeneratorParserVisitor } from "../../../generated/FormGeneratorParserVisitor";
import { ArrayCustom } from "../Nodes/ArrayCustom";
import { ArrayValue } from "../Nodes/ArrayValue";
import { BooleanExpression } from "../Nodes/BooleanExpression";
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
import { Regex } from "../Nodes/Regex";
import { ScopedExpression } from "../Nodes/ScopedExpression";
import { StaticFunction } from "../Nodes/StaticFunction";
import { StringExpression } from "../Nodes/StringExpression";
import { UnscopedExpression } from "../Nodes/UnscopedExpression";
import { Variable } from "../Nodes/Variable";
import { VariableName } from "../Nodes/VariableName";
import { VariablesArray } from "../Nodes/VariablesArray";
import { Page, Pages, Program, Question } from "../export";

export class ParseTreeToAST
	extends AbstractParseTreeVisitor<any>
	implements FormGeneratorParserVisitor<any>
{
	//TODO: Complete expressions classes! Adjust all field classes.

	visitProgram(ctx: ProgramContext): Program {
		const pages = <Pages>ctx.pages().accept(this);
		const functionsObject = <Functions_Array>(
			ctx.functions()?.function_array().accept(this)
		);
		const variablesObject = <VariablesArray>(
			ctx.variables()?.variables_object().accept(this)
		);
		if (functionsObject && variablesObject) {
			return new Program(pages, functionsObject, variablesObject);
		} else if (variablesObject) {
			return new Program(pages, undefined, variablesObject);
		} else if (functionsObject) {
			return new Program(pages, functionsObject, undefined);
		} else {
			return new Program(pages, undefined, undefined);
		}
	}

	visitPages(ctx: PagesContext): Pages {
		let pagesList: Page[] = [];
		for (const p of ctx.page_array().page()) {
			pagesList.push(<Page>p.accept(this));
		}
		return new Pages(pagesList);
	}

	visitFunction_array(ctx: Function_arrayContext): Functions_Array {
		let functionList: FunctionCustom[] = [];
		for (const f of ctx.function()) {
			functionList.push(<FunctionCustom>f.accept(this));
		}
		return new Functions_Array(functionList);
	}

	visitVariables_object(ctx: Variables_objectContext): VariablesArray {
		let variableList: Variable[] = [];
		for (let v of ctx.variable()) {
			const varName = v.VARIABLE_NAME().text;
			const varValue = v.variable_value();
			const regexValCheck = varValue.REGEX()?.text;
			const varFormStateAccess = varValue.form_state_access()?.accept(this);
			const varStaticFunc = varValue.static_function()?.accept(this);
			const varExpression = varValue.expression()?.accept(this);
			const varFuncCall = varValue.function_call()?.accept(this);
			if (varValue.NUM()?.text) {
				variableList.push(new Variable(varName, Number(varValue.NUM()?.text)));
			} else if (varValue.STRING()?.text) {
				variableList.push(new Variable(varName, varValue.STRING()?.text));
			} else if (regexValCheck) {
				variableList.push(new Variable(varName, new Regex(regexValCheck)));
			} else if (varValue.array()) {
				variableList.push(
					new Variable(varName, <ArrayCustom>varValue.array()?.accept(this))
				);
			} else if (varFormStateAccess) {
				variableList.push(new Variable(varName, varFormStateAccess));
			} else if (varStaticFunc) {
				variableList.push(new Variable(varName, varStaticFunc));
			} else if (varExpression) {
				variableList.push(new Variable(varName, varExpression));
			} else if (varFuncCall) {
				variableList.push(new Variable(varName, varFuncCall));
			} else {
				variableList.push(new Variable(varName, undefined));
			}
		}
		return new VariablesArray(variableList);
	}

	//TODO: Evaluator does what it wants to with undefined variables
	visitPage(ctx: PageContext): Page {
		ctx.page_fields().page_field();
		let id = undefined;
		let header = undefined;
		let instructions = undefined;
		let goTo = undefined;
		let questions = undefined;
		let displayQuestions = undefined;

		for (let pageFields of ctx.page_fields().page_field()) {
			if (pageFields.id_field()) {
				let id =
					pageFields.id_field()?.STRING()?.text ||
					pageFields.id_field()?.expression()?.accept(this);
			} else if (pageFields.header_field()) {
				let header = <
					string | Expression | VariableName | Function_Call | undefined
				>pageFields.header_field()?.accept(this);
			} else if (pageFields.instructions_field()) {
				let instructions = <
					string | Expression | VariableName | Function_Call | undefined
				>pageFields.instructions_field()?.accept(this);
			} else if (pageFields.goTo_field()) {
				let goTo = pageFields.goTo_field()?.accept(this);
			} else if (pageFields.displayQuestions_field()) {
				let displayQuestions = pageFields
					.displayQuestions_field()
					?.accept(this);
			} else if (pageFields.questions_field()) {
				questions = <Question_Array>(
					pageFields.questions_field()?.question_array().accept(this)
				);
			}
		}
		return new Page(
			id,
			goTo,
			header,
			instructions,
			displayQuestions,
			questions
		);
	}

	visitFunction(ctx: FunctionContext): FunctionCustom {
		const parameters: (
			| string
			| number
			| Expression
			| VariableName
			| StaticFunction
			| Function_Call
			| FormStateAccess
			| undefined
		)[] = ctx.function_params().accept(this);
		return new FunctionCustom(parameters, ctx.function_body().accept(this));
	}

  visitFunction(ctx: FunctionContext): FunctionCustom {
    const variableName = new VariableName(ctx.VARIABLE_NAME().text);
    const parameters: (string | number | Expression | VariableName | StaticFunction |
        Function_Call | FormStateAccess | undefined)[] = ctx.function_params().accept(this);
    return new FunctionCustom(variableName, parameters, ctx.function_body().accept(this));
  }

	visitParameter(
		ctx: ParameterContext
	):
		| string
		| number
		| Expression
		| VariableName
		| StaticFunction
		| Function_Call
		| FormStateAccess
		| undefined {
		const funcString = ctx.STRING()?.text;
		const funcNum = ctx.NUM()?.text;
		const funcExpression = <Expression>ctx.expression()?.accept(this);
		const funcVarName = ctx.VARIABLE_NAME()?.text;
		const staticFunction = <StaticFunction>ctx.static_function()?.accept(this);
		const functionCall = <Function_Call>ctx.function_call()?.accept(this);
		const formStateAccess = <FormStateAccess>(
			ctx.form_state_access()?.accept(this)
		);
		if (funcString) {
			return funcString;
		} else if (funcNum) {
			return Number(funcNum);
		} else if (funcExpression) {
			return funcExpression;
		} else if (funcVarName) {
			return new VariableName(funcVarName);
		} else if (staticFunction) {
			return staticFunction;
		} else if (functionCall) {
			return functionCall;
		} else if (formStateAccess) {
			return formStateAccess;
		} else {
			return undefined;
		}
	}

	visitStatic_function(ctx: Static_functionContext): StaticFunction {
		return new StaticFunction(
			ctx.STATIC_FORM_NAME().text,
			ctx.function_params().accept(this)
		);
	}

	visitForm_state_access(ctx: Form_state_accessContext): FormStateAccess {
		return new FormStateAccess(
			ctx.path_to_key().path_to_page_key().STRING().text,
			ctx.path_to_key().path_to_question_key().STRING().text
		);
	}

	visitFunction_body(ctx: Function_bodyContext): Function_Body {
		const statements: (
			| Conditional
			| Expression
			| StaticFunction
			| undefined
		)[] = [];
		for (const s of ctx.statement()) {
			statements.push(s.accept(this));
		}
		const returnValFunc = ctx.returnValueFunction();
		let returnValVarNameString = returnValFunc.VARIABLE_NAME()?.text;
		let returnValVarName;
		const returnValString = returnValFunc.STRING()?.text;
		const returnValNumString = returnValFunc.NUM()?.text;
		let returnValNum;
		const returnValExpression = <Expression>(
			returnValFunc.expression()?.accept(this)
		);
		const returnValStaticFunc = <StaticFunction>(
			returnValFunc.static_function()?.accept(this)
		);
		const returnValFuncCall = <Function_Call>(
			returnValFunc.function_call()?.accept(this)
		);
		const returnValFormStateAccess = <FormStateAccess>(
			returnValFunc.form_state_access()?.accept(this)
		);
		const returnValArray = <ArrayCustom>returnValFunc.array()?.accept(this);
		if (returnValVarNameString) {
			returnValVarName = new VariableName(returnValVarNameString);
		} else if (returnValNumString) {
			returnValNum = Number(returnValNumString);
		}
		const returnValue =
			returnValVarName ||
			returnValString ||
			returnValNum ||
			returnValExpression ||
			returnValStaticFunc ||
			returnValFuncCall ||
			returnValFormStateAccess ||
			returnValArray;
		if (returnValue) {
			return new Function_Body(statements, returnValue);
		} else {
			return new Function_Body(statements, undefined);
		}
	}

	visitStatement(
		ctx: StatementContext
	): Conditional | Expression | StaticFunction | undefined {
		const statementConditional = <Conditional>ctx.conditional()?.accept(this);
		const statementExpression = <Expression>ctx.expression()?.accept(this);
		const statementStaticFunction = <StaticFunction>(
			ctx.static_function()?.accept(this)
		);

		if (statementConditional) {
			return statementConditional;
		} else if (statementExpression) {
			return statementExpression;
		} else if (statementStaticFunction) {
			return statementStaticFunction;
		} else {
			return undefined;
		}
	}

	visitFunction_call(ctx: Function_callContext): Function_Call {
		return new Function_Call(
			new VariableName(ctx.VARIABLE_NAME().text),
			ctx.function_params().accept(this)
		);
	}

	visitConditional(ctx: ConditionalContext): Conditional {
		let ifCond = new If_Cond(
			<Expression>ctx.if_cond()?.condition().expression().accept(this),
			ctx.if_cond()?.cond_body().accept(this)
		);
		let elseIfList: Else_If_Cond[] = [];
		for (const e of ctx.else_if_cond()) {
			elseIfList.push(
				new Else_If_Cond(
					e.condition().expression().accept(this),
					e.function_body().accept(this)
				)
			);
		}
		let elseCond = ctx.else_cond()?.cond_body().accept(this);
		return new Conditional(ifCond, elseIfList, elseCond);
	}

	visitCond_body(ctx: Cond_bodyContext): Cond_Body {
		const statements: (
			| Conditional
			| Expression
			| StaticFunction
			| undefined
		)[] = [];
		for (const s of ctx.statement()) {
			statements.push(s.accept(this));
		}
		const returnValIf = ctx.returnValueIf();
		if (returnValIf) {
			let returnValVarNameString = returnValIf.VARIABLE_NAME()?.text;
			let returnValVarName;
			let returnValNum;
			const returnValString = returnValIf.STRING()?.text;
			const returnValNumString = returnValIf.NUM()?.text;
			const returnValExpression = <Expression>(
				returnValIf.expression()?.accept(this)
			);
			if (returnValVarNameString) {
				returnValVarName = new VariableName(returnValVarNameString);
			} else if (returnValNumString) {
				returnValNum = Number(returnValNumString);
			}
			const returnValue =
				returnValVarName ||
				returnValString ||
				returnValNum ||
				returnValExpression;
			if (returnValue) {
				return new Cond_Body(statements, returnValue);
			}
		}
		return new Cond_Body(statements, undefined);
	}

	visitHeader_field(
		ctx: Header_fieldContext
	): string | Expression | VariableName | Function_Call | undefined {
		const headerString = ctx.STRING()?.text;
		const headerExpression = <Expression>ctx.expression()?.accept(this);
		const headerFuncCall = ctx.function_call()?.accept(this);
		const headerVarName = ctx.VARIABLE_NAME()?.text;
		if (headerString) {
			return headerString;
		} else if (headerExpression) {
			return headerExpression;
		} else if (headerFuncCall) {
			return headerFuncCall;
		} else if (headerVarName) {
			return new VariableName(headerVarName);
		} else {
			return undefined;
		}
	}

	//TODO: Add function call
	visitInstructions_field(
		ctx: Instructions_fieldContext
	): string | Expression | VariableName | Function_Call | undefined {
		const instructionString = ctx.STRING()?.text;
		const instructionExpression = <Expression>ctx.expression()?.accept(this);
		const instructionsFuncCall = ctx.function_call()?.accept(this);
		const instructionVarName = ctx.VARIABLE_NAME()?.text;
		if (instructionString) {
			return instructionString;
		} else if (instructionExpression) {
			return instructionExpression;
		} else if (instructionsFuncCall) {
			return instructionsFuncCall;
		} else if (instructionVarName) {
			return new VariableName(instructionVarName);
		} else {
			return undefined;
		}
	}

	visitDisplayQuestions_field(
		ctx: DisplayQuestions_fieldContext
	): string | number | undefined {
		let displayAll = ctx.DISPLAY_ALL()?.text;
		let displayNum = ctx.NUM()?.text;
		if (displayAll) {
			return displayAll;
		} else if (displayNum) {
			return Number(displayNum);
		} else {
			return undefined;
		}
	}

	visitQuestion_array(ctx: Question_arrayContext): Question_Array {
		const questionList: Question[] = [];
		for (const q of ctx.question()) {
			questionList.push(<Question>q.accept(this));
		}
		return new Question_Array(questionList);
	}

	//TODO: Adjust question fields
	//TODO: Adjust field once Boolean problem is fixed
	visitQuestion(ctx: QuestionContext): Question {
		let id = undefined;
		let type = undefined;
		let label = undefined;
		let options = undefined;
		let dependsOn = undefined;
		let displayIf = undefined;
		let loop = undefined;
		let isRequired = undefined;
		let correctAnswer = undefined;
		let varsObject = undefined;
		for (let questionFields of ctx.question_fields().question_field()) {
			if (questionFields.id_field()) {
				let id =
					questionFields.id_field()?.STRING()?.text ||
					questionFields.id_field()?.expression()?.accept(this);
			} else if (questionFields.type_field()) {
				let type = questionFields.type_field()?.text;
			} else if (questionFields.label_field()) {
				let label = <
					string | Expression | VariableName | Function_Call | undefined
				>questionFields.label_field()?.accept(this);
			} else if (questionFields.options_field()) {
				options = questionFields.options_field()?.accept(this);
			} else if (questionFields.dependsOn_field()) {
				dependsOn = questionFields.dependsOn_field()?.text;
			} else if (questionFields.displayIf_field()) {
				displayIf = <string | Regex | Expression | undefined>(
					questionFields.displayIf_field()?.accept(this)
				);
			} else if (questionFields.loop_field()) {
				loop = Number(questionFields.loop_field()?.NUM().text);
			} else if (questionFields.isRequired_field()) {
				isRequired =
					questionFields.isRequired_field()?.boolean().text == "true";
			} else if (questionFields.correctAnswer_field()) {
				correctAnswer = <
					string | number | Regex | Expression | Function_Call | undefined
				>questionFields.correctAnswer_field()?.accept(this);
			} else if (questionFields.variables()?.variables_object()) {
				varsObject = <VariablesArray>(
					questionFields.variables()?.variables_object().accept(this)
				);
			}
		}

		return new Question(
			id,
			type,
			label,
			options,
			dependsOn,
			displayIf,
			loop,
			isRequired,
			correctAnswer,
			varsObject
		);
	}

	visitLabel_field(
		ctx: Label_fieldContext
	): string | Expression | VariableName | Function_Call | undefined {
		const labelString = ctx.STRING()?.text;
		const labelExpression = <Expression>ctx.expression()?.accept(this);
		const labelFuncCall = ctx.function_call()?.accept(this);
		const labelVarName = ctx.VARIABLE_NAME()?.text;
		if (labelString) {
			return labelString;
		} else if (labelExpression) {
			return labelExpression;
		} else if (labelFuncCall) {
			return labelFuncCall;
		} else if (labelVarName) {
			return new VariableName(labelVarName);
		} else {
			return undefined;
		}
	}

	visitOptions_field(
		ctx: Options_fieldContext
	): VariableName | Function_Call | ArrayCustom | undefined {
		const optionsArray = ctx.array()?.accept(this);
		const optionsFuncCall = ctx.function_call()?.accept(this);
		const optionsVarName = ctx.VARIABLE_NAME()?.text;
		if (optionsArray) {
			return optionsArray;
		} else if (optionsFuncCall) {
			return optionsFuncCall;
		} else if (optionsVarName) {
			return new VariableName(optionsVarName);
		} else {
			return undefined;
		}
	}

	visitArray(ctx: ArrayContext): ArrayValue[] {
		const arrayList: ArrayValue[] = [];
		for (const a of ctx.array_value()) {
			const currNumValue = a.NUM()?.text;
			const currStringValue = a.STRING()?.text;
			const currVarNameVal = a.VARIABLE_NAME()?.text;

			if (currNumValue) {
				arrayList.push(new ArrayValue(Number(currNumValue)));
			} else if (currStringValue) {
				arrayList.push(new ArrayValue(currStringValue));
			} else if (currVarNameVal) {
				arrayList.push(new ArrayValue(currVarNameVal));
			} else {
				arrayList.push(new ArrayValue(undefined));
			}
		}
		return arrayList;
	}

	visitDisplayIf_field(
		ctx: DisplayIf_fieldContext
	): string | Regex | Expression | Function_Call | undefined {
		const displayIfString = ctx.STRING()?.text;
		const displayIfRegex = ctx.REGEX()?.text;
		const displayIfExpression = <Expression>ctx.expression()?.accept(this);
		const displayIfFuncCall = ctx.function_call()?.accept(this);
		if (displayIfString) {
			return displayIfString;
		} else if (displayIfRegex) {
			return new Regex(displayIfRegex);
		} else if (displayIfExpression) {
			return displayIfExpression;
		} else if (displayIfFuncCall) {
			return displayIfFuncCall;
		} else {
			return undefined;
		}
	}

	//TODO: Add function_call
	visitCorrectAnswer_field(
		ctx: CorrectAnswer_fieldContext
	): string | number | Regex | Expression | Function_Call | undefined {
		const correctAnswerString = ctx.STRING()?.text;
		const correctAnswerNumber = ctx.NUM()?.text;
		const correctAnswerRegex = ctx.REGEX()?.text;
		const correctAnswerExpression = <Expression>ctx.expression()?.accept(this);
		const correctAnswerFuncCall = ctx.function_call()?.accept(this);
		if (correctAnswerString) {
			return correctAnswerString;
		} else if (correctAnswerNumber) {
			return Number(correctAnswerNumber);
		} else if (correctAnswerRegex) {
			return correctAnswerRegex;
		} else if (correctAnswerExpression) {
			return correctAnswerExpression;
		} else if (correctAnswerFuncCall) {
			return correctAnswerFuncCall;
		} else {
			return undefined;
		}
	}

	//TODO: Leaving variable names up to Evaluator!
	visitExpression(ctx: ExpressionContext): Expression {
		const expressionValue =
			Number(ctx.NUM()?.text) ||
			ctx.STRING()?.text ||
			ctx.unscoped_expression()?.accept(this) ||
			ctx.scoped_expression()?.accept(this);
		return new Expression(expressionValue);
	}

	visitScoped_expression(ctx: Scoped_expressionContext): ScopedExpression {
		let firstScopedExpression: ScopedExpression =
			ctx.first_scoped_expression()?.scoped_expression()?.accept(this) ||
			ctx.first_scoped_expression()?.unscoped_expression()?.accept(this);
		let scopedExpressionDictionary: { [operator: string]: Expression } = {};
		for (let s of ctx.extended_scoped_expression()) {
			let operator: string =
				s.scoped_operator()?.math_op()?.text ||
				s.scoped_operator()?.num_equality_op()?.text ||
				"";
			scopedExpressionDictionary[operator] = s.expression()?.accept(this);
		}
		return new ScopedExpression(
			firstScopedExpression,
			scopedExpressionDictionary
		);
	}

	//TODO: Assumes evaluator will handled undefined case
	visitUnscoped_expression(
		ctx: Unscoped_expressionContext
	): UnscopedExpression {
		const mathExpressionStr = ctx.math_expression()?.accept(this);
		const stringExpressionStr = ctx.string_expression()?.accept(this);
		const booleanExpressionStr = ctx.boolean_expression()?.accept(this);

		if (mathExpressionStr) {
			return new UnscopedExpression(
				new MathExpression(mathExpressionStr),
				mathExpressionStr
			);
		} else if (stringExpressionStr) {
			return new UnscopedExpression(
				new StringExpression(stringExpressionStr),
				stringExpressionStr
			);
		} else {
			return new UnscopedExpression(
				new BooleanExpression(booleanExpressionStr),
				booleanExpressionStr
			);
		}
	}

	visitString_expression(ctx: String_expressionContext): string {
		const finalExpression = ctx.string_expression_with_num();
		const extendedExpression = ctx.string_expression_extended();
		if (finalExpression) {
			const strExpressionVal1 =
				finalExpression.string_expression_val1().STRING()?.text ||
				finalExpression.string_expression_val1().VARIABLE_NAME()?.text;
			const strValue = strExpressionVal1 + finalExpression.PLUS().text;
			if (finalExpression.string_expression_val2()) {
				const strExpressionVal2 =
					finalExpression.string_expression_val2()?.STRING()?.text ||
					finalExpression.string_expression_val2()?.VARIABLE_NAME()?.text;
				return strValue + strExpressionVal2;
			} else if (finalExpression.string_expression_num()) {
				return strValue + finalExpression.string_expression_num()?.NUM().text;
			}
		} else if (extendedExpression) {
			const strVal1 =
				extendedExpression.string_expression_val1()?.STRING()?.text ||
				extendedExpression.string_expression_val1()?.VARIABLE_NAME()?.text;

			return (
				"" +
				strVal1 +
				extendedExpression.PLUS()?.text +
				extendedExpression.string_expression()?.accept(this)
			);
		}
		return "";
	}

	visitMath_expression(ctx: Math_expressionContext): string {
		const finalExpression = ctx.math_expression_with_op();
		const extendedExpression = ctx.math_expression_extended();
		if (finalExpression) {
			const mathVal1 =
				finalExpression.math_expression_val1()?.NUM()?.text ||
				finalExpression.math_expression_val1()?.VARIABLE_NAME()?.text;
			const mathVal2 =
				finalExpression.math_expression_val2()?.NUM()?.text ||
				finalExpression.math_expression_val2()?.VARIABLE_NAME()?.text;
			return "" + mathVal1 + finalExpression.math_op()?.text + mathVal2;
		} else if (extendedExpression) {
			const mathVal1 =
				extendedExpression.math_expression_val1()?.NUM()?.text ||
				extendedExpression.math_expression_val1()?.VARIABLE_NAME()?.text;
			return (
				"" +
				mathVal1 +
				extendedExpression.math_op()?.text +
				extendedExpression.math_expression()?.accept(this)
			);
		}
		return "";
	}

	//TODO: Evaluator must evaluate where variable name is!
	visitBoolean_expression(ctx: Boolean_expressionContext): string | undefined {
		const stringBooleanExpression = ctx
			.string_boolean_expression()
			?.accept(this);
		const numBooleanExpression = ctx.num_boolean_expression()?.accept(this);

		if (stringBooleanExpression) return <string>stringBooleanExpression;
		else if (numBooleanExpression) return <string>numBooleanExpression;
	}

	visitString_boolean_expression(
		ctx: String_boolean_expressionContext
	): string {
		let strVal1 =
			ctx.string_expression_val1().STRING()?.text ||
			ctx.string_expression_val1().VARIABLE_NAME()?.text;
		let finalStr = strVal1 + ctx.string_equality_op().text;
		let strVal2 =
			ctx.string_expression_val2()?.STRING()?.text ||
			ctx.string_expression_val2()?.VARIABLE_NAME()?.text ||
			ctx.string_boolean_expression_extended()?.string_equality_op().text +
				ctx
					.string_boolean_expression_extended()
					?.string_boolean_expression()
					.accept(this);
		return finalStr + strVal2;
	}

	visitNum_boolean_expression(ctx: Num_boolean_expressionContext): string {
		let strVal1 =
			ctx.math_expression_val1().NUM()?.text ||
			ctx.math_expression_val1().VARIABLE_NAME()?.text;
		let finalStr = strVal1 + ctx.num_equality_op().text;
		let strVal2 =
			ctx.math_expression_val2()?.NUM()?.text ||
			ctx.math_expression_val2()?.VARIABLE_NAME()?.text ||
			ctx.num_boolean_expression_extended()?.num_equality_op().text +
				ctx
					.num_boolean_expression_extended()
					?.num_boolean_expression()
					.accept(this);
		return finalStr + strVal2;
	}

	visitGoTo_field(
		ctx: GoTo_fieldContext
	): string | Expression | Function_Call | undefined {
		const goToString = ctx.STRING()?.text;
		const goToExpression = <Expression>ctx.expression()?.accept(this);
		const goToFuncCall = ctx.function_call()?.accept(this);
		if (goToString) {
			return goToString;
		} else if (goToExpression) {
			return goToExpression;
		} else if (goToFuncCall) {
			return goToFuncCall;
		} else {
			return undefined;
		}
	}

	//Abstract Tree method
	protected defaultResult(): any {}
}
