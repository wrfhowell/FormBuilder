import {
    ArrayCustom,
    Expression,
    MathExpression,
    Page,
    Pages,
    Program,
    Question,
    Question_Array, StringExpression,
    Variable, VariableName,
    VariablesArray,
} from "../../src/AST/export";
import {Functions_Array} from "../../src/AST/Nodes/Functions_Array";
import {FunctionCustom} from "../../src/AST/Nodes/FunctionCustom";
import {UnscopedExpression} from "../../src/AST/Nodes/UnscopedExpression";
import {Function_Body} from "../../src/AST/Nodes/Function_Body";
import {Function_Call} from "../../src/AST/Nodes/Function_Call";
import {ScopedExpression} from "../../src/AST/Nodes/ScopedExpression";

//Page 1: AdditionPage

//TODO: Leave it up the Evaluator to get the variable values
const getAdditionQuestionLabelFunctionCall = new Function_Call(
    new VariableName("getAdditionQuestionLabel"),
    [
        new VariableName("num1"),
        new VariableName("num2")
    ]
)

//TODO: Need to replace this with our Form object according to input-math.js!
const num1AddVar = new Variable("num1", Math.random());
const num2AddVar = new Variable("num2", Math.random())
const ansAddExpression = new Expression(new UnscopedExpression(
    new MathExpression(
       num1AddVar.getVariableName() + "+" +
        num2AddVar.getVariableName()
    ),
    num1AddVar.getVariableName() + "+" +
    num2AddVar.getVariableName()
    )
);
const ansAddVar = new Variable("ans", ansAddExpression);

const additionQuestionVariables = new VariablesArray([
    num1AddVar,
    num2AddVar,
    ansAddVar]);

const additionPageQuestion = new Question(
    "addition-q-", //evaluator must add  add id with the loop index.
    "textInput",
    getAdditionQuestionLabelFunctionCall,
    new ArrayCustom([]),
    undefined,
    undefined,
    5,
    true,
    <Expression> ansAddVar.getVariableValue(),
    additionQuestionVariables
)
const additionPageQuestionsArray = new Question_Array([additionPageQuestion]);

const additionPage = new Page(
    "addition-pg",
    undefined,
    "Addition",
    "Please solve the following addition problems",
    5,
    additionPageQuestionsArray
);

// getAdditionQuestionLabelFunction
const getAdditionQuestionLabelFunctionParams = [
    new VariableName("num1"),
    new VariableName("num2")
]

const getAdditionQuestionLabelFunctionReturnVal = new Expression(
    new UnscopedExpression(
        new StringExpression(
            "" + getAdditionQuestionLabelFunctionParams[0] + " + "
            + getAdditionQuestionLabelFunctionParams[1] + " = "
        ),
        "" + getAdditionQuestionLabelFunctionParams[0] + " + "
        + getAdditionQuestionLabelFunctionParams[1] + " = "
    )
)

const getAdditionQuestionLabelFunctionBody = new Function_Body(
    [],
    getAdditionQuestionLabelFunctionReturnVal

)
const getAdditionQuestionLabelFunction = new FunctionCustom(
    new VariableName("getAdditionQuestionLabel"),
    getAdditionQuestionLabelFunctionParams,
    getAdditionQuestionLabelFunctionBody
)


//Page 2: Multiplication Page

//TODO: Need to replace this with our Form object according to input-math.js!
const num1MultVar = new Variable("num1", Math.random());
const num2MultVar = new Variable("num2", Math.random())
const labelMultExpression = new Expression(new UnscopedExpression(
        new StringExpression(
            "" + num1MultVar.getVariableName() + "*" +
            num2MultVar.getVariableName() + " = "
        ),
    "" + num1MultVar.getVariableName() + "*" +
    num2MultVar.getVariableName() + " = "
    )
);

const multQuestionAnsFunctionCall = new Function_Call(
    new VariableName("multQuestionAns"),
    [
        new VariableName("num1"),
        new VariableName("num2")
    ]
)

const ansMultVar = new Variable("ans", multQuestionAnsFunctionCall);

const multiplicationQuestionVariables = new VariablesArray([
    num1MultVar,
    num2MultVar,
    ansMultVar]);

const multiplicationPageQuestion = new Question(
    "multiplication-q-", //evaluator must add  add id with the loop index
    "textInput",
    labelMultExpression,
    new ArrayCustom([]),
    undefined,
    undefined,
    5,
    true,
    <Function_Call> ansMultVar.getVariableValue(),
    multiplicationQuestionVariables
)
const multiplicationPageQuestionsArray = new Question_Array([multiplicationPageQuestion]);

const multiplicationPage = new Page(
    "multiplication-pg",
    undefined,
    "Multiplication",
    "Please solve the following multiplication problems",
    5,
    multiplicationPageQuestionsArray
);

// MultQuestionAnsFunction
const multQuestionAnsFunctionParams = [
    new VariableName("num1"),
    new VariableName("num2")
]

const multQuestionAnsFunctionReturnVal = new Expression(
    new UnscopedExpression(
        new MathExpression(
            multQuestionAnsFunctionParams[0] + "*"
            + multQuestionAnsFunctionParams[1]
        ),
        multQuestionAnsFunctionParams[0] + "*"
        + multQuestionAnsFunctionParams[1]
    )
)

const multQuestionAnsFunctionBody = new Function_Body(
    [],
    multQuestionAnsFunctionReturnVal

)
const multQuestionAnsFunction = new FunctionCustom(
    new VariableName("multQuestionAns"),
    multQuestionAnsFunctionParams,
    multQuestionAnsFunctionBody
)

// Page 3: Algebra Page

//TODO: Need to replace this with our Form object according to input-math.js!
const num1AlgebraVar = new Variable("num1", Math.random());
const num2AlgebraVar = new Variable("num2", Math.random());
const num3AlgebraVar = new Variable("num3", Math.random());
const num4AlgebraVar = new Variable("num4", Math.random())
const labelAlgebraExpression = new Expression(new UnscopedExpression(
        new StringExpression(
            "" + num1MultVar.getVariableName() + "*" +
            num2MultVar.getVariableName() + " + "
            + num3AlgebraVar.getVariableName() + " = " + num4AlgebraVar.getVariableName()
        ),
        "" + num1MultVar.getVariableName() + "*" +
        num2MultVar.getVariableName() + " + "
        + num3AlgebraVar.getVariableName() + " = " + num4AlgebraVar.getVariableName()
    )
);

const algebraQuestionAnsFunctionCall = new Function_Call(
    new VariableName("algebraQuestionAns"),
    [
        new VariableName("num1"),
        new VariableName("num2"),
        new VariableName("num3"),
        new VariableName("num4")
    ]
)

const ansAlgebraVar = new Variable("ans", algebraQuestionAnsFunctionCall);

const algebraQuestionVariables = new VariablesArray([
    num1AlgebraVar,
    num2AlgebraVar,
    num3AlgebraVar,
    num4AlgebraVar,
    ansAlgebraVar]);

const algebraPageQuestion = new Question(
    "multiplication-q-", //evaluator must add  add id with the loop index.
    "textInput",
    labelAlgebraExpression,
    new ArrayCustom([]),
    undefined,
    undefined,
    5,
    true,
    <Function_Call> ansAlgebraVar.getVariableValue(),
    algebraQuestionVariables
)
const algebraPageQuestionsArray = new Question_Array([algebraPageQuestion]);

const algebraPage = new Page(
    "algebra-pg",
    undefined,
    "Algebra",
    "Please solve the following algebra problems. Round to two decimal places.",
    5,
    algebraPageQuestionsArray
);


// algebraQuestionAnsFunction
const algebraQuestionAnsFunctionParams = [
    new VariableName("num1"),
    new VariableName("num2"),
    new VariableName("num3"),
    new VariableName("num4")
]

const algebraQuestionAnsFunctionReturnVal = new Expression(
    new ScopedExpression(
        new ScopedExpression(
            new UnscopedExpression(
            new MathExpression(
                algebraQuestionAnsFunctionParams[3] + "-"
                + algebraQuestionAnsFunctionParams[2]),
                algebraQuestionAnsFunctionParams[3] + "-"
                + algebraQuestionAnsFunctionParams[2]
            ),
            {
                "/": new Expression(
                    new UnscopedExpression(new MathExpression(
                        algebraQuestionAnsFunctionParams[0] + "*"
                        + algebraQuestionAnsFunctionParams[1]
                    ),
                        algebraQuestionAnsFunctionParams[0] + "*"
                        + algebraQuestionAnsFunctionParams[1]
                    )
                ),
                "*": new Expression(100)
            }
            ),
        {
            "/": new Expression(100)
        }
    )
)

const algebraQuestionAnsFunctionBody = new Function_Body(
    [],
    algebraQuestionAnsFunctionReturnVal

)
const algebraQuestionAnsFunction= new FunctionCustom(
    new VariableName("algebraQuestionAns"),
    algebraQuestionAnsFunctionParams,
    algebraQuestionAnsFunctionBody
)


// Create page array
const pages = new Pages([additionPage, multiplicationPage, algebraPage]);

// Create function array
const funcArray = new Functions_Array([multQuestionAnsFunction, algebraQuestionAnsFunction,
    getAdditionQuestionLabelFunction]);

export const baseProgram = new Program(pages, funcArray, undefined);
