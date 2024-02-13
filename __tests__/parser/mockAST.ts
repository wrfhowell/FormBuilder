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

const globalVariables = new VariablesArray([new Variable("whatAreYouAns", new FormState("classification-pg","what-are-you")),
    new Variable("whatMetalAreYouAns", new FormState("metal-pg","what-are-you")),
    new Variable("whatNonMetalAreYou", new FormState("nonmetal-pg","what-are-you"))]);

const classificationQuestionOptions = new Options([
    new Option("Metal"),
    new Option("Nonmetal"),
    new Option("Metalloid")
]);

const metalQuestionOptions = new Options([
    new Option("Alkali Metal"),
    new Option("Alkaline Earth Metal"),
    new Option("Transition Metal"),
    new Option("Post-Transition Metal"),
    new Option("Lanthanide"),
    new Option("Actinide")
]);

const nonmetalQuestionOptions = new Options([
    new Option("Reactive Nonmetal"),
    new Option("Noble Gas")
]);

const classificationQuestion = new Question(
    "what are you",
    "radio",
    "What are you?",
    classificationQuestionOptions,
    undefined,
    undefined,
    undefined,
    true,
    undefined,
    undefined
);

const metalQuestion = new Question(
    "what are you",
    "radio",
    "What are you?",
    classificationQuestionOptions,
    undefined,
    undefined,
    undefined,
    true,
    undefined,
    undefined
);

const nonMetalQuestion = new Question(
    "what are you",
    "radio",
    "What are you?",
    classificationQuestionOptions,
    undefined,
    undefined,
    undefined,
    true,
    undefined,
    undefined
);

const classificationQuestionsArray = new Question_Array([classificationQuestion]);
const metalQuestionsArray = new Question_Array([metalQuestion]);
const nonMetalQuestionsArray = new Question_Array([nonMetalQuestion]);

const goToClassificationNext = new GoTo_Object(undefined, { next: "end" });
const goToMetalNext = new GoTo_Object(undefined, { next: "end" });
const goToNonMetalNext = new GoTo_Object(undefined, { next: "end" });

const page = new Page(
    "page1",
    goTo,
    undefined,
    undefined,
    true,
    questionsArray,
    undefined
);

const pages = new Pages([page]);

export const baseProgram = new Program(pages, globalVariables);

export const metalsProgram = new Program(pages,globalVariables)