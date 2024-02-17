import {Visitor} from "../Interfaces/Visitor";
import {Node, VariableName} from "../export";
import {Function_Body} from "./Function_Body";
import {Function_Call} from "./Function_Call";
export class Else_If_Cond extends Node {
    private condition: Function_Call | VariableName;
    private functionBody: Function_Body;

    constructor(condition: Function_Call | VariableName, functionBody: Function_Body) {
        super();
        this.condition = condition;
        this.functionBody = functionBody;
    }

    getCondition() {
        return this.condition;
    }

    getCondBody() {
        return this.functionBody;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}
