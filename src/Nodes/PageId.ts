import { Node, Visitor } from "../export";

export class PageId extends Node {
  id: string;

  constructor(str: string) {
    super();
    this.id = str;
  }

  toString(): string {
    return this.id;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
