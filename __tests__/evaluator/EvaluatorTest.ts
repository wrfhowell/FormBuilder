import { Evaluator } from "../../src/AST/export";
import { quizData } from "../testObjects/object";
import { baseProgram } from "./sampleAstFunction";
import { readFileSync } from "fs";
import { FormGeneratorLexer } from "../../src/AST/generated/FormGeneratorLexer";
import { FormGeneratorParser } from "../../src/AST/generated/FormGeneratorParser";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeToAST } from "../../src/AST/parser/ParseTreeToAST";

describe("Evaluator Tests", () => {
  it("should correctly evaluate the sample AST", () => {
    const evaluator = new Evaluator();

    const result = evaluator.visit({}, baseProgram);
    const expectedResult = quizData;

    expect(result).toEqual({});
  });

  it("should output something", () => {
    const file = readFileSync("../testObjects/example.dsl", "utf-8");
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);
    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    const parsedProgram = parser.program().accept(visitor);
  });
});
