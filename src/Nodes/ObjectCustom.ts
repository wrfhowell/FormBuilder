import {Node, Visitor} from "../export";
import {Array_Value} from "./Array_Value";
import {Object_Value} from "./Object_Value";

export class ObjectCustom extends Node {
    private objectList: Object_Value[];

    constructor(objectList: Object_Value[]) {
        super();
        this.objectList = objectList;
    }

    getArray(): Object_Value[] {
        return this.objectList;
    }
    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}