import { Visitor } from "../Interfaces/Visitor";
import { Expression, Node, VariableName } from "../export";
import { FormStateAccess } from "./FormStateAccess";
export class Function_Call extends Node {
  private variableName: VariableName;
  private functionParameters: (
    | string
    | number
    | Expression
    | VariableName
    | Function_Call
    | FormStateAccess
    | undefined
  )[];

  constructor(
    variableName: VariableName,
    functionParameters: (
      | string
      | number
      | Expression
      | VariableName
      | Function_Call
      | FormStateAccess
      | undefined
    )[]
  ) {
    super();
    this.variableName = variableName;
    this.functionParameters = functionParameters;
  }

  getVariableName(): VariableName {
    return this.variableName;
  }

  getFunctionParams() {
    return this.functionParameters;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
