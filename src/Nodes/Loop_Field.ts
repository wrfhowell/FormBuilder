import {Visitor} from "../Interfaces/Visitor";
import {Node} from "../export";

export class Loop_Field extends Node {
    //TODO: Add error if loop number is a float
    loopNum: number;
    constructor(loopNum: number) {
        super();
        this.loopNum = loopNum;

    }

    getLoopNum(): number {
        return this.loopNum;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}