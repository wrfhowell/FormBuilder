import { BooleanExpression } from "../Nodes/BooleanExpression";
import { Cond_Body } from "../Nodes/Cond_Body";
import { Conditional } from "../Nodes/Conditional";
import { Else_If_Cond } from "../Nodes/Else_If_Cond";
import { FormStateAccess } from "../Nodes/FormStateAccess";
import { FunctionCustom } from "../Nodes/FunctionCustom";
import { Function_Body } from "../Nodes/Function_Body";
import { Function_Call } from "../Nodes/Function_Call";
import { Functions_Array } from "../Nodes/Functions_Array";
import { If_Cond } from "../Nodes/If_Cond";
import { ScopedExpression } from "../Nodes/ScopedExpression";
import { StaticFunction } from "../Nodes/StaticFunction";
import { UnscopedExpression } from "../Nodes/UnscopedExpression";
import {
	ArrayCustom,
	ArrayValue,
	Expression,
	MathExpression,
	Page,
	Pages,
	Program,
	Question,
	Question_Array,
	StringExpression,
	Variable,
	VariableName,
	VariablesArray,
	Visitor,
} from "../export";

export class Evaluator implements Visitor<{}, any> {
	private jumpTable: any;

	constructor() {
		this.visitArrayCustom = this.visitArrayCustom.bind(this);
		this.visitArrayValue = this.visitArrayValue.bind(this);
		this.visitBooleanExpression = this.visitBooleanExpression.bind(this);
		this.visitCondBody = this.visitCondBody.bind(this);
		this.visitConditional = this.visitConditional.bind(this);
		this.visitElseIfCond = this.visitElseIfCond.bind(this);
		this.visitExpression = this.visitExpression.bind(this);
		this.visitFormStateAccess = this.visitFormStateAccess.bind(this);
		this.visitFunctionBody = this.visitFunctionBody.bind(this);
		this.visitFunctionCall = this.visitFunctionCall.bind(this);
		this.visitFunctionCustom = this.visitFunctionCustom.bind(this);
		this.visitFunctionsArray = this.visitFunctionsArray.bind(this);
		this.visitIfCond = this.visitIfCond.bind(this);
		this.visitMathExpression = this.visitMathExpression.bind(this);
		this.visitPage = this.visitPage.bind(this);
		this.visitPages = this.visitPages.bind(this);
		this.visitProgram = this.visitProgram.bind(this);
		this.visitQuestionArray = this.visitQuestionArray.bind(this);
		this.visitQuestion = this.visitQuestion.bind(this);
		this.visitRegex = this.visitRegex.bind(this);
		this.visitScopedExpression = this.visitScopedExpression.bind(this);
		this.visitStaticFunction = this.visitStaticFunction.bind(this);
		this.visitStringExpression = this.visitStringExpression.bind(this);
		this.visitUnscopedExpression = this.visitUnscopedExpression.bind(this);
		this.visitVariable = this.visitVariable.bind(this);
		this.visitVariableName = this.visitVariableName.bind(this);
		this.visitVariablesArray = this.visitVariablesArray.bind(this);

		this.jumpTable = {
			ArrayCustom: this.visitArrayCustom,
			ArrayValue: this.visitArrayValue,
			BooleanExpression: this.visitBooleanExpression,
			Cond_Body: this.visitCondBody,
			Conditional: this.visitConditional,
			Else_If_Cond: this.visitElseIfCond,
			Expression: this.visitExpression,
			FormStateAccess: this.visitFormStateAccess,
			Function_Body: this.visitFunctionBody,
			Function_Call: this.visitFunctionCall,
			FunctionCustom: this.visitFunctionCustom,
			Functions_Array: this.visitFunctionsArray,
			If_Cond: this.visitIfCond,
			MathExpression: this.visitMathExpression,
			Page: this.visitPage,
			Pages: this.visitPages,
			Program: this.visitProgram,
			Question_Array: this.visitQuestionArray,
			Question: this.visitQuestion,
			Regex: this.visitRegex,
			ScopedExpression: this.visitScopedExpression,
			StaticFunction: this.visitStaticFunction,
			StringExpression: this.visitStringExpression,
			UnscopedExpression: this.visitUnscopedExpression,
			Variable: this.visitVariable,
			VariableName: this.visitVariableName,
			VariablesArray: this.visitVariablesArray,
		};
	}

	visit(context: {}, node: any) {
		const nodeType = node.constructor.name;
		const visitMethod = this.jumpTable[nodeType];
		if (visitMethod) {
			return visitMethod(context, node);
		} else {
			console.error(`No visit method defined for node type: ${nodeType}`);
			return null;
		}
	}

	visitPage(context: {}, page: Page) {
		let goTo = page.getGoToObject();
		let header = page.getHeader();
		let instructions = page.getInstructions();
		let questions = page.getQuestionArray();

		if (hasAcceptMethod(goTo)) {
			goTo = goTo.accept(context, this);
		}
		if (hasAcceptMethod(header)) {
			header = header.accept(context, this);
		}
		if (hasAcceptMethod(instructions)) {
			instructions = instructions.accept(context, this);
		}
		if (hasAcceptMethod(questions)) {
			questions = questions.accept(context, this);
		}

		return {
			id: page.getId(),
			goTo: goTo,
			header: header,
			instructions: instructions,
			displayQuestions: page.shouldDisplayQuestions(),
			questions: questions,
		};
	}

	visitPages(context: {}, pages: Pages) {
		return pages.getPageArray().map((page) => page.accept(context, this));
	}

	visitProgram(context: {}, program: Program) {
		return {
			pages: program.getPages().accept(context, this),
			globalVariables: program.getGlobalVariables()?.accept(context, this),
			Functions_Array: program.getFunctionsArray()?.accept(context, this),
		};
	}

	visitQuestion(context: {}, question: Question) {
		let label = question.getLabel();
		let options = question.getOptions();
		let dependsOn = question.getDependsOn();
		let displayIf = question.getDisplayIf();
		let loop = question.getLoop();
		let isRequired = question.isQuestionRequired();
		let correctAnswer = question.getCorrectAnswer();
		let questionVariables = question.getQuestionVariables();

		if (hasAcceptMethod(label)) {
			label = label.accept(context, this);
		}
		if (hasAcceptMethod(options)) {
			options = options.accept(context, this);
		}
		if (hasAcceptMethod(dependsOn)) {
			dependsOn = dependsOn.accept(context, this);
		}
		if (hasAcceptMethod(displayIf)) {
			displayIf = displayIf.accept(context, this);
		}
		if (hasAcceptMethod(questionVariables)) {
			questionVariables = questionVariables.accept(context, this);
		}

		return {
			id: question.getId(),
			type: question.getQuestionType(),
			label: label,
			options: options,
			dependsOn: dependsOn,
			displayIf: displayIf,
			loop: loop,
			isRequired: isRequired,
			correctAnswer: correctAnswer,
			questionVariables: questionVariables,
		};
	}

	visitQuestionArray(context: {}, questionArray: Question_Array) {
		return questionArray
			.getQuestionList()
			.map((question) => question.accept(context, this));
	}

	visitQuestions(context: {}, questionsArray: Question_Array) {
		return questionsArray
			.getQuestionList()
			.map((question) => question.accept(context, this));
	}

	visitArrayValue(context: {}, arrayValue: ArrayValue) {
		return arrayValue.getValue();
	}

	visitArrayCustom(context: {}, arrayCustom: ArrayCustom) {
		return arrayCustom
			.getArrayCustom()
			.map((option) => option.accept(context, this));
	}

	visitExpression(context: {}, expression: Expression) {
		let expressionType = expression.getExpression();

		if (hasAcceptMethod(expressionType)) {
			console.log("LOOKATMEEEEEEEEE");
			expressionType = expressionType.accept(context, this);
		}
		return { expression: expressionType };
	}

	visitFormStateAccess(context: {}, formStateAccess: FormStateAccess) {
		return {
			pageId: formStateAccess.getPageId(),
			questionId: formStateAccess.getQuestionId(),
		};
	}

	visitFunctionBody(context: {}, functionBody: Function_Body) {
		let statements = functionBody.getStatements();
		let returnValueFunction = functionBody.getFunctionReturnValue();
		console.log("YOOOOOOO");
		statements = statements.map((statement) => {
			console.log("YOOOOOOO1");
			if (hasAcceptMethod(statement)) {
				console.log("YOOOOOOO2");
				return statement.accept(context, this);
			}
			return statement;
		});

		if (hasAcceptMethod(returnValueFunction)) {
			returnValueFunction = returnValueFunction.accept(context, this);
		}
		return {
			statements: statements,
			returnValueFunction: returnValueFunction,
		};
	}

	visitFunctionCall(context: {}, functionCall: Function_Call) {
		let variableName = functionCall.getVariableName().accept(context, this);
		let functionParameters = functionCall.getFunctionParams();
		if (hasAcceptMethod(functionParameters)) {
			functionParameters = functionParameters.map((param) => {
				if (hasAcceptMethod(param)) {
					return param.accept(context, this);
				}
				return param;
			});
		}
		return {
			variableName: variableName,
			functionParameters: functionParameters,
		};
	}

	visitFunctionCustom(context: {}, functionCustom: FunctionCustom) {
		let functionName = functionCustom.getFunctionName().accept(context, this);
		let functionParameters = functionCustom.getFunctionParams();
		let functionBody = functionCustom.getFunctionBody().accept(context, this);
		functionParameters = functionParameters.map((param) => {
			if (hasAcceptMethod(param)) {
				return param.accept(context, this);
			}
			return param;
		});
		return {
			functionName: functionName,
			functionParameters: functionParameters,
			functionBody: functionBody,
		};
	}

	visitFunctionsArray(context: {}, functionsArray: Functions_Array) {
		return functionsArray
			.getQuestionList()
			.map((functionCustom) => functionCustom.accept(context, this));
	}

	visitBooleanExpression(context: {}, booleanExpression: BooleanExpression) {
		return booleanExpression.getBooleanExpression();
	}

	visitMathExpression(context: {}, mathExpression: MathExpression) {
		return mathExpression.getMathExpression();
	}

	visitStringExpression(context: {}, stringExpression: StringExpression) {
		return stringExpression.getStringExpression();
	}

	visitCondBody(context: {}, condBody: Cond_Body) {
		let statements = condBody.getStatements();
		let returnValueIf = condBody.getReturnValue();
		if (hasAcceptMethod(statements)) {
			statements = statements.accept(context, this);
		}
		if (hasAcceptMethod(returnValueIf)) {
			returnValueIf = returnValueIf.accept(context, this);
		}
		return {
			statements: statements,
			returnValueIf: statements,
		};
	}

	visitIfCond(context: {}, ifCond: If_Cond) {
		return {
			condition: ifCond.getCondition().accept(context, this),
			functionBody: ifCond.getCondBody().accept(context, this),
		};
	}

	visitConditional(context: {}, conditional: Conditional) {
		let elseCond = conditional.getElseCond();

		if (hasAcceptMethod(elseCond)) {
			elseCond = elseCond.accept(context, this);
		}

		return {
			ifCond: conditional.getIfCond().accept(context, this),
			elseIfCond: conditional
				.getElseIfCond()
				.map((cond) => cond.accept(context, this)),
			elseCond: elseCond,
		};
	}

	visitElseIfCond(context: {}, elseIfCond: Else_If_Cond) {
		return {
			condition: elseIfCond.getCondition().accept(context, this),
			functionBody: elseIfCond.getCondBody().accept(context, this),
		};
	}

	visitVariable(context: {}, variable: Variable) {
		let variableName = variable.getVariableName();
		let variableValue = variable.getVariableValue();
		if (hasAcceptMethod(variableValue)) {
			variableValue = variableValue.accept(context, this);
		}
		return { [variableName]: { value: variableValue } };
	}

	visitVariableName(context: {}, variableName: VariableName) {
		return variableName.getName();
	}

	visitVariablesArray(context: {}, variablesArray: VariablesArray) {
		return variablesArray
			.getVariableList()
			.map((variable) => variable.accept(context, this));
	}

	visitScopedExpression(context: {}, scopedExpression: ScopedExpression) {
		const firstScopedExpressionResult = scopedExpression
			.getFirstScopedExpression()
			.accept(context, this);

		const extendedScopedExpressionResult = Object.entries(
			scopedExpression.getExtendedScopedExpression()
		).reduce((acc, [operator, expression]) => {
			acc[operator] = expression.accept(context, this);
			return acc;
		}, {} as { [operator: string]: any });

		return {
			firstScopedExpression: firstScopedExpressionResult,
			extendedScopedExpression: extendedScopedExpressionResult,
		};
	}

	visitStaticFunction(context: {}, staticFunction: StaticFunction) {
		let functionParams = staticFunction.getFunctionParams();

		functionParams = functionParams.map((param) => {
			if (hasAcceptMethod(param)) {
				return param.accept(context, this);
			}
			return param;
		});

		return {
			staticFormName: staticFunction.getStaticFormName(),
			functionParams: functionParams,
		};
	}

	visitRegex(context: {}, regex: any) {
		return regex.getRegex();
	}

	visitUnscopedExpression(context: {}, unscopedExpression: UnscopedExpression) {
		return {
			unscopedExpression: unscopedExpression
				.getExpression()
				.accept(context, this),
			unscopedExpressionString: unscopedExpression.getExpressionString(),
		};
	}
}

function hasAcceptMethod(obj: any): obj is Expression | VariableName {
	return obj && typeof obj.accept === "function";
}
