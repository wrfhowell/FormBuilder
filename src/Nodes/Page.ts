import {Header_Field, Id_Field, Instructions_Field, Node, Visitor} from "../export";
import {GoTo_Object} from "./GoTo_Object";
import {Question_Array} from "./Question_Array";

export class Page extends Node {
    private id: Id_Field
    private goTo: GoTo_Object
    private header: Header_Field
    private instructions: Instructions_Field
    private questions: Question_Array

    constructor(id: Id_Field, goTo: GoTo_Object, header: Header_Field, instructions: Instructions_Field, questions: Question_Array) {
        super();
        this.id = id;
        this.goTo = goTo;
        this.header = header;
        this.instructions = instructions;
        this.questions = questions;
    }

    getId() {
        return this.id;
    }

    getGoToObject() {
        return this.goTo;
    }

    getHeader() {
        return this.header;
    }

    getInstructions() {
        return this.instructions;
    }

    getQuestionArray() {
        return this.questions;
    }

    accept<C, T>(context: C, v: Visitor<C, T>): T {
        return v.visit(context, this);
    }

}
