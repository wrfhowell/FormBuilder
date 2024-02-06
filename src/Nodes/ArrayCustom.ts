import {Node, Visitor} from "../export";
import {Array_Value} from "./Array_Value";

export class ArrayCustom extends Node {
    private arrayList: Array_Value[];

    constructor(arrayList: Array_Value[]) {
        super();
        this.arrayList = arrayList;
    }

    getArray(): Array_Value[] {
        return this.arrayList;
    }
    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}