import {Node} from "../export";
import {Visitor} from "../Interfaces/Visitor";

export class Expression extends Node {

    accept <C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }

}