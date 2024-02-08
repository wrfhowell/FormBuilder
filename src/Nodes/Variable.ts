import { Node, Visitor } from "../export";
import {Regex} from "./Regex";
import {VariableName} from "./VariableName";

export class Variable extends Node {
    private variable: { [id: string]:  (string | number | undefined)[] | number | string | Regex | undefined }
    private variableName: string;
    private variableNameObject: VariableName;
    private variableValue: (string | number | undefined)[] | number | string | Regex | undefined;

    constructor(variableName: string,
                variableValue: (string | number | undefined)[] | number | string | Regex | undefined) {
        super();
        this.variableName = variableName;
        this.variableValue = variableValue;
        this.variableNameObject = new VariableName(variableName);
        this.variable = {};
        this.variable[variableName] = variableValue;
    }

    getVariable() {
        return this.variable;
    }

    getVariableNameObject() {
        return this.variableNameObject;
    }

    getVariableName() {
        return this.variableName
    }

    getVariableValue() {
        return this.variableValue;
    }


    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }

}