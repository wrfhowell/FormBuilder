import { ArrayCustom, Node, Visitor } from "../export";
import { FormStateAccess } from "./FormStateAccess";
import { Function_Call } from "./Function_Call";
import { VariableName } from "./VariableName";

export class Variable extends Node {
	private variable: {
		[id: string]:
			| ArrayCustom
			| number
			| string
			| boolean
			| FormStateAccess
			| Function_Call
			| undefined;
	};
	private variableName: string;
	private variableNameObject: VariableName;
	private variableValue:
		| ArrayCustom
		| number
		| string
		| boolean
		| FormStateAccess
		| Function_Call
		| undefined;

	constructor(
		variableName: string,
		variableValue:
			| ArrayCustom
			| number
			| string
			| boolean
			| FormStateAccess
			| Function_Call
			| undefined
	) {
		super();
		this.variableName = variableName;
		this.variableValue = variableValue;
		this.variableNameObject = new VariableName(variableName);
		this.variable = {};
	}

	getVariable() {
		return this.variable;
	}

	getVariableNameObject() {
		return this.variableNameObject;
	}

	getVariableName() {
		return this.variableName;
	}

	getVariableValue() {
		return this.variableValue;
	}

	accept<C, T>(context: C, v: Visitor<C, T>): T {
		return v.visit(context, this);
	}
}
