import { FunctionCustom } from "../../src/AST/Nodes/FunctionCustom";
import { Function_Body } from "../../src/AST/Nodes/Function_Body";
import { Function_Call } from "../../src/AST/Nodes/Function_Call";
import { Functions_Array } from "../../src/AST/Nodes/Functions_Array";
import {
	ArrayCustom,
	ArrayValue,
	Expression,
	MathExpression,
	Page,
	Pages,
	Program,
	Question,
	Question_Array, StringExpression,
	Variable,
	VariableName,
	VariablesArray,
} from "../../src/AST/export";

//create a parameters for a function that returns the value of 10 + 10!"
const mathematicsParameters = ["10", "10"];
const mathematicsFunctionReturnValue = "20";
const mathematicsStatement = new Expression(
	new UnscopedExpression(
		new MathExpression(
			mathematicsParameters[0] + "+" + mathematicsParameters[1]
		),
		mathematicsParameters[0] + mathematicsParameters[1]
	)
);
const mathematicsFunctionBody = new Function_Body(
	[mathematicsStatement],
	mathematicsFunctionReturnValue
);
const mathematicsFunctionName = new VariableName("MathematicsFunction");
const mathematicsFunction = new FunctionCustom(
	mathematicsFunctionName,
	mathematicsParameters,
	mathematicsFunctionBody
);

//TODO: Decided to add this but unsure what the point of it is after building the AST? Ask Rodrigo, as
// I just converted what he wrote.
const mathematicsFunctionCall = new Function_Call(
	mathematicsFunctionName,
	mathematicsParameters
);

//create a scoped expression

//returns the VALUE of TRUE, which evaluator will determine
const booleanNumExpression = new Expression(
	new UnscopedExpression(new BooleanExpression("10 > 4"), "10 > 4")
);

//this just returns the value of FALSE, which the evaluator will determine
const booleanStringExpression = new Expression(
	new UnscopedExpression(
		new BooleanExpression("Goodbye == Hello"),
		"Goodbye == Hello"
	)
);

//create a string expression
const stringExpression = new UnscopedExpression(
	new StringExpression("This is a string"),
	"This is a string"
);

//create new scoped Expression
// StringExpression == BooleanNumExpression != BooleanStringExpression
// This should be evaluated into a single string to which the Evaluator will return true.
const expressionFunctionReturnValue = new Expression(
	new ScopedExpression(stringExpression, {
		"==": booleanNumExpression,
		"!=": booleanStringExpression,
	})
);

const expressionFunctionBody = new Function_Body(
	[],
	expressionFunctionReturnValue
);
const expressionFunctionName = new VariableName("ExpressionFunction");
const expressionFunction = new FunctionCustom(
	expressionFunctionName,
	[],
	expressionFunctionBody
);

const expressionFunctionCall = new Function_Call(expressionFunctionName, []);

const functions = new Functions_Array([
	mathematicsFunction,
	expressionFunction,
]);

const globalVariables = new VariablesArray([new Variable("score", 0)]);

const questionOptions = new ArrayCustom([
	new ArrayValue("10"),
	new ArrayValue("20"),
	new ArrayValue("30"),
	new ArrayValue("40"),
]);

const question = new Question(
	"q1",
	"radio",
	"What is 10 + 10?",
	questionOptions,
	undefined,
	undefined,
	undefined,
	true,
	mathematicsFunction.getFunctionBody().getFunctionReturnValue() as string,
	undefined
);
const scopedExpressionQuestionExample = new Question(
	"randomExample",
	undefined,
	"This is a scoped expression example",
	new ArrayCustom([]),
	undefined,
	undefined,
	undefined,
	true,
	expressionFunctionReturnValue,
	undefined
);
const questionsArray = new Question_Array([
	question,
	scopedExpressionQuestionExample,
]);

const goTo = "end";

const page = new Page(
	"page1",
	goTo,
	undefined,
	undefined,
	"all",
	questionsArray
);

const pages = new Pages([page]);

export const baseProgram = new Program(pages, functions, globalVariables);
