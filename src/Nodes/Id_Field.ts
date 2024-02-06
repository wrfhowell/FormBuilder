import {Node, Questions_Field, Visitor} from "../export";

export class Id_Field extends Node {
  id: string;
  constructor(str: string) {
    super();
    this.id = str;
  }

  getIdValue(): string {
    return this.id;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
