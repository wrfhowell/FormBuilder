import { Node, Visitor } from "../export";

export class Page extends Node {
  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
