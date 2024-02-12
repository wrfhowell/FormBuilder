import {
    GoTo_Object,
    Option,
    Options,
    Page,
    Pages,
    Program,
    Question,
    Question_Array,
    Variable,
    VariablesArray,
} from "../../src/export";

const globalVariables = new VariablesArray([new Variable("score", 0)]);

const questionOptions = new Options([
    new Option("10"),
    new Option("20"),
    new Option("30"),
    new Option("40"),
]);

const question = new Question(
    "q1",
    "radio",
    "What is 10 + 10?",
    questionOptions,
    undefined,
    undefined,
    undefined,
    true,
    "20",
    undefined
);

const questionsArray = new Question_Array([question]);

const goTo = new GoTo_Object(undefined, { next: "end" });

const page = new Page(
    "page1",
    goTo,
    undefined,
    "Please do X",
    true,
    questionsArray,
    undefined
);

const pages = new Pages([page]);

export const ProgramWithInstructions = new Program(pages, globalVariables);
