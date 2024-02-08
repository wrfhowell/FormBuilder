// Importing necessary classes
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

// Define global variables for the quiz
const globalVariables = new VariablesArray([new Variable("score", 0)]);

const questionOptions = new Options([
	new Option("10"), // Option 1
	new Option("20"), // Option 2, correct answer
	new Option("30"), // Option 3
	new Option("40"), // Option 4
]);

// Define a single multiple-choice question
const question = new Question(
	"q1", // Question ID
	"radio", // Question type
	"What is 10 + 10?", // Question label
	questionOptions, // Options
	undefined,
	undefined, // Display condition
	undefined, // No loop
	true, // Question is required
	"20", // Correct answer
	undefined // No specific variables for this question
);

const questionsArray = new Question_Array([question]);

const goTo = new GoTo_Object(undefined, { next: "end" }); // Simple navigation, go to "end

const page = new Page(
	"page1", // Page ID
	goTo, // Navigation
	undefined, // No header
	undefined, // No instructions
	true, // Display questions
	questionsArray, // Questions
	undefined // No page-specific variables
);

const pages = new Pages([page]);

const program = new Program(pages, globalVariables);
