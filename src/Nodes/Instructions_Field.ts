import { Visitor, Node } from "../export";

export class Instructions_Field extends Node {
  instructions: string;
  //TODO: Might need a string, expression or variable name
  constructor(str = null) {
    super();
    if (str != null && typeof str === 'string') this.instructions = str;
  }

  getInstructions(): string {
    return this.instructions;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
