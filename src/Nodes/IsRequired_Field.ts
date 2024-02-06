import {Node} from "../Abstract/Node";
import {Visitor} from "../Interfaces/Visitor";

export class IsRequired_Field extends Node {
    private isRequired: Boolean

    constructor(isRequired: Boolean) {
        super();
        this.isRequired = isRequired
    }

    isRequired() {
        return this.isRequired;
    }
    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}