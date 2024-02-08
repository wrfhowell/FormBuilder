import { Node, Visitor } from "../export";
import {Variable} from "./Variable";

export class VariablesArray extends Node {
    private variableList: Variable[]

    constructor(variableList: Variable[]) {
        super();
        this.variableList = variableList;
    }

    getVariableList() {
        return this.variableList;
    }
    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }

}