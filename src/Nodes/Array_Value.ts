import {Node} from "../Abstract/Node";
import {Visitor} from "../Interfaces/Visitor";

export class Array_Value extends Node {
    arrayValue: string | number | undefined;

    constructor(arrayValue: string | number | undefined) {
        super();
        this.arrayValue = arrayValue;
    }

    getArrayValue(): string | number | undefined {
        return this.arrayValue;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }


}