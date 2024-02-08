import {
	Expression,
	GoTo_Object,
	MathExpression,
	Option,
	Options,
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

class Evaluator implements Visitor<{}, any> {
	jumpTable: any;

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

		const jumpTable = {
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
		// Example implementation
		return {
			id: page.getId(),
			goTo: page.getGoToObject().accept(context, this),
			header: page.getHeader()?.accept(context, this),
			instructions: page.getInstructions()?.accept(context, this),
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
		// Simplified example
		return {
			id: question.getId(),
			type: question.getQuestionType(),
			label: question.getLabel()?.accept(context, this),
			options: question.getOptions().accept(context, this),
			displayIf: question.getDisplayIf()?.accept(context, this),
			loop: question.getLoop(),
			isRequired: question.isQuestionRequired(),
			correctAnswer: question.getCorrectAnswer()?.accept(context, this),
			variables: question.getQuestionVariables()?.accept(context, this),
		};
	}

	visitQuestions(context: {}, questionsArray: Question_Array) {
		return questionsArray
			.getQuestionList()
			.map((question) => question.accept(context, this));
	}

	// Example for visitOption
	visitOption(context: {}, option: Option) {
		return option.getOption();
	}

	visitOptions(context: {}, options: Options) {
		return options.getOptions().map((option) => option.accept(context, this));
	}

	visitExpression(context: {}, expression: Expression) {
		return expression.getExpression().accept(context, this);
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
