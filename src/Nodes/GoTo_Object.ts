import {Go_Object} from "./Go_Object";
import {Visitor} from "../Interfaces/Visitor";

export class GoTo_Object extends Node {
    ifStatementValue: string | undefined;
    goObjectList: Go_Object[]

    constructor(str: string | undefined, goObjectList: Go_Object[]) {
        super();
        this.ifStatementValue = str;
        this.goObjectList = goObjectList;
    }

    getIfStatementValue(): string | undefined {
        return this.ifStatementValue;
    }

    getGo_Object(): Go_Object[] {
        return this.goObjectList;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }

}