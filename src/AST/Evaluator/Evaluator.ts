import {
	Expression,
	MathExpression,
	ArrayValue,
	ArrayCustom,
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
		this.visitPage = this.visitPage.bind(this);
		this.visitPages = this.visitPages.bind(this);
		this.visitProgram = this.visitProgram.bind(this);
		this.visitQuestion = this.visitQuestion.bind(this);
		this.visitQuestions = this.visitQuestions.bind(this);
		this.visitOption = this.visitOption.bind(this);
		this.visitOptions = this.visitOptions.bind(this);
		this.visitExpression = this.visitExpression.bind(this);
		this.visitMathExpression = this.visitMathExpression.bind(this);
		this.visitStringExpression = this.visitStringExpression.bind(this);
		this.visitGoToObject = this.visitGoToObject.bind(this);
		this.visitVariable = this.visitVariable.bind(this);
		this.visitVariableName = this.visitVariableName.bind(this);
		this.visitVariablesArray = this.visitVariablesArray.bind(this);
		this.visitRegex = this.visitRegex.bind(this);

		this.jumpTable = {
			Page: this.visitPage,
			Pages: this.visitPages,
			Program: this.visitProgram,
			Question: this.visitQuestion,
			Question_Array: this.visitQuestions,
			Option: this.visitOption,
			Options: this.visitOptions,
			Expression: this.visitExpression,
			MathExpression: this.visitMathExpression,
			StringExpression: this.visitStringExpression,
			GoTo_Object: this.visitGoToObject,
			Variable: this.visitVariable,
			VariableName: this.visitVariableName,
			VariablesArray: this.visitVariablesArray,
			Regex: this.visitRegex,
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
		let header = page.getHeader();
		let instructions = page.getInstructions();
		if (hasAcceptMethod(header)) {
			header = header.accept(context, this);
		}
		if (hasAcceptMethod(instructions)) {
			instructions = instructions.accept(context, this);
		}

		return {
			id: page.getId(),
			goTo: page.getGoToObject().accept(context, this),
			header: header,
			instructions: instructions,
			questions: page.getQuestionArray().accept(context, this),
			variables: page.getPageVariables()?.accept(context, this),
		};
	}

	visitPages(context: {}, pages: Pages) {
		return pages.getPageArray().map((page) => page.accept(context, this));
	}

	visitProgram(context: {}, program: Program) {
		return {
			pages: program.getPages().accept(context, this),
			globalVariables: program.getGlobalVariables()?.accept(context, this),
		};
	}

	visitQuestion(context: {}, question: Question) {
		let label = question.getLabel();
		let displayIf = question.getDisplayIf();
		let correctAnswer = question.getCorrectAnswer();

		if (hasAcceptMethod(label)) {
			label = label.accept(context, this);
		}
		if (hasAcceptMethod(displayIf)) {
			displayIf = displayIf.accept(context, this);
		}
		if (hasAcceptMethod(correctAnswer)) {
			correctAnswer = correctAnswer.accept(context, this);
		}

		// Simplified example
		return {
			id: question.getId(),
			type: question.getQuestionType(),
			label: label,
			options: question.getOptions().accept(context, this),
			displayIf: displayIf,
			loop: question.getLoop(),
			isRequired: question.isQuestionRequired(),
			correctAnswer: correctAnswer,
			variables: question.getQuestionVariables()?.accept(context, this),
		};
	}

	visitQuestions(context: {}, questionsArray: Question_Array) {
		return questionsArray
			.getQuestionList()
			.map((question) => question.accept(context, this));
	}

	// Example for visitOption
	visitOption(context: {}, option: ArrayValue) {
		return option.getOption();
	}

	visitOptions(context: {}, options: ArrayCustom) {
		return options.getOptions().map((option) => option.accept(context, this));
	}

	visitExpression(context: {}, expression: Expression) {
		return expression.getExpression.accept(context, this);
	}

	visitMathExpression(context: {}, mathExpression: MathExpression) {
		return mathExpression.getMathExpression();
	}

	visitStringExpression(context: {}, stringExpression: StringExpression) {
		return stringExpression.getStringExpression();
	}

	visitGoToObject(context: {}, goToObject: GoTo_Object) {
		return {
			ifStatementValue: goToObject.getIfStatementValue(),
			goOptions: goToObject.getGoOptions(),
		};
	}

	visitVariable(context: {}, variable: Variable) {
		return {
			name: variable.getVariableName(),
			value: variable.getVariableValue(),
		};
	}

	visitVariableName(context: {}, variableName: VariableName) {
		return variableName.getName();
	}

	visitVariablesArray(context: {}, variablesArray: VariablesArray) {
		return variablesArray
			.getVariableList()
			.map((variable) => variable.accept(context, this));
	}

	visitRegex(context: {}, regex: any) {
		return regex.getRegex();
	}
}

function hasAcceptMethod(obj: any): obj is Expression | VariableName {
	return obj && typeof obj.accept === "function";
}
