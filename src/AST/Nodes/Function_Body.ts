import { Visitor } from "../Interfaces/Visitor";
import { ArrayCustom, Expression, Node, VariableName } from "../export";
import { Conditional } from "./Conditional";
import { Function_Call } from "./Function_Call";
import {VariableAssignment} from "./VariableAssignment";
export class Function_Body extends Node {
	//TODO: Adjust statements
	private statements: (Conditional | Expression | VariableAssignment | undefined)[];
	private returnValueFunction:
		string
		| number
		| VariableName
		| Expression
		| Function_Call
		| ArrayCustom
		| undefined;

	constructor(
		statements: (Conditional | Expression | VariableAssignment | undefined)[],
		returnValueFunction:
			| string
			| number
			| VariableName
			| Expression
			| Function_Call
			| ArrayCustom
			| undefined
	) {
		super();
		this.statements = statements;
		this.returnValueFunction = returnValueFunction;
	}

	getStatements() {
		return this.statements;
	}

	getFunctionReturnValue() {
		return this.returnValueFunction;
	}

	accept<C, T>(context: C, v: Visitor<C, T>): T {
		return v.visit(context, this);
	}
}
