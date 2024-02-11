import { Node, Visitor } from "../export";
import { Expression } from "./Expression";
import { GoTo_Object } from "./GoTo_Object";
import { Question_Array } from "./Question_Array";
import { VariableName } from "./VariableName";
import { VariablesArray } from "./VariablesArray";

export class Page extends Node {
	private id: string;
	private goTo: GoTo_Object;
	private header: string | Expression | VariableName | undefined;
	private instructions: string | Expression | VariableName | undefined;
	private displayQuestions: boolean | undefined;
	private questions: Question_Array;
	private pageVariables: VariablesArray | undefined;

	constructor(
		id: string,
		goTo: GoTo_Object,
		header: string | Expression | VariableName | undefined,
		instructions: string | Expression | VariableName | undefined,
		displayQuestions: boolean | undefined,
		questions: Question_Array,
		pageVariables: VariablesArray | undefined
	) {
		super();
		this.id = id;
		this.goTo = goTo;
		this.header = header;
		this.instructions = instructions;
		this.displayQuestions = displayQuestions;
		this.questions = questions;
		this.pageVariables = pageVariables;
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

	getPageVariables() {
		return this.pageVariables;
	}

	accept<C, T>(context: C, v: Visitor<C, T>): T {
		return v.visit(context, this);
	}
}
