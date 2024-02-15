import { Node, Visitor } from "../export";

export class VariableName extends Node {
	name: string;
	constructor(str: string) {
		super();
		this.name = str;
	}

	getName(): string {
		return this.name;
	}

	accept<C, T>(context: C, v: Visitor<C, T>): T {
		return v.visit(context, this);
	}
}
