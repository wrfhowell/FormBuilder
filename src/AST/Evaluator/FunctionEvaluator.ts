import { ArrayCustom, MathExpression, Visitor } from "../export";
import { Function_Body } from "../Nodes/Function_Body";
import { Function_Call } from "../Nodes/Function_Call";
import { FunctionCustom } from "../Nodes/FunctionCustom";
import { VariableName } from "../Nodes/VariableName";
import { Expression } from "../Nodes/Expression";
import { FormStateAccess } from "../Nodes/FormStateAccess";
import { VariableAssignment } from "../Nodes/VariableAssignment";
import { Conditional } from "../Nodes/Conditional";
import { If_Cond } from "../Nodes/If_Cond";
import { Else_If_Cond } from "../Nodes/Else_If_Cond";
import { Cond_Body } from "../Nodes/Cond_Body";
import { ArrayValue } from "../export";
import { FunctionEvaluatorError } from "src/Functions/errors";

const LOGGING = false;

const log = (...args: any[]) => {
  if (LOGGING) {
    console.log(...args);
  }
};

export interface VarsContext {
  [key: string]: string | number | (string | number)[];
}

export interface FunctionsContext {
  [key: string]: FunctionCustom | ((args: any[]) => any);
}

export interface FunctionEvaluatorContext {
  globalVars: VarsContext;
  formState: Map<string, Map<string, string>>;
  vars: VarsContext;
  functions: FunctionsContext;
  returnValue: any;
  passedArguments?: (string | number | Function_Call)[];
}

export class FunctionEvaluator implements Visitor<{}, any> {
  private jumpTable: any;
  private returnEncountered: boolean = false;

  constructor() {
    this.visitArray = this.visitArray.bind(this);
    this.visitArrayCustom = this.visitArrayCustom.bind(this);
    this.visitArrayValue = this.visitArrayValue.bind(this);
    this.visitExpression = this.visitExpression.bind(this);
    this.visitFormStateAccess = this.visitFormStateAccess.bind(this);
    this.visitFunctionCustom = this.visitFunctionCustom.bind(this);
    this.visitFunctionBody = this.visitFunctionBody.bind(this);
    this.visitFunctionCall = this.visitFunctionCall.bind(this);
    this.visitIfCond = this.visitIfCond.bind(this);
    this.visitCondBody = this.visitCondBody.bind(this);
    this.visitMathExpression = this.visitMathExpression.bind(this);
    this.visitString = this.visitString.bind(this);
    this.visitNumber = this.visitNumber.bind(this);
    this.visitVariableAssignment = this.visitVariableAssignment.bind(this);
    this.visitVariableName = this.visitVariableName.bind(this);
    this.visitConditional = this.visitConditional.bind(this);
    this.visitElseIfCond = this.visitElseIfCond.bind(this);

    this.jumpTable = {
      Array: this.visitArray,
      ArrayCustom: this.visitArrayCustom,
      ArrayValue: this.visitArrayValue,
      Conditional: this.visitConditional,
      Cond_Body: this.visitCondBody,
      Else_If_Cond: this.visitElseIfCond,
      Expression: this.visitExpression,
      FormStateAccess: this.visitFormStateAccess,
      Function_Call: this.visitFunctionCall,
      FunctionCustom: this.visitFunctionCustom,
      Function_Body: this.visitFunctionBody,
      If_Cond: this.visitIfCond,
      MathExpression: this.visitMathExpression,
      String: this.visitString,
      Number: this.visitNumber,
      VariableAssignment: this.visitVariableAssignment,
      VariableName: this.visitVariableName,
    };
  }

  visit(context: FunctionEvaluatorContext, node: any) {
    const nodeType = node.constructor.name;
    const visitMethod = this.jumpTable[nodeType];
    if (visitMethod) {
      visitMethod(context, node);
    } else {
      console.error(
        `No visit method defined for node type ${nodeType}: ${node}`
      );
      throw new FunctionEvaluatorError(
        `No visit method defined for node type ${nodeType}: ${node}`
      );
    }
  }

  visitArray(context: FunctionEvaluatorContext, node: Array<ArrayValue>) {
    log("Visiting Array: ", node);
    let evaluated_array: (string | number)[] = [];
    node.forEach((item) => {
      if (typeof item === "string" || typeof item === "number") {
        evaluated_array.push(item);
      } else {
        item.accept(context, this);
        evaluated_array.push(context.returnValue);
      }
    });
    context.returnValue = evaluated_array;
  }

  visitArrayCustom(context: FunctionEvaluatorContext, node: ArrayCustom) {
    log("Visiting ArrayCustom: ", node);
    let array = node.getArrayCustom();
    let evaluated_array: (string | number)[] = [];
    array.forEach((item) => {
      if (typeof item === "number" || typeof item === "string") {
        evaluated_array.push(item);
      } else {
        item.accept(context, this);
        evaluated_array.push(context.returnValue);
      }
    });
    context.returnValue = evaluated_array;
  }

  visitArrayValue(context: FunctionEvaluatorContext, node: ArrayValue) {
    let arrayValue = node.getValue();
    if (typeof arrayValue === "string" || typeof arrayValue === "number") {
      context.returnValue = node.getValue();
    } else {
      arrayValue?.accept(context, this);
    }
  }

  visitString(context: FunctionEvaluatorContext, node: string) {
    log("Visiting String: ", node);
    context.returnValue = node;
  }

  visitNumber(context: FunctionEvaluatorContext, node: number) {
    log("Visiting Number: ", node);
    context.returnValue = node;
  }

  visitConditional(context: FunctionEvaluatorContext, node: Conditional) {
    let BreakException = {};
    log("Visiting conditional");
    node.getIfCond().accept(context, this);
    log("conditional value: ", context.returnValue);
    if (context.returnValue.condSuccess === true) {
      context.returnValue = context.returnValue.returnValue;
      return;
    }
    try {
      node.getElseIfCond().forEach((else_if_cond) => {
        else_if_cond.accept(context, this);
        if (context.returnValue.condSuccess === true) throw BreakException;
      });
    } catch (err) {
      if (err !== BreakException) throw err;
      context.returnValue = context.returnValue.returnValue;
      return;
    }
    node.getElseCond()?.accept(context, this);
    context.returnValue = context.returnValue.returnValue;
  }

  visitCondBody(context: FunctionEvaluatorContext, node: Cond_Body) {
    let BreakException = {};
    // Break early if a nested return statement was found
    try {
      node.getStatements().forEach((statement) => {
        statement?.accept(context, this);
        if (this.returnEncountered) throw BreakException;
      });
    } catch (err) {
      if (err !== BreakException) throw err;
      context.returnValue = {
        condSuccess: true,
        returnValue: context.returnValue,
      };
      return;
    }

    let returnValue = node.getReturnValue();
    if (!returnValue) return;
    this.returnEncountered = true;

    if (typeof returnValue === "string" || typeof returnValue === "number") {
      context.returnValue = { condSuccess: true, returnValue };
    } else {
      returnValue.accept(context, this);
      context.returnValue = {
        returnValue: context.returnValue,
        condSuccess: true,
      };
    }
  }

  visitElseIfCond(context: FunctionEvaluatorContext, node: Else_If_Cond) {
    node.getCondition().accept(context, this);
    if (context.returnValue === false) {
      context.returnValue = { condSuccess: false };
      return;
    }
    node.getCondBody().accept(context, this);
    context.returnValue = {
      condSuccess: true,
      returnValue: context.returnValue,
    };
  }

  visitFormStateAccess(
    context: FunctionEvaluatorContext,
    node: FormStateAccess
  ) {
    const pageId = node.getPageId();
    const questionId = node.getQuestionId();
    const formStateValue = context.formState.get(pageId)?.get(questionId);
    if (formStateValue === undefined) {
      throw new FunctionEvaluatorError(
        `FormState not defined for pageId "${pageId}" and questionId "${questionId}"`
      );
    }
    context.returnValue = formStateValue;
  }

  visitIfCond(context: FunctionEvaluatorContext, node: If_Cond) {
    node.getCondition().accept(context, this);
    if (context.returnValue === false) {
      context.returnValue = { condSuccess: false };
      return;
    }
    node.getCondBody().accept(context, this);
  }

  visitExpression(context: FunctionEvaluatorContext, node: Expression) {
    log("Visiting Expression");
    let expression = node.getExpression();
    if (typeof expression === "number") {
      context.returnValue = expression;
    } else {
      // MathExpression or VariableName
      expression.accept(context, this);
    }
  }

  visitFunctionBody(context: FunctionEvaluatorContext, node: Function_Body) {
    log("Visiting FunctionBody");

    let BreakException = {};

    try {
      node.getStatements().forEach((statement) => {
        statement?.accept(context, this);
        if (this.returnEncountered) throw BreakException;
      });
    } catch (err) {
      if (err !== BreakException) {
        throw err;
      } else {
        return;
      }
    }

    let returnStatement = node.getFunctionReturnValue();
    if (!returnStatement) return;
    this.returnEncountered = true;
    if (
      typeof returnStatement === "string" ||
      typeof returnStatement === "number"
    ) {
      context.returnValue = returnStatement;
    } else {
      returnStatement.accept(context, this);
    }
  }

  visitFunctionCall(context: FunctionEvaluatorContext, node: Function_Call) {
    log("Visiting FunctionCall");
    let passedArgumentsRaw = node.getFunctionParams();
    let passedArguments: (string | number)[] = [];

    passedArgumentsRaw.forEach((rawVar) => {
      if (typeof rawVar === "string" || typeof rawVar === "number") {
        passedArguments.push(rawVar);
      } else if (rawVar === undefined) {
        // do nothing
      } else if (rawVar.constructor.name === "Function_Call") {
        rawVar.accept(context, this);
        passedArguments.push(context.returnValue);
      } else if (rawVar.constructor.name === "Expression") {
        rawVar.accept(context, this);
        passedArguments.push(context.returnValue);
      } else if (rawVar.constructor.name === "VariableName") {
        rawVar.accept(context, this);
        passedArguments.push(context.returnValue);
      } else {
        rawVar.accept(context, this);
        passedArguments.push(context.returnValue);
      }
    });

    let functionNode = context.functions[node.getVariableName().getName()];

    if (typeof functionNode === "function") {
      context.returnValue = functionNode(passedArguments);
    } else {
      let newContext = { ...context, passedArguments };
      let evalutor = new FunctionEvaluator();
      evalutor.visit(newContext, functionNode);

      context.returnValue = newContext.returnValue;
    }
  }

  visitFunctionCustom(context: FunctionEvaluatorContext, node: FunctionCustom) {
    log("Visiting FunctionCustom");

    try {
      this.convertFunctionArgumentsToValues(
        context,
        node.getFunctionParams() as VariableName[]
      );
    } catch (err: any) {
      let newErrString = `${err.message} at ${node
        .getFunctionName()
        .getName()}`;
      throw new FunctionEvaluatorError(newErrString);
    }

    node.getFunctionBody().accept(context, this);
  }

  visitMathExpression(context: FunctionEvaluatorContext, node: MathExpression) {
    log("Visiting MathExpression");
    // get expression val
    node.getExpression().accept(context, this);
    let return_val = context.returnValue as number;

    node.getExtendedMathExpressions().forEach((extendedMathExpression) => {
      extendedMathExpression.getExpression().accept(context, this);
      let expression_val = context.returnValue as number;
      let operator = extendedMathExpression.getMathOp().getOperation();

      if (operator === "-") {
        return_val = return_val - expression_val;
      } else if (operator === "*") {
        return_val = return_val * expression_val;
      } else if (operator === "/") {
        return_val = return_val / expression_val;
      } else {
        return_val = return_val + expression_val;
      }
    });
    context.returnValue = return_val;
  }

  visitVariableAssignment(
    context: FunctionEvaluatorContext,
    node: VariableAssignment
  ) {
    let variableName = node.getVariableName().getName();

    // determine if variable is a local one
    if (context.globalVars[variableName] !== undefined) {
      let variableAssignedValue = node.getVariableAssignedValue();
      if (
        typeof variableAssignedValue === "string" ||
        typeof variableAssignedValue === "number"
      ) {
        context.globalVars[variableName] = variableAssignedValue;
      } else {
        variableAssignedValue?.accept(context, this);
        context.globalVars[variableName] = context.returnValue;
      }
    } else {
      let variableAssignedValue = node.getVariableAssignedValue();
      if (
        typeof variableAssignedValue === "string" ||
        typeof variableAssignedValue === "number"
      ) {
        context.vars[variableName] = variableAssignedValue;
      } else {
        variableAssignedValue?.accept(context, this);
        context.vars[variableName] = context.returnValue;
      }
    }
  }

  visitVariableName(context: FunctionEvaluatorContext, node: VariableName) {
    log("Visiting VariableName: ", node);
    // determine if need to return local or global variable

    if (context.vars[node.getName()] !== undefined) {
      context.returnValue = context.vars[node.getName()];
    } else {
      context.returnValue = context.globalVars[node.getName()];
    }

    if (context.returnValue === undefined) {
      throw new FunctionEvaluatorError(
        `Variable not defined: ${node.getName()}`
      );
    }
  }

  // Converts the passed variable names or function calls to values, and adds them to the vars context
  convertFunctionArgumentsToValues(
    context: FunctionEvaluatorContext,
    parameterNames: VariableName[]
  ) {
    log("convertFunctionArgumentsToValues: ", context.passedArguments);

    const passedArgumentsLength = context.passedArguments?.length || 0;
    if (passedArgumentsLength !== parameterNames.length) {
      throw new FunctionEvaluatorError(
        "Incorrect number of arguments passed to function"
      );
    }

    context.passedArguments?.forEach((variable, index: number) => {
      // parameterNames[index].accept(context, this);
      let argumentName = parameterNames[index].getName();
      if (typeof variable === "string" || typeof variable === "number") {
        context.vars[argumentName] = variable;
      } else {
        variable.accept(context, this);
        context.vars[argumentName] = context.returnValue;
      }
    });
  }
}
