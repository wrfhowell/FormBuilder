import { Node, Visitor, Pages } from "../export";
import {VariablesArray} from "./VariablesArray";
import {Functions_Array} from "./Functions_Array";

export class Program extends Node {
  private pages: Pages;
  private functionsArray: Functions_Array | undefined;
  private globalvariables: VariablesArray | undefined;


  constructor(pages: Pages, functionsArray: Functions_Array | undefined, globalvariables: VariablesArray | undefined) {
    super();
    this.pages = pages;
    this.functionsArray = functionsArray;
    this.globalvariables = globalvariables;
  }

  getPages(): Pages {
    return this.pages;
  }

  getFunctionsArray(): Functions_Array | undefined {
    return this.functionsArray;
  }

  getGlobalVariables(): VariablesArray | undefined {
    return this.globalvariables;
  }

  accept<C, T>(context: C, v: Visitor<C, T>): T {
    return v.visit(context, this);
  }
}
