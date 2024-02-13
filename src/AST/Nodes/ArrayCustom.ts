import { Node } from "../Abstract/Node";
import { Visitor } from "../Interfaces/Visitor";
import { ArrayValue } from "./ArrayValue";

export class ArrayCustom extends Node {
  private arrayCustom: ArrayValue[];

  constructor(options: ArrayValue[]) {
    super();
    this.arrayCustom = options;
  }

  getOptions() {
    return this.arrayCustom;
  }
  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
