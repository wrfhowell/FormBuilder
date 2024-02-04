import { Node, Visitor } from "../export";

export class Program extends Node {
  statements: Node[];

  constructor() {
    super();
    this.statements = [];
  }

  addNode(node: Node) {
    this.statements.push(node);
  }

  getNodes(): Node[] {
    return this.statements;
  }

  accept<C, T>(context: C, visitor: Visitor<C, T>): T {
    return visitor.visit(context, this);
  }
}
