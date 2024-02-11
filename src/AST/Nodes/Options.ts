import { Node } from "../Abstract/Node";
import { Visitor } from "../Interfaces/Visitor";
import { Option } from "./Option";

export class Options extends Node {
  private options: Option[];

  constructor(options: Option[]) {
    super();
    this.options = options;
  }

  getOptions() {
    return this.options;
  }
  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
