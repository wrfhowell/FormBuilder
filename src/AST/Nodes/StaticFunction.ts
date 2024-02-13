import { Node } from "../Abstract/Node";
import { Visitor } from "../Interfaces/Visitor";
import {Expression} from "./Expression";
import {VariableName} from "./VariableName";
import {Function_Call} from "./Function_Call";
import {FormStateAccess} from "./FormStateAccess";

export class StaticFunction extends Node {
    private staticFormName: string;
    private functionParams: (string | number | Expression | VariableName | StaticFunction |
        Function_Call | FormStateAccess | undefined)[]

    constructor(staticFormName: string, functionParams: (string | number | Expression | VariableName | StaticFunction |
        Function_Call | FormStateAccess | undefined)[]) {
        super();
        this.staticFormName = staticFormName;
        this.functionParams = functionParams
    }

    getStaticFormName(): string {
        return this.staticFormName;
    }

    getFunctionParams(): (string | number | Expression | VariableName | StaticFunction |
        Function_Call | FormStateAccess | undefined)[] {
        return this.functionParams;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}
