import {Node} from "../export";
import {Visitor} from "../Interfaces/Visitor";
import {StringExpression} from "./StringExpression";
import {MathExpression} from "./MathExpression";

export class Expression extends Node {
    private expression: StringExpression | MathExpression;

    constructor(expression: StringExpression | MathExpression) {
        super();
        this.expression = expression;
    }

    get getExpression() {
        return this.getExpression;
    }

    accept <C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }

}