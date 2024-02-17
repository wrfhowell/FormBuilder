import { Node } from "../Abstract/Node";
import { Visitor } from "../Interfaces/Visitor";

export class MathOp extends Node {
  private operation: string;

  constructor(operation: string) {
    super();
    this.operation = operation;
  }

  getOperation() {
    return this.operation;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
