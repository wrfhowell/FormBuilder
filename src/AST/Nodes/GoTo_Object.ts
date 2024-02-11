import { Node } from "../Abstract/Node";
import { Visitor } from "../Interfaces/Visitor";

export class GoTo_Object extends Node {
  ifStatementValue: string | undefined;
  goOptions: { [key: string]: string };

  constructor(str: string | undefined, goOptions: { [p: string]: string }) {
    super();
    this.ifStatementValue = str;
    this.goOptions = goOptions;
  }

  getIfStatementValue(): string | undefined {
    return this.ifStatementValue;
  }

  getGoOptions(): { [key: string]: string } {
    return this.goOptions;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
