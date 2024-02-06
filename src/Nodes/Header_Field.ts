import {Node} from "../Abstract/Node";
import {Visitor} from "../Interfaces/Visitor";

export class Header_Field extends Node {
    header: string | undefined;

    constructor(str: string | undefined) {
        super();
        this.header = str;
    }

    getHeader(): string | undefined {
        return this.header;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}