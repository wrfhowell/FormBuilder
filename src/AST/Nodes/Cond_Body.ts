import { Visitor } from "../Interfaces/Visitor";
import {ArrayCustom, Expression, Node, VariableName} from "../export";
import { Conditional } from "./Conditional";
import {VariableAssignment} from "./VariableAssignment";
import {Function_Call} from "./Function_Call";
export class Cond_Body extends Node {
	private statements: (Conditional | Expression | VariableAssignment | undefined)[];
	private returnValueIf:
		string
		| number
		| VariableName
		| Expression
		| Function_Call
		| ArrayCustom
		| undefined
	constructor(
		statements: (Conditional | Expression | VariableAssignment | undefined)[],
		returnValueIf:
			string
			| number
			| VariableName
			| Expression
			| Function_Call
			| ArrayCustom
			| undefined) {
		super();
		this.statements = statements;
		this.returnValueIf = returnValueIf;
	}

	getStatements() {
		return this.statements;
	}

	getReturnValue() {
		return this.returnValueIf;
	}

	accept<C, T>(context: C, v: Visitor<C, T>): T {
		return v.visit(context, this);
	}
}
