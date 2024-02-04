import { Node, Visitor } from "../export";

export class Header extends Node {
  header: string;

  constructor(str: string) {
    super();
    this.header = str;
  }

  toString(): string {
    return this.header;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
