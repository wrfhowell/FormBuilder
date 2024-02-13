import {Node} from "../export";
import {Visitor} from "../Interfaces/Visitor";
import {StringExpression} from "./StringExpression";
import {MathExpression} from "./MathExpression";
import {ScopedExpression} from "./ScopedExpression";
import {UnscopedExpression} from "./UnscopedExpression";

export class Expression extends Node {
    private expression: Number | String | ScopedExpression | UnscopedExpression;

    constructor(expression: Number | String | ScopedExpression | UnscopedExpression) {
        super();
        this.expression = expression;
    }

    get getExpression() {
        return this.expression;
    }

    accept <C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }

}