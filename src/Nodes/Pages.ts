import { Node, Visitor } from "../export";
import {Page_Array} from "./Page_Array";

export class Pages extends Node {
  private page_Array: Page_Array;

  constructor(page_Array: Page_Array) {
    super();
    this.page_Array = page_Array;
  }

  getPageArray() {
    return this.page_Array;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
