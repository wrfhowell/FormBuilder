import { Node, Visitor } from "../export";
import { Expression } from "./Expression";
import { Function_Call } from "./Function_Call";
import { Question_Array } from "./Question_Array";
import { VariableName } from "./VariableName";

export class Page extends Node {
	private id: string | VariableName | Function_Call | undefined;
	private goTo: string | VariableName | Function_Call | undefined;
	private header: string | VariableName | Function_Call | undefined;
	private instructions: string | VariableName | Function_Call | undefined
	private displayQuestions: string | number | undefined;
	private questions: Question_Array | undefined;

	constructor(
		id: string | VariableName | Function_Call | undefined,
		goTo: string | VariableName | Function_Call | undefined,
		header: string | VariableName | Function_Call | undefined,
		instructions: string | VariableName | Function_Call | undefined,
		displayQuestions: string | number | undefined,
		questions: Question_Array | undefined
	) {
		super();
		this.id = id;
		this.goTo = goTo;
		this.header = header;
		this.instructions = instructions;
		this.displayQuestions = displayQuestions;
		this.questions = questions;
	}

	getId() {
		return this.id;
	}

	getGoToObject() {
		return this.goTo;
	}

	getHeader() {
		return this.header;
	}

	getInstructions() {
		return this.instructions;
	}

	shouldDisplayQuestions() {
		return this.displayQuestions;
	}

	getQuestionArray() {
		return this.questions;
	}

	accept<C, T>(context: C, v: Visitor<C, T>): T {
		return v.visit(context, this);
	}
}
