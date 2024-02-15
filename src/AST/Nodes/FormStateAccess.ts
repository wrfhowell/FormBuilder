import { Node } from "../Abstract/Node";
import { Visitor } from "../Interfaces/Visitor";

export class FormStateAccess extends Node {
	private pageId: string;
	private questionId: string;

	constructor(pageId: string, questionId: string) {
		super();
		this.pageId = pageId;
		this.questionId = questionId;
	}

	getPageId() {
		return this.pageId;
	}

	getQuestionId() {
		return this.questionId;
	}

	accept<C, T>(context: C, v: Visitor<C, T>): T {
		return v.visit(context, this);
	}
}
