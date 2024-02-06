import {Node} from "../Abstract/Node";
import {Visitor} from "../Interfaces/Visitor";

export class Label_Field extends Node {
    label: string | undefined;

    constructor(str: string | undefined) {
        super();
        this.label = str;
    }

    getLabel(): string | undefined {
        return this.label;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}