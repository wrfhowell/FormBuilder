import { Visitor } from "../export";
import { FunctionCustom } from "../Nodes/FunctionCustom";

interface FunctionEvaluatorContext {
  [key: string]: string | number;
}

export class FunctionEvaluator implements Visitor<{}, any> {
  private jumpTable: any;

  constructor() {
    this.visitFunctionCustom = this.visitFunctionCustom.bind(this);
  }

  visit(context: {}, node: any) {
    const nodeType = node.constructor.name;
    const visitMethod = this.jumpTable[nodeType];
    if (visitMethod) {
      return visitMethod(context, node);
    } else {
      console.error(`No visit method defined for node type: ${nodeType}`);
      return null;
    }
  }

  visitFunctionCustom(context: FunctionEvaluatorContext, page: FunctionCustom) {
    console.log("Visiting this custom function!");
  }
}
