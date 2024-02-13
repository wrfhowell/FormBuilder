import { Visitor } from "../Interfaces/Visitor";
import { Expression, Node, VariableName } from "../export";
import { FormStateAccess } from "./FormStateAccess";
import { Function_Body } from "./Function_Body";
import { Function_Call } from "./Function_Call";
import { StaticFunction } from "./StaticFunction";
export class FunctionCustom extends Node {
	private functionParameters: (
		| string
		| number
		| Expression
		| VariableName
		| StaticFunction
		| Function_Call
		| FormStateAccess
		| undefined
	)[];
	private functionBody: Function_Body;
	constructor(
		functionParameters: (
			| string
			| number
			| Expression
			| VariableName
			| StaticFunction
			| Function_Call
			| FormStateAccess
			| undefined
		)[],
		functionBody: Function_Body
	) {
		super();
		this.functionParameters = functionParameters;
		this.functionBody = functionBody;
	}

	getFunctionParams(): (
		| string
		| number
		| Expression
		| VariableName
		| StaticFunction
		| Function_Call
		| FormStateAccess
		| undefined
	)[] {
		return this.functionParameters;
	}

	getFunctionBody(): Function_Body {
		return this.functionBody;
	}

	accept<C, T>(context: C, v: Visitor<C, T>): T {
		return v.visit(context, this);
	}
}
