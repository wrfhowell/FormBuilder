import { Node, Visitor } from "../export";
import { Expression } from "./Expression";
import { Question_Array } from "./Question_Array";
import { VariableName } from "./VariableName";
import {Function_Call} from "./Function_Call";

export class Page extends Node {
	private id: string | undefined;
	private goTo: string | Function_Call | Expression | undefined;
	private header: string | Expression | VariableName | Function_Call |  undefined;
	private instructions: string | Expression | VariableName | Function_Call | undefined;
	private displayQuestions: string | number | undefined;
	private questions: Question_Array | undefined;

	constructor(
		id: string | undefined,
		goTo: string | Function_Call | Expression | undefined,
		header: string | Expression | VariableName | Function_Call | undefined,
		instructions: string | Expression | VariableName | Function_Call | undefined,
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
