import {Node} from "../export";
import {Visitor} from "../Interfaces/Visitor";
import {StringExpression} from "./StringExpression";
import {MathExpression} from "./MathExpression";
import {BooleanExpression} from "./BooleanExpression";

export class UnscopedExpression extends Node {
    private unscopedExpression: StringExpression | MathExpression | BooleanExpression;
    private unscopedExpressionString: string;
    constructor(unscopedExpression: StringExpression | MathExpression | BooleanExpression,
                unscopedExpressionString: string) {
        super();
        this.unscopedExpression = unscopedExpression;
        this.unscopedExpressionString = unscopedExpressionString;
    }

    getExpression() {
        return this.unscopedExpression;
    }

    getExpressionString() {
        return this.unscopedExpressionString;
    }


    accept <C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }

}