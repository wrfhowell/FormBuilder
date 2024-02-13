import {Visitor} from "../Interfaces/Visitor";
import {Question} from "./Question";
import {ArrayCustom, Expression, Node, VariableName} from "../export";
import {Conditional} from "./Conditional";
import {StaticFunction} from "./StaticFunction";
import {Function_Call} from "./Function_Call";
import {FormStateAccess} from "./FormStateAccess";
export class Function_Body extends Node {
    private statements: (Conditional | Expression | StaticFunction | undefined)[];
    private returnValueFunction: string | number | VariableName | Expression | StaticFunction | Function_Call |
    FormStateAccess | ArrayCustom | undefined;

    constructor(statements: (Conditional | Expression | StaticFunction | undefined)[], returnValueFunction: string |
        number | VariableName | Expression | StaticFunction | Function_Call |
        FormStateAccess | ArrayCustom | undefined) {
        super();
        this.statements = statements;
        this.returnValueFunction = returnValueFunction;
    }

    getStatements(): (Conditional | Expression | StaticFunction | undefined)[] {
        return this.statements;
    }

    getFunctionReturnValue(): string | number | VariableName | Expression | StaticFunction | Function_Call |
    FormStateAccess | ArrayCustom | undefined {
        return this.returnValueFunction;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}
