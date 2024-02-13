import {Visitor} from "../Interfaces/Visitor";
import {Expression, Node, VariableName} from "../export";
import {Conditional} from "./Conditional";
import {StaticFunction} from "./StaticFunction";
export class Cond_Body extends Node {
    private statements: (Conditional | Expression | StaticFunction | undefined)[];
    private returnValueIf: VariableName | string | number | Expression | undefined;

    constructor(statements: (Conditional | Expression | StaticFunction | undefined)[],
                returnValueIf: VariableName | string | number | Expression | undefined) {
        super();
        this.statements = statements;
        this.returnValueIf = returnValueIf
    }

    getStatements(): (Conditional | Expression | StaticFunction | undefined)[] {
        return this.statements;
    }

    getReturnValue() {
        return this.returnValueIf;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}
