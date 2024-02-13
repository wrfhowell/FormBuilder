import { Node } from "../Abstract/Node";
import { Visitor } from "../Interfaces/Visitor";

export class BooleanExpression extends Node {
    private booleanExpression: string;

    constructor(booleanExpression: string) {
        super();
        this.booleanExpression = booleanExpression;
    }

    getBooleanExpression() {
        return this.booleanExpression;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}
