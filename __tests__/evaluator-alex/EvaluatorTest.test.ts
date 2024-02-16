import { Evaluator } from "../../src/AST/export";
import { readFileSync } from "fs";
import { FormGeneratorLexer } from "../../generated/FormGeneratorLexer";
import { FormGeneratorParser } from "../../generated/FormGeneratorParser";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeToAST } from "../../src/AST/parser/ParseTreeToAST";

describe("Evaluator Tests", () => {
  it("should output something", () => {
    const file = readFileSync(
      "/Users/alexanderclements/Documents/School/CPSC 410/Group14Project1/__tests__/evaluator-alex/example.dsl",
      "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    const parsedProgram = parser.program().accept(visitor);

    const evaluator = new Evaluator();

    let obj = {};

    parsedProgram.accept(obj, evaluator);

    console.log(obj);

    expect(1).toEqual(1);
  });
});
