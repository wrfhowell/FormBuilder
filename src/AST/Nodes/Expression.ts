import { Visitor } from "../Interfaces/Visitor";
import { Node } from "../export";
import { ScopedExpression } from "./ScopedExpression";
import { UnscopedExpression } from "./UnscopedExpression";

export class Expression extends Node {
	private expression: number | string | ScopedExpression | UnscopedExpression;

	constructor(
		expression: number | string | ScopedExpression | UnscopedExpression
	) {
		super();
		this.expression = expression;
	}

	getExpression() {
		return this.expression;
	}

	accept<C, T>(context: C, v: Visitor<C, T>): T {
		return v.visit(context, this);
	}
}
