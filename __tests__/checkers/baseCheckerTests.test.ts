import { BaseChecker } from "../../src/AST/checkers/BaseChecker";
import { readFileSync } from "fs";
import { FormGeneratorLexer } from "../../generated/FormGeneratorLexer";
import { FormGeneratorParser } from "../../generated/FormGeneratorParser";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeToAST } from "../../src/AST/parser/ParseTreeToAST";
import { CheckerError } from "../../src/AST/checkers/BaseChecker";

describe("Base Checker Tests", () => {
  it("Should throw error due to empty page array", () => {
    const file = readFileSync(
      "../../src/AST/dsl/invalidInputs/emptyPageArray.txt",
      "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).to.throw(
      CheckerError,
      "Form Builder must have at least one page to display"
    );
  });
});
