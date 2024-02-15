import { Node } from "../Abstract/Node";
import { Visitor } from "../Interfaces/Visitor";
import { ExtendedMathExpression } from "./ExtendedMathExpression";
import { Expression } from "./Expression";

export class MathExpression extends Node {
  private expression: Expression;
  private extendedMathExpressions: ExtendedMathExpression[];

  constructor({
    expression,
    extendedMathExpressions,
  }: {
    expression: Expression;
    extendedMathExpressions: ExtendedMathExpression[];
  }) {
    super();
    this.expression = expression;
    this.extendedMathExpressions = extendedMathExpressions;
  }

  getExpression() {
    return this.expression;
  }

  getExtendedMathExpressions() {
    return this.extendedMathExpressions;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
