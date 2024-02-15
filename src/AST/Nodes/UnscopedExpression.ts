import { Visitor } from "../Interfaces/Visitor";
import { Node } from "../export";
import { BooleanExpression } from "./BooleanExpression";
import { MathExpression } from "./MathExpression";
import { StringExpression } from "./StringExpression";

export class UnscopedExpression extends Node {
	private unscopedExpression:
		| StringExpression
		| MathExpression
		| BooleanExpression;
	private unscopedExpressionString: string;
	constructor(
		unscopedExpression: StringExpression | MathExpression | BooleanExpression,
		unscopedExpressionString: string
	) {
		super();
		this.unscopedExpression = unscopedExpression;
		this.unscopedExpressionString = unscopedExpressionString;
	}

	getExpression() {
		return this.unscopedExpression;
	}

	getExpressionString() {
		return this.unscopedExpressionString;
	}

	accept<C, T>(context: C, v: Visitor<C, T>): T {
		return v.visit(context, this);
	}
}
