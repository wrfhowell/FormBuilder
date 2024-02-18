import { MathExpression, Visitor } from "../export";
import { Function_Body } from "../Nodes/Function_Body";
import { Function_Call } from "../Nodes/Function_Call";
import { FunctionCustom } from "../Nodes/FunctionCustom";
import { VariableName } from "../Nodes/VariableName";
import { Expression } from "../Nodes/Expression";
import { FormStateAccess } from "../Nodes/FormStateAccess";
import { VariableAssignment } from "../Nodes/VariableAssignment";
import { Conditional } from "../Nodes/Conditional";

export interface VarsContext {
  [key: string]: string | number;
}

export interface FunctionsContext {
  [key: string]: FunctionCustom | ((args: any[]) => any);
}

export interface FunctionEvaluatorContext {
  vars: VarsContext;
  functions: FunctionsContext;
  returnValue: any;
  passedArguments?: (string | number | Function_Call)[];
}

export class FunctionEvaluator implements Visitor<{}, any> {
  private jumpTable: any;
  private argumentAssignment: { [key: string]: string | number } = {};
  private evaluatedArguments: (string | number)[] = [];

  constructor() {
    this.visitExpression = this.visitExpression.bind(this);
    this.visitFunctionCustom = this.visitFunctionCustom.bind(this);
    this.visitFunctionBody = this.visitFunctionBody.bind(this);
    this.visitFunctionCall = this.visitFunctionCall.bind(this);
    this.visitMathExpression = this.visitMathExpression.bind(this);
    this.visitString = this.visitString.bind(this);
    this.visitNumber = this.visitNumber.bind(this);
    this.visitVariableAssignment = this.visitVariableAssignment.bind(this);
    this.visitVariableName = this.visitVariableName.bind(this);
    this.visitConditional = this.visitConditional.bind(this);

    this.jumpTable = {
      Conditional: this.visitConditional,
      Expression: this.visitExpression,
      Function_Call: this.visitFunctionCall,
      FunctionCustom: this.visitFunctionCustom,
      Function_Body: this.visitFunctionBody,
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
    console.log("Visiting conditional");
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

    node.getStatements().forEach((statement) => {
      statement?.accept(context, this);
    });

    let returnStatement = node.getFunctionReturnValue();
    if (!returnStatement) return;
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
        // FormStateAccess
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
