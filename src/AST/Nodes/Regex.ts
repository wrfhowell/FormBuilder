import {Node, Visitor} from "../export";

export class Regex extends Node {
    regex: string;

    constructor(str: string) {
        super();
        this.regex = str;
    }

    getRegexValue(): string {
        return this.regex;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}