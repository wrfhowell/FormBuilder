import {
  ArrayCustom,
  ArrayValue,
  Cond_Body,
  Conditional,
  Else_If_Cond,
  Expression,
  FormStateAccess,
  Function_Body,
  Function_Call,
  FunctionCustom,
  Functions_Array,
  If_Cond,
  MathExpression,
  Page,
  Pages,
  Program,
  Question,
  Question_Array,
  Variable,
  VariableAssignment,
  VariableName,
  VariablesArray,
  Visitor,
  ExtendedMathExpression
} from "../export";

type baseCheckerContext = {
  functionNames: string[];
  globalVariables: string[];
  pageIds: string[];
  apiFunctionNames: string[];
  functionParams?: string[];
  questionVars?: string[];
  [key: string]: any;
};

export class CheckerError extends Error {
  constructor(message?: string) {
    super(message);
    Error.captureStackTrace(this, CheckerError);
  }
}

export class BaseChecker implements Visitor<{}, any> {
  private jumpTable: any;
  private apiFunctionNames: string[] = [
    "stringConcat",
    "isEqual",
    "isGreater",
    "isGreaterEqual",
    "isLess",
    "isLessEqual",
    "getRandom",
    "getRandomInt",
    "roundToInt",
  ];

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
      Variable: this.visitVariable,
      VariableName: this.visitVariableName,
      VariablesArray: this.visitVariablesArray,
      VariableAssignment: this.visitVariableAssignment,
    };
  }

  visit(context: baseCheckerContext, node: any) {
    const nodeType = node.constructor.name;
    const visitMethod = this.jumpTable[nodeType];
    if (visitMethod) {
      return visitMethod(context, node);
    } else {
      console.error(`No visit method defined for node type: ${nodeType}`);
      return null;
    }
  }

  visitProgram(context: baseCheckerContext, program: Program) {
    // Check that program has pages
    if (!program.getPages()) {
      throw new CheckerError(
        "Form Builder must have a list of pages to display"
      );
    }

    // Create context that includes list of function names, global variables, page IDs.
    context.functionNames = [];
    context.globalVariables = [];
    context.pageIds = [];
    context.apiFunctionNames = this.apiFunctionNames;

    this.addFunctionNamesToContext(program, context);
    this.addGlobalVarNamesToContext(program, context);
    this.addPageIdToContext(program, context);


    // Check if there are duplicate function, variable or pageID names
    if (this.hasDuplicates(context.functionNames)) {
      throw new CheckerError("Duplicate function names found");
    }
    if (this.hasDuplicates(context.globalVariables)) {
      throw new CheckerError("Duplicate variable names found");
    }
    if (this.hasDuplicates(context.pageIds)) {
      throw new CheckerError("Duplicate page IDs found");
    }

    program.getPages().accept(context, this);
    program.getGlobalVariables()?.accept(context, this);
    program.getFunctionsArray()?.accept(context, this);

    return "Checker passed!";
  }

  /**
   * Check that there is at least one page to display and move on to child nodes
   * @param context
   * @param pages
   * @returns
   */
  visitPages(context: baseCheckerContext, pages: Pages) {
    // Check that there is at least one page
    if (pages.getPageArray().length === 0) {
      throw new CheckerError(
        "Form Builder must have at least one page to display"
      );
    }

    pages.getPageArray().forEach((page: Page) => page.accept(context, this));
  }

  visitPage(context: baseCheckerContext, page: Page) {
    // Check that page has an ID
    if (!page.getId()) {
      throw new CheckerError("Page must have an ID");
    }

    let goTo = page.getGoToObject();
    let header = page.getHeader();
    let instructions = page.getInstructions();
    let questions = page.getQuestionArray();

    if (!this.isGoToValueValid(goTo, context)) {
      throw new CheckerError(
        "Page GoTo must reference a valid page ID, variable name or function call"
      );
    }

    if (
      typeof header !== "string" &&
      !(header instanceof String) &&
      !this.isSymbolDeclaredGlobally(context, header)
    ) {
      throw new CheckerError(
        "Page header making reference to undeclared variable or function call"
      );
    }

    if (
      typeof instructions !== "string" &&
      !(instructions instanceof String) &&
      !this.isSymbolDeclaredGlobally(context, instructions)
    ) {
      throw new CheckerError(
        "Page instructions making reference to undeclared variable or function call"
      );
    }

    if (hasAcceptMethod(questions)) {
      questions = questions.accept(context, this);
    }
  }

  visitQuestionArray(
    context: baseCheckerContext,
    questionArray: Question_Array
  ) {
    questionArray
      .getQuestionList()
      .forEach((question: Question) => question.accept(context, this));
  }

  visitQuestion(context: baseCheckerContext, question: Question) {
    let id = question.getId();
    let type = question.getQuestionType();
    let label = question.getLabel();
    let options = question.getOptions();
    let correctAnswer = question.getCorrectAnswer();
    let questionVariables =
      question
        .getQuestionVariables()
        ?.getVariableList()
        .map((variable: Variable) => variable.getVariableName()) || [];

    context.questionVars = questionVariables;

    // Check that question has an ID, type, and label
    if (id === undefined) {
      throw new CheckerError("Question must have an ID");
    }
    if (type === undefined) {
      throw new CheckerError("Question must have a type");
    }
    if (label === undefined) {
      throw new CheckerError("Question must have a label");
    }

    // Check that fields instantiated with variables or function calls refer to declared variables or function calls
    if (
      typeof label !== "string" &&
      !(label instanceof String) &&
      label !== undefined
    ) {
      this.checkValidityOfQuestionField(
        label,
        questionVariables,
        context,
        "label"
      );
    }
    if (!(options instanceof ArrayCustom) && options !== undefined) {
      this.checkValidityOfQuestionField(
        options,
        questionVariables,
        context,
        "options"
      );
    }
    if (
      typeof correctAnswer !== "string" &&
      !(correctAnswer instanceof String) &&
      typeof correctAnswer !== "number" &&
      !(correctAnswer instanceof Number) &&
      correctAnswer !== undefined
    ) {
      this.checkValidityOfQuestionField(
        correctAnswer,
        questionVariables,
        context,
        "correctAnswer"
      );
    }

    let validTypes = ["radio", "checkbox", "dropdown", "textInput"];
    if (!validTypes.includes(type)) {
      throw new CheckerError("Invalid question type");
    }

    if (hasAcceptMethod(question.getQuestionVariables())) {
      question.getQuestionVariables()?.accept(context, this);
    }
    if (hasAcceptMethod(options)) {
      options = options.accept(context, this);
    }
    if (hasAcceptMethod(correctAnswer)) {
      correctAnswer = correctAnswer.accept(context, this);
    }
    if (hasAcceptMethod(id)) {
      id = id.accept(context, this);
    }
    if (hasAcceptMethod(label)) {
      label = label.accept(context, this);
    }
  }

  visitFunctionsArray(
    context: baseCheckerContext,
    functionsArray: Functions_Array
  ) {
    functionsArray
      .getFunctionList()
      .forEach((fun: FunctionCustom) => fun.accept(context, this));
  }

  visitFunctionCustom(
    context: baseCheckerContext,
    functionCustom: FunctionCustom
  ) {
    // Check that function parameters are not function calls.
    let functionParameters = functionCustom.getFunctionParams();
    functionParameters.forEach((param: any) => {
      if (!(param instanceof VariableName)) {
        throw new CheckerError("Invalid function parameter name.");
      }
    });

    context.functionParams = functionParameters.map((param: any) =>
      param.getName()
    );

    //Check the function body
    functionCustom.getFunctionBody().accept(context, this);
  }

  visitFunctionBody(context: baseCheckerContext, functionBody: Function_Body) {
    let statements = functionBody.getStatements();
    let returnValueFunction = functionBody.getFunctionReturnValue();

    // check that returnValueFunction has valid variable or function call
    this.checkVarAndFunCallInFunctionIsValid(context, returnValueFunction);

    statements.forEach((statement: any) => {
      if (hasAcceptMethod(statement)) {
        statement.accept(context, this);
      }
    });

    if (hasAcceptMethod(returnValueFunction)) {
      returnValueFunction = returnValueFunction.accept(context, this);
    }
  }

  visitVariableAssignment(
    context: baseCheckerContext,
    variableAssignment: VariableAssignment
  ) {
    let variableName = variableAssignment.getVariableName().getName();
    let variableValue = variableAssignment.getVariableAssignedValue();

    // Check that variable name is defined in global scope
    if (!context.globalVariables.includes(variableName)) {
      throw new CheckerError(
        "Attempting to assign value to undeclared variable"
      );
    }

    // check that variableValue has valid variable or function call
    this.checkVarAndFunCallInFunctionIsValid(context, variableValue);

    if (hasAcceptMethod(variableValue)) {
      variableValue.accept(context, this);
    }
  }

  visitConditional(context: baseCheckerContext, conditional: Conditional) {
    let ifCond = conditional.getIfCond();
    let elseIfCond = conditional.getElseIfCond();
    let elseCond = conditional.getElseCond();

    ifCond.accept(context, this);
    elseIfCond.forEach((elseIf: Else_If_Cond) => elseIf.accept(context, this));
    if (hasAcceptMethod(elseCond)) {
      elseCond = elseCond.accept(context, this);
    }
  }

  visitIfCond(context: baseCheckerContext, ifCond: If_Cond) {
    let condition = ifCond.getCondition();
    let condBody = ifCond.getCondBody();
    // check that condition variable or function call is declared

    this.checkVarAndFunCallInFunctionIsValid(context, condition);

    condition.accept(context, this);
    condBody.accept(context, this);
  }

  visitElseIfCond(context: baseCheckerContext, elseIfCond: Else_If_Cond) {
    let condition = elseIfCond.getCondition();
    let functionBody = elseIfCond.getCondBody();

    this.checkVarAndFunCallInFunctionIsValid(context, condition);

    condition.accept(context, this);
    functionBody.accept(context, this);
  }

  visitCondBody(context: baseCheckerContext, condBody: Cond_Body) {
    let statements = condBody.getStatements();
    let returnValueIf = condBody.getReturnValue();

    this.checkVarAndFunCallInFunctionIsValid(context, returnValueIf);

    statements.forEach((statement: any) => {
      if (hasAcceptMethod(statement)) {
        statement.accept(context, this);
      }
    });

    if (hasAcceptMethod(returnValueIf)) {
      returnValueIf = returnValueIf.accept(context, this);
    }
  }

  visitExpression(context: baseCheckerContext, expression: Expression) {
    let expVal = expression.getExpression();

    this.checkVarAndFunCallInFunctionIsValid(context, expVal);

    if (hasAcceptMethod(expVal)) {
      expVal = expVal.accept(context, this);
    }
  }

  visitMathExpression(
    context: baseCheckerContext,
    mathExpression: MathExpression
  ) {
    let expression = mathExpression.getExpression();
    let extendedMathExpressions = mathExpression.getExtendedMathExpressions();

    this.checkVarAndFunCallInFunctionIsValid(context, expression);

    extendedMathExpressions.forEach((extendedMathExpression: ExtendedMathExpression) => {
      if (hasAcceptMethod(extendedMathExpression)) {
        extendedMathExpression.accept(context, this);
      }
    });

    if (hasAcceptMethod(expression)) {
      expression = expression.accept(context, this);
    }
  }

  visitMathOp(context: baseCheckerContext, mathOp: any) {
    let op = mathOp.getOp();
    let validOps = ["+", "-", "*", "/"];
    if (!validOps.includes(op)) {
      throw new CheckerError("Invalid math operation");
    }
  }

  visitFunctionCall(context: baseCheckerContext, functionCall: Function_Call) {
    let functionParameters = functionCall.getFunctionParams();

    // Check that variableName is a declared function
    if (!this.isFunctionNameDeclared(context, functionCall)) {
      throw new CheckerError("Function not declared");
    }

    functionParameters.forEach((param: any) => {
      if (hasAcceptMethod(param)) {
        return param.accept(context, this);
      }
      return param;
    });
  }

  visitArrayCustom(context: baseCheckerContext, arrayCustom: ArrayCustom) {
    let arrValues = arrayCustom.getArrayCustom();

    arrValues.forEach((value: ArrayValue) => {
      if (hasAcceptMethod(value)) {
        value.accept(context, this);
      }
    });
  }

  visitArrayValue(context: baseCheckerContext, arrayValue: ArrayValue) {
    let value = arrayValue.getValue();

    if (value instanceof VariableName) {
      if (context.questionVars) {
        if (
          !this.isGlobalVarDeclared(context, value) &&
          !context.questionVars.includes(value.getName())
        ) {
          throw new CheckerError("Array value not declared");
        }
      } else {
        if (!this.isGlobalVarDeclared(context, value)) {
          throw new CheckerError("Array value not declared");
        }
      }
    }
  }

  visitVariablesArray(
    context: baseCheckerContext,
    variablesArray: VariablesArray
  ) {
    variablesArray
      .getVariableList()
      .forEach((variable: Variable) => variable.accept(context, this));
  }

  visitVariable(context: baseCheckerContext, variable: Variable) {
    let variableValue = variable.getVariableValue();

    if (hasAcceptMethod(variableValue)) {
      variableValue = variableValue.accept(context, this);
    }
  }

  visitVariableName(context: baseCheckerContext, variableName: VariableName) {
    let name = variableName.getName();
    return null;
  }

  visitFormStateAccess(
    context: baseCheckerContext,
    formStateAccess: FormStateAccess
  ) {
    let pageId = formStateAccess.getPageId();

    if (!context.pageIds.includes(pageId)) {
      throw new CheckerError("FormStateAccess must reference a valid page ID");
    }
  }

  //---------------------------Helper Functions-----------------------------------------------------

  private addFunctionNamesToContext(program: Program, context: any) {
    if (program.getFunctionsArray()) {
      let functionsList: FunctionCustom[] =
        program.getFunctionsArray()?.getFunctionList() || [];

      functionsList.forEach((func: FunctionCustom) => {
        let functionName = func.getFunctionName().getName()
        if(this.apiFunctionNames.includes(functionName)) {
          throw new CheckerError(`${functionName} is already taken by the API library.` )
        }
        context.functionNames.push(functionName);
      });
    }
    context.functionNames = context.functionNames.concat(this.apiFunctionNames);
  }

  private addPageIdToContext(program: Program, context: any) {
    let pages: Page[] = program.getPages().getPageArray();
    pages.forEach((page: Page) => {
      context.pageIds.push(page.getId());
    });
  }

  private addGlobalVarNamesToContext(program: Program, context: any) {
    if (program.getGlobalVariables()) {
      let globalVariablesList: Variable[] =
        program.getGlobalVariables()?.getVariableList() || [];

      globalVariablesList.forEach((variable: Variable) => {
        context.globalVariables.push(variable.getVariableName());
      });
    }
  }

  private isGoToValueValid(
    goTo: string | Function_Call | VariableName | undefined,
    context: baseCheckerContext
  ): boolean {
    if (typeof goTo === "string" || goTo instanceof String) {
      return context?.pageIds.includes(goTo as string);
    } else {
      return this.isSymbolDeclaredGlobally(context, goTo);
    }
  }

  private isSymbolDeclaredGlobally(
    context: baseCheckerContext,
    symbol: string | Function_Call | VariableName | undefined
  ): boolean {
    if (symbol instanceof VariableName) {
      return this.isGlobalVarDeclared(context, symbol);
    } else if (symbol instanceof Function_Call) {
      return this.isFunctionNameDeclared(context, symbol);
    } else {
      return false;
    }
  }

  private isFunctionNameDeclared(
    context: baseCheckerContext,
    funName: Function_Call
  ): boolean {
    return context?.functionNames.includes(funName.getVariableName().getName());
  }

  private isGlobalVarDeclared(
    context: baseCheckerContext,
    variable: VariableName
  ): boolean {
    return context?.globalVariables.includes(variable.getName());
  }

  private isVarDeclaredInQuestion(
    questionVariables: string[],
    label: VariableName
  ) {
    return questionVariables.includes(label.getName());
  }

  /**
   * Checks that the a function call or variable name in a question has been properly declared
   * @param symbol - the symbol to check
   * @param questionVariables - array of variables declared in the question
   * @param context - program context
   * @param fieldName - the name of the field being checked
   */
  private checkValidityOfQuestionField(
    symbol: VariableName | Function_Call,
    questionVariables: string[],
    context: baseCheckerContext,
    fieldName: string
  ) {
    if (symbol instanceof VariableName) {
      if (
        !this.isVarDeclaredInQuestion(questionVariables, symbol) ||
        this.isGlobalVarDeclared(context, symbol)
      ) {
        throw new CheckerError(
          `Question ${fieldName} making reference to undeclared variable`
        );
      }
    } else if (symbol instanceof Function_Call) {
      if (!this.isFunctionNameDeclared(context, symbol)) {
        throw new CheckerError(
          `Question ${fieldName} making reference to undeclared function`
        );
      }
    }
  }

  private checkVarAndFunCallInFunctionIsValid(
    context: baseCheckerContext,
    symbol: any
  ) {
    if (symbol instanceof VariableName) {
      if (context.functionParams) {
        if (
          !context.functionParams.includes(symbol.getName()) &&
          !this.isGlobalVarDeclared(context, symbol)
        ) {
          throw new CheckerError(
            "Condition variable not declared in function parameters or globally"
          );
        }
      } else {
        if (!this.isGlobalVarDeclared(context, symbol)) {
          throw new CheckerError(
            "Condition variable not declared in function parameters or globally"
          );
        }
      }
    } else if (symbol instanceof Function_Call) {
      if (!this.isFunctionNameDeclared(context, symbol)) {
        throw new CheckerError("Condition function not declared");
      }
    }
  }

  private hasDuplicates(arr: any[]) {
    return new Set(arr).size !== arr.length;
  }
}

function hasAcceptMethod(obj: any): obj is Expression | VariableName {
  return obj && typeof obj.accept === "function";
}
