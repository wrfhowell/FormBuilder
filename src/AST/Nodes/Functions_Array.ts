import {Visitor} from "../Interfaces/Visitor";
import {Node} from "../export";
import {FunctionCustom} from "./FunctionCustom";
export class Functions_Array extends Node {
    private functionsArray: FunctionCustom[];

    constructor(functionsArray: FunctionCustom[]) {
        super();
        this.functionsArray = functionsArray;
    }

    getQuestionList(): FunctionCustom[] {
        return this.functionsArray;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}
