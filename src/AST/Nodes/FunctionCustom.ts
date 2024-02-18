import { Visitor } from "../Interfaces/Visitor";
import { Node, VariableName } from "../export";
import { FormStateAccess } from "./FormStateAccess";
import { Function_Body } from "./Function_Body";
import { Function_Call } from "./Function_Call";
export class FunctionCustom extends Node {
  private functionName: VariableName;
  private functionParameters: (
    | string
    | number
    | VariableName
    | Function_Call
    | FormStateAccess
  )[];
  private functionBody: Function_Body;
  constructor(
    functionName: VariableName,
    functionParameters: (
      | string
      | number
      | VariableName
      | Function_Call
      | FormStateAccess
    )[],
    functionBody: Function_Body
  ) {
    super();
    this.functionName = functionName;
    this.functionParameters = functionParameters;
    this.functionBody = functionBody;
  }

  getFunctionName() {
    return this.functionName;
  }

  getFunctionParams() {
    return this.functionParameters;
  }

  getFunctionBody(): Function_Body {
    return this.functionBody;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
