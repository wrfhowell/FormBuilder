import { Node, Visitor, Pages } from "../export";
import {VariablesArray} from "./VariablesArray";

export class Program extends Node {
  private pages: Pages;
  private globalvariables: VariablesArray | undefined;


  constructor(pages: Pages, globalvariables: VariablesArray | undefined) {
    super();
    this.pages = pages;
    this.globalvariables = globalvariables;
  }

  getPages(): Pages {
    return this.pages;
  }

  getGlobalVariables(): VariablesArray | undefined {
    return this.globalvariables;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
