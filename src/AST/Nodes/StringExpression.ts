import { Node } from "../Abstract/Node";
import { Visitor } from "../Interfaces/Visitor";

export class StringExpression extends Node {
  private stringExpression: string;

  constructor(stringExpression: string) {
    super();
    this.stringExpression = stringExpression;
  }

  getStringExpression() {
    return this.stringExpression;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
