import { Node, Visitor, Pages } from "../export";
import {Variable} from "./Variable";

export class Program extends Node {
  private pages: Pages;
  private variables: Variable[]


  constructor(pages: Pages, variables: Variable[]) {
    super();
    this.pages = pages;
    this.variables = variables;
  }

  getPages(): Pages {
    return this.pages;
  }

  getVariables(): Variable[] {
    return this.variables;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
