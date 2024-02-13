import {Visitor} from "../Interfaces/Visitor";
import {Question} from "./Question";
import {Expression, Node} from "../export";
import {Function_Body} from "./Function_Body";
import {Cond_Body} from "./Cond_Body";
export class Else_If_Cond extends Node {
    private condition: Expression;
    private functionBody: Function_Body;

    constructor(condition: Expression, functionBody: Function_Body) {
        super();
        this.condition = condition;
        this.functionBody = functionBody;
    }

    getCondition(): Expression {
        return this.condition;
    }

    getCondBody(): Function_Body {
        return this.functionBody;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}
