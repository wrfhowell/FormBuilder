import { Node, Visitor } from "../export";

import { ArrayCustom } from "./ArrayCustom";
import { Function_Call } from "./Function_Call";
import { VariableName } from "./VariableName";
import { VariablesArray } from "./VariablesArray";

export class Question extends Node {
	private id: string | VariableName | Function_Call | undefined;
	private type: string | undefined;
	private label: string | VariableName | Function_Call | undefined;
	private options: VariableName | Function_Call | ArrayCustom;
	private dependsOn: string | undefined;
	private displayIf: string | undefined;
	private loop: number | undefined;
	private isRequired: boolean | undefined;
	private correctAnswer:
		| string
		| number
		| VariableName
		| Function_Call
		| undefined;
	private questionVariables: VariablesArray | undefined;

	constructor(
		id: string | VariableName | Function_Call | undefined,
		type: string | undefined,
		label:string | VariableName | Function_Call | undefined,
		options: VariableName | Function_Call | ArrayCustom,
		dependsOn: string | undefined,
		displayIf: string | undefined,
		loop: number | undefined,
		isRequired: boolean | undefined,
		correctAnswer:
			| string
			| number
			| VariableName
			| Function_Call
			| undefined,
		questionVariables: VariablesArray | undefined
	) {
		super();
		this.id = id;
		this.type = type;
		this.label = label;
		this.options = options;
		this.dependsOn = dependsOn;
		this.displayIf = displayIf;
		this.loop = loop;
		this.isRequired = isRequired;
		this.correctAnswer = correctAnswer;
		this.questionVariables = questionVariables;
	}

	getId() {
		return this.id;
	}

	getQuestionType() {
		return this.type;
	}

	getLabel() {
		return this.label;
	}

	getOptions() {
		return this.options;
	}

	getDisplayIf() {
		return this.displayIf;
	}

	getLoop() {
		return this.loop;
	}

	isQuestionRequired() {
		return this.isRequired;
	}

	getCorrectAnswer() {
		return this.correctAnswer;
	}

	getQuestionVariables() {
		return this.questionVariables;
	}

	getDependsOn() {
		return this.dependsOn;
	}

	accept<C, T>(context: C, v: Visitor<C, T>): T {
		return v.visit(context, this);
	}
}
