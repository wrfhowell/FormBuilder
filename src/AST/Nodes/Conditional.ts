import { Visitor } from "../Interfaces/Visitor";
import { Node } from "../export";
import { Cond_Body } from "./Cond_Body";
import { Else_If_Cond } from "./Else_If_Cond";
import { If_Cond } from "./If_Cond";
export class Conditional extends Node {
	private ifCond: If_Cond;
	private elseIfCond: Else_If_Cond[];
	private elseCond: Cond_Body | undefined;

	constructor(
		ifCond: If_Cond,
		elseIfCond: Else_If_Cond[],
		elseCond: Cond_Body
	) {
		super();
		this.ifCond = ifCond;
		this.elseIfCond = elseIfCond;
		this.elseCond = elseCond;
	}

	getIfCond() {
		return this.ifCond;
	}

	getElseIfCond() {
		return this.elseIfCond;
	}

	getElseCond() {
		return this.elseCond;
	}

	accept<C, T>(context: C, v: Visitor<C, T>): T {
		return v.visit(context, this);
	}
}
