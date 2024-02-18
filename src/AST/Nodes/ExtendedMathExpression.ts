import { Node } from "../Abstract/Node";
import { Visitor } from "../Interfaces/Visitor";
import { Expression } from "./Expression";
import { MathOp } from "./MathOp";

export class ExtendedMathExpression extends Node {
  private mathOp: MathOp;
  private expression: Expression;

  constructor(mathOp: MathOp, expression: Expression) {
    super();
    this.mathOp = mathOp;
    this.expression = expression;
  }

  getMathOp() {
    return this.mathOp;
  }

  getExpression() {
    return this.expression;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
