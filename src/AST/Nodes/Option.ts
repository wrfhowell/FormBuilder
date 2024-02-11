import { Node } from "../Abstract/Node";
import { Visitor } from "../Interfaces/Visitor";

export class Option extends Node {
  //TODO: This means the array can have a mix of type string, or number.
  // Up to Evaluator to see what to do if it returns an undefined value
  private option: string | number | undefined;

  constructor(option: string | number | undefined) {
    super();
    this.option = option;
  }

  getOption() {
    return this.option;
  }
  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
