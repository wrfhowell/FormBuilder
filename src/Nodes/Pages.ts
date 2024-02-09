import {Node, Page, Visitor} from "../export";

export class Pages extends Node {
  private pageArray: Page[];

  constructor(pageArray: Page[]) {
    super();
    this.pageArray = pageArray;
  }

  getPageArray() {
    return this.pageArray;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
