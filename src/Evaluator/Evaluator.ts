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
	visitOption(context: {}, option: Option) {
		return option.getOption();
	}

	visitOptions(context: {}, options: Options) {
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

// import {
//   Visitor,
//   Page,
//   Pages,
//   Header_Field,
//   Instructions_Field,
//   Program,
//   Id_Field,
//   PagesObj,
//   PageObj,
//   Question,
//   QuestionObj, Node,
// } from "../export";

// type ASTNode = Page | Pages | Header_Field | Instructions_Field | Program;

// export class Evaluator implements Visitor<string, void> {
//   pages: PagesObj | undefined;
//   latestPage: PageObj | undefined;
//   latestQuestion: QuestionObj | undefined;

//   constructor() {}

//   jumpTable: any = {
//     Page: this.visitPage,
//     Pages: this.visitPages,
//     Header: this.visitHeader,
//     Instructions: this.visitInstructions,
//     Program: this.visitProgram,
//     PageId: this.visitPageId,
//     Questions: this.visitQuestions,
//     Question: this.visitQuestion,
//   };

//   //TODO: May have to reimplement this
//   visit(context: string, node: Node) {
//     let nodeType: string = node.constructor.name;
//     this.jumpTable[nodeType](this, context, node);
//   }

//   visitPages(evaluator: Evaluator, context: string, pages: Pages) {
//     console.log("Visiting Pages");
//     evaluator.pages = new PagesObj();
//   }

//   visitPage(evaluator: Evaluator, context: string, page: Page) {
//     console.log("Visiting Page");
//     evaluator.latestPage = new PageObj();
//     if (evaluator.pages) {
//       evaluator.pages.addPageObj(evaluator.latestPage);
//     } else {
//       throw new Error("Pages not declared :(");
//     }
//   }

//   visitHeader(evaluator: Evaluator, context: string, header: Header_Field) {
//     console.log("Visiting Header_Field");
//     if (evaluator.latestPage) {
//       evaluator.latestPage.setHeader(header.toString());
//     } else {
//       throw new Error("Latest page not set :(");
//     }
//   }

//   visitInstructions(
//     evaluator: Evaluator,
//     context: string,
//     instructions: Instructions_Field
//   ) {
//     console.log("Visiting Instructions_Field");
//     if (evaluator.latestPage) {
//       evaluator.latestPage.setInstructions(instructions.toString());
//     } else {
//       throw new Error("Latest page not declared :(");
//     }
//   }

//   //TODO: FIX THIS
//   visitProgram(evaluator: Evaluator, context: string, program: Program) {
//     console.log("Visiting Program");
//     /*program.getNodes().forEach((node) => {
//       node.accept(context, evaluator);
//     });*/
//   }

//   visitPageId(evaluator: Evaluator, context: string, id: Id_Field) {
//     console.log("Visiting Id_Field");
//     evaluator.latestPage?.setId(id.toString());
//   }

//   visitQuestions(evaluator: Evaluator, context: string, questions: Questions_Field) {
//     console.log("Visiting Questions_Field");
//     evaluator.latestPage?.initQuestions();
//   }

//   visitQuestion(evaluator: Evaluator, context: string, question: Question) {
//     console.log("Visiting Question");
//     evaluator.latestQuestion = new QuestionObj();
//     evaluator.latestPage?.addQuestion(evaluator.latestQuestion);
//   }

//   getPages = () => {
//     return this.pages;
//   };

//   createHTML() {
//     console.log("createHTML from Evaluator");
//     if (this.pages) {
//       this.pages.createHTML();
//     } else {
//       throw new Error("Pages is undefined :(");
//     }
//   }
// }
