import {Expression, Node} from "../export";
import {Visitor} from "../Interfaces/Visitor";
import {StringExpression} from "./StringExpression";
import {MathExpression} from "./MathExpression";
import {BooleanExpression} from "./BooleanExpression";
import {UnscopedExpression} from "./UnscopedExpression";

export class ScopedExpression extends Node {
    private firstScopedExpression: ScopedExpression | UnscopedExpression;
    private extendedScopedExpression: { [operator: string]: Expression}

    constructor(firstScopedExpression: ScopedExpression | UnscopedExpression,
                extendedScopedExpression: { [operator: string]: Expression}) {
        super();
        this.firstScopedExpression = firstScopedExpression
        this.extendedScopedExpression = extendedScopedExpression;
    }

    getFirstScopedExpression() {
        return this.firstScopedExpression;
    }

    getExtendedScopedExpression() {
        return this.extendedScopedExpression;
    }


    accept <C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }

}