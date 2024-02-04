import { Visitor, Node } from "../export";

export class Instructions extends Node {
  instructions: string;

  constructor(str: string) {
    super();
    this.instructions = str;
  }

  toString(): string {
    return this.instructions;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
