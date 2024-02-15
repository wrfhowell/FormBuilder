import {ArrayCustom, Expression, Node, VariableName, Visitor} from "../export";
import {Function_Call} from "./Function_Call";

export class VariableAssignment extends Node {
    private variableName: VariableName;
    private variableAssignedValue:
        string
        | number
        | VariableName
        | Expression
        | Function_Call
        | ArrayCustom
        | undefined;
    constructor(variableName: VariableName, variableAssignedValue:
        string
        | number
        | VariableName
        | Expression
        | Function_Call
        | ArrayCustom
        | undefined) {
        super();
        this.variableName = variableName;
        this.variableAssignedValue = variableAssignedValue
    }

    getVariableName() {
        return this.variableName;
    }

    getVariableAssignedValue() {
        return this.variableAssignedValue;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}
