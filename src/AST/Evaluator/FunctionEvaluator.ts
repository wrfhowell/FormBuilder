import { MathExpression, Visitor } from "../export";
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

export interface VarsContext {
  [key: string]: string | number;
}

export interface FunctionsContext {
  [key: string]: FunctionCustom | ((args: any[]) => any);
}

export interface FunctionEvaluatorContext {
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
    }
  }

  visitString(context: FunctionEvaluatorContext, node: any) {
    console.log("Visiting String: ", node);
    context.returnValue = node;
  }

  visitNumber(context: FunctionEvaluatorContext, node: any) {
    console.log("Visiting Number: ", node);
    context.returnValue = node;
  }

  visitConditional(context: FunctionEvaluatorContext, node: Conditional) {
    let BreakException = {};
    console.log("Visiting conditional");
    node.getIfCond().accept(context, this);
    console.log("conditional value: ", context.returnValue);
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
    console.log("Visiting Expression");
    let expression = node.getExpression();
    if (typeof expression === "number") {
      context.returnValue = expression;
    } else {
      // MathExpression or VariableName
      expression.accept(context, this);
    }
  }

  visitFunctionBody(context: FunctionEvaluatorContext, node: Function_Body) {
    console.log("Visiting FunctionBody");

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
    console.log("Visiting FunctionCall");
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
      console.log("newContext from visitFunctionCall: ", newContext);
      let evalutor = new FunctionEvaluator();
      evalutor.visit(newContext, functionNode);

      context.returnValue = newContext.returnValue;
    }
  }

  visitFunctionCustom(context: FunctionEvaluatorContext, node: FunctionCustom) {
    console.log("Visiting FunctionCustom");
    this.convertFunctionArgumentsToValues(
      context,
      node.getFunctionParams() as VariableName[]
    );

    node.getFunctionBody().accept(context, this);
  }

  visitMathExpression(context: FunctionEvaluatorContext, node: MathExpression) {
    console.log("Visiting MathExpression");
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

  visitVariableName(context: FunctionEvaluatorContext, node: VariableName) {
    console.log("Visiting VariableName");
    context.returnValue = context.vars[node.getName()];
  }

  // Converts the passed variable names or function calls to values, and adds them to the vars context
  convertFunctionArgumentsToValues(
    context: FunctionEvaluatorContext,
    parameterNames: VariableName[]
  ) {
    console.log("convertFunctionArgumentsToValues");
    context.passedArguments?.forEach((variable, index: number) => {
      parameterNames[index].accept(context, this);
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
