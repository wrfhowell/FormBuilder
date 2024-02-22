import { BaseChecker } from "../../src/AST/checkers/BaseChecker";
import { readFileSync } from "fs";
import { FormGeneratorLexer } from "../../src/AST/generated/FormGeneratorLexer";
import { FormGeneratorParser } from "../../src/AST/generated/FormGeneratorParser";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeToAST } from "../../src/AST/parser/ParseTreeToAST";
import { CheckerError } from "../../src/AST/checkers/BaseChecker";
import path from "path";

describe("Base Checker Tests", () => {
  it("Should throw error due to missing page id", () => {
    const file = readFileSync(
      path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/missingPageID"),
      "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow("Page must have an ID");
  });

  it("Should throw error due to function call in function definition", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidFunctionDefinition"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Invalid function parameter.");
  });


  it("Should throw error due to undeclared var in condition", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidCondition"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Variable not declared in function parameters or global vars");
  });

  it("Should throw error due to function used as param in function definition", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidFunctionDefinition"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Invalid function parameter.");
  });

  it("Should throw error due to string used as param in function definition", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidFunctionDefinition2"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Invalid function parameter.");
  });

  it("Should throw error due to undeclared var in function return", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidFunctionReturnVal"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Variable not declared in function parameters or global vars");
  });

  it("Should throw error due to undeclared function in return", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidFunctionReturnVal2"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Condition function not declared");
  });

  it("Should throw error due to assignment of undeclared var", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidFunctionVarAssignment"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Attempting to assign value to undeclared variable");
  });

  it("Should throw error due to undeclared function in var assignment", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidFunctionVarAssignmentValue"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Condition function not declared");
  });

  it("Should throw error due to invalid goTo field", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidGoToPage"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Page GoTo must reference a valid page ID, variable name or function call");
  });

  it("Should throw error due to undeclared var in page header", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidPageHeader"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Page header making reference to undeclared variable or function call");
  });

  it("Should throw error due to undeclared function call in page instructions", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidPageInstructions"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Page instructions making reference to undeclared variable or function call");
  });

  it("Should throw error due to undeclared fun call in correctAnswer field", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidQuestionCorrectAnswer"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Question correctAnswer making reference to undeclared function");
  });

  it("Should throw error due to undeclared fun in question label", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidQuestionLabel"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Question label making reference to undeclared function");
  });

  it("Should throw error due to undeclared var in question options", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidQuestionOptions"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Question options making reference to undeclared variable");
  });

  it("Should throw error due to invalid qustion type", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidQuestionType"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Invalid question type");
  });

  it("Should throw error due to missing question id", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/missingQuestionID"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Question must have an ID");
  });

  it("Should throw error due to missing question label", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/missingQuestionLabel"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Question must have a label");
  });

  it("Should throw error due to missing question type", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/missingQuestionType"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Question must have a type");
  });

  it("Should throw error due to invalid condition in else if", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidIfElseCondition"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Variable not declared in function parameters or global vars");
  });

  it("Should throw error due to invalid return valie in cond body", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidCondReturnVal"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Condition function not declared");
  });

  it("Should throw error due to undeclared var in expression", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidExpression"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Variable not declared in function parameters or global vars");
  });

  it("Should throw error due to undeclared options in array", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidQuestionOptions2"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Undeclared variable in array");
  });

  it("Should throw error due to duplicate variable declaration", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/duplicateVarDeclaration"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Duplicate variable names found");
  });


  it("Should throw error due to duplicate function declaration", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/duplicateFunDeclaration"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Duplicate function names found");
  });

  it("Should throw error due to duplicate page ID", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/duplicatePageID"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Duplicate page IDs found");
  });

  it("Should throw error due to duplicate question vars", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/duplicateQuestionVar"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Duplicate question variables found");
  });

  it("Should throw error due to invalid Form State access path", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidFormStatePath"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "FormStateAccess must reference a valid page ID");
  });

  it("Should throw error due to function declaration using name reserved by API", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidFunctionName"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "isEqual is already taken by the API library.");
  });

  it("Should throw error due to FormStateAccess in variable instantiation", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidVarValue"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Cannot instantiate variable with a Form State access");
  });

  it("Should not throw any error with input-math", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/validInputs/input-math.js"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).not.toThrow( Error);
  });

  it("Should not throw any error with input-contact", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/validInputs/input-contact.js"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).not.toThrow( Error);
  });

  it("Should not throw any error with input-metals", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/validInputs/input-metals.js"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).not.toThrow( Error);
  });

  it("Should not throw any error with example.dsl", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/validInputs/example.dsl"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).not.toThrow( Error);
  });

});
