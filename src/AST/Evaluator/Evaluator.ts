import { Cond_Body } from "../Nodes/Cond_Body";
import { Conditional } from "../Nodes/Conditional";
import { Else_If_Cond } from "../Nodes/Else_If_Cond";
import { FormStateAccess } from "../Nodes/FormStateAccess";
import { FunctionCustom } from "../Nodes/FunctionCustom";
import { Function_Body } from "../Nodes/Function_Body";
import { Function_Call } from "../Nodes/Function_Call";
import { Functions_Array } from "../Nodes/Functions_Array";
import { If_Cond } from "../Nodes/If_Cond";
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
  Variable,
  VariableName,
  VariablesArray,
  Visitor,
  VariableAssignment,
} from "../export";

export class Evaluator implements Visitor<{}, any> {
  private jumpTable: any;

  private programFunctions: {
    [key: string]: FunctionCustom | ((args: any[]) => any);
  } = {
    getRandomInt: (args: any[]) => {
      // reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      return Math.floor(Math.random() * (args[1] - args[0] + 1) + args[0]);
    },
    stringConcat: (args: any[]) => {
      return args.join("");
    },
  };

  constructor() {
    this.visitArrayCustom = this.visitArrayCustom.bind(this);
    this.visitArrayValue = this.visitArrayValue.bind(this);
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
    this.visitVariable = this.visitVariable.bind(this);
    this.visitVariableName = this.visitVariableName.bind(this);
    this.visitVariablesArray = this.visitVariablesArray.bind(this);
    this.visitVariableAssignment = this.visitVariableAssignment.bind(this);

    this.jumpTable = {
      ArrayCustom: this.visitArrayCustom,
      ArrayValue: this.visitArrayValue,
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
      Variable: this.visitVariable,
      VariableName: this.visitVariableName,
      VariablesArray: this.visitVariablesArray,
      VariableAssignment: this.visitVariableAssignment,
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

  visitProgram(context: any, program: Program) {
    program.getFunctionsArray()?.accept(context, this);
    let globalVariables = program.getGlobalVariables()?.accept(context, this);
    let pages = program.getPages().accept(context, this);
    let FunctionsMap = this.programFunctions;

    return {
      FunctionsMap,
      globalVariables,
      pages,
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

    console.log("question type: ", question.getQuestionType());

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
      vars: questionVariables,
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
      //   console.log("LOOKATMEEEEEEEEE");
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

  // TODO:
  visitFunctionBody(context: {}, functionBody: Function_Body) {
    let statements = functionBody.getStatements();
    let returnValueFunction = functionBody.getFunctionReturnValue();
    statements = statements.map((statement) => {
      //   console.log("YOOOOOOO1");
      if (hasAcceptMethod(statement)) {
        // console.log("YOOOOOOO2");
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

  // TODO:
  visitFunctionCall(context: {}, functionCall: Function_Call) {
    let variableName = functionCall.getVariableName().getName();
    let functionParameters = functionCall.getFunctionParams();

    let return_obj = {
      args: functionParameters,
      value: this.programFunctions[variableName],
    };
    return return_obj;
  }

  // TODO:
  visitFunctionCustom(context: {}, functionCustom: FunctionCustom) {
    let functionName = functionCustom.getFunctionName().getName();
    this.programFunctions[functionName] = functionCustom;
    return {
      functionName: functionName,
      fnNode: functionCustom,
    };
  }

  visitFunctionsArray(context: {}, functionsArray: Functions_Array) {
    const functionsMap: { [key: string]: FunctionCustom } = {};
    functionsArray.getFunctionList().forEach((fn) => {
      const res = fn.accept(context, this);
      functionsMap[res.functionName] = res;
    });
    return functionsMap;
  }

  visitMathExpression(context: {}, mathExpression: MathExpression) {
    return mathExpression.getExpression();
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
    let return_obj = { [variableName]: variableValue };
    return return_obj;
  }

  visitVariableName(context: {}, variableName: VariableName) {
    return variableName;
  }

  visitVariablesArray(context: {}, variablesArray: VariablesArray) {
    return variablesArray
      .getVariableList()
      .map((variable) => variable.accept(context, this));
  }

  // TODO:
  visitVariableAssignment(
    context: {},
    variableAssignment: VariableAssignment
  ) {}

  visitRegex(context: {}, regex: any) {
    return regex.getRegex();
  }
}

function hasAcceptMethod(obj: any): obj is Expression | VariableName {
  return obj && typeof obj.accept === "function";
}
