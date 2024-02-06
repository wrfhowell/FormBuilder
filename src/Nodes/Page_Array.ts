import {Node} from "../Abstract/Node";
import {Visitor} from "../Interfaces/Visitor";
import {Pages} from "./Pages";
import {Page} from "./Page";

export class Page_Array extends Node {
    private pageList: Page[];

    constructor(pageList: Page[]) {
        super();
        this.pageList = pageList;
    }

    getPageList(): Page[] {
        return this.pageList;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}