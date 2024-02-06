import {Node, Visitor} from "../export";

export class Go_Object extends Node {
    pageDirectURLList: String[]

    constructor(pageDirectURLList: String[]) {
        super();
        this.pageDirectURLList = pageDirectURLList;
    }

    getPageDirectURLList(): String[] {
        return this.pageDirectURLList;
    }
    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }

}