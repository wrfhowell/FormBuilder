import {Node, Visitor} from "../export";

export class Object_Value extends Node {
    objectValue: string | number | undefined;

    constructor(objectValue: string | number | undefined) {
        super();
        this.objectValue = objectValue;
    }

    getArrayValue(): string | number | undefined {
        return this.objectValue;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}