import {Node} from "../Abstract/Node";
import {Page} from "./Page";
import {Visitor} from "../Interfaces/Visitor";

export class QuestionType_Field extends Node {
    private questionType: string

    constructor(str: string) {
        super();
        this.questionType = str;
    }

    toString(): string {
        return this.questionType;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}