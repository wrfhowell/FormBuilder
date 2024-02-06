import { Node, Visitor, Pages } from "../export";

export class Variable extends Node {
    //TODO: Should this class be a page fields or a different variables
    // class or a child of node? Should we make a different variable type for page fields?
    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }

}