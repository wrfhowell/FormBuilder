import { Visitor } from "../Interfaces/Visitor";
import { Expression, Node } from "../export";
import { Cond_Body } from "./Cond_Body";
export class If_Cond extends Node {
	private condition: Expression;
	private cond_Body: Cond_Body;

	constructor(condition: Expression, cond_Body: Cond_Body) {
		super();
		this.condition = condition;
		this.cond_Body = cond_Body;
	}

	getCondition(): Expression {
		return this.condition;
	}

	getCondBody(): Cond_Body {
		return this.cond_Body;
	}

	accept<C, T>(context: C, v: Visitor<C, T>): T {
		return v.visit(context, this);
	}
}
