import { Visitor } from "../Interfaces/Visitor";
import {Node, VariableName} from "../export";
import { Cond_Body } from "./Cond_Body";
import {Function_Call} from "./Function_Call";
export class If_Cond extends Node {
	private condition: VariableName | Function_Call;
	private cond_Body: Cond_Body;

	constructor(condition: VariableName | Function_Call, cond_Body: Cond_Body) {
		super();
		this.condition = condition;
		this.cond_Body = cond_Body;
	}

	getCondition() {
		return this.condition;
	}

	getCondBody() {
		return this.cond_Body;
	}

	accept<C, T>(context: C, v: Visitor<C, T>): T {
		return v.visit(context, this);
	}
}
