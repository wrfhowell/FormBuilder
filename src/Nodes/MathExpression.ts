import {Node} from "../Abstract/Node";
import {Visitor} from "../Interfaces/Visitor";

export class MathExpression extends Node {
    private mathExpression: string;

    constructor(mathExpression: string) {
        super();
        this.mathExpression = mathExpression;
    }


    getMathExpression() {
        return this.mathExpression;
    }

    accept <C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }

}