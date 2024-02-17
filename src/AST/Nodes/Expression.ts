import { Visitor } from "../Interfaces/Visitor";
import {MathExpression, Node, VariableName} from "../export";

export class Expression extends Node {
	private expression: number | VariableName | MathExpression;

	constructor(
		expression: number | VariableName | MathExpression
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
