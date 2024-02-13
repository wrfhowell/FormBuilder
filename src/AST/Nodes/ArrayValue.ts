import { Node } from "../Abstract/Node";
import { Visitor } from "../Interfaces/Visitor";
import {VariableName} from "./VariableName";

export class ArrayValue extends Node {
  //TODO: This means the array can have a mix of type string, or number.
  // Up to Evaluator to see what to do if it returns an undefined value
  private value: string | number | VariableName | undefined;

  constructor(option: string | number | VariableName | undefined) {
    super();
    this.value = option;
  }

  getValue(): string | number | VariableName | undefined {
    return this.value;
  }
  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
