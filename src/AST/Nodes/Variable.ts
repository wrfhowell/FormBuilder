import {ArrayCustom, Expression, Node, Visitor} from "../export";
import {Regex} from "./Regex";
import {VariableName} from "./VariableName";
import {FormStateAccess} from "./FormStateAccess";
import {StaticFunction} from "./StaticFunction";
import {Function_Call} from "./Function_Call";

export class Variable extends Node {
    private variable: { [id: string]:  ArrayCustom | number | string | Regex |
            FormStateAccess | StaticFunction | Expression | Function_Call | undefined }
    private variableName: string;
    private variableNameObject: VariableName;
    private variableValue: ArrayCustom | number | string | Regex |
        FormStateAccess | StaticFunction | Expression | Function_Call | undefined;

    constructor(variableName: string,
                variableValue: ArrayCustom | number | string | Regex |
                    FormStateAccess | StaticFunction | Expression | Function_Call | undefined) {
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