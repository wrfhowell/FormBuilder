import {Node} from "../Abstract/Node";
import {Visitor} from "../Interfaces/Visitor";

export class Options_Field extends Node {
    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}