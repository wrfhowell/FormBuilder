import {Visitor} from "../Interfaces/Visitor";
import {Question} from "./Question";
import {Node} from "../export";
export class Question_Array extends Node {
    private questionList: Question[];

    constructor(questionList: Question[]) {
        super();
        this.questionList = questionList;
    }

    getQuestionList(): Question[] {
        return this.questionList;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }
}
