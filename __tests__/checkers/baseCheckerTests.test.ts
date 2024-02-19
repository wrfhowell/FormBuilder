import { BaseChecker } from "../../src/AST/checkers/BaseChecker";
import { readFileSync } from "fs";
import { FormGeneratorLexer } from "../../src/AST/generated/FormGeneratorLexer";
import { FormGeneratorParser } from "../../src/AST/generated/FormGeneratorParser";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeToAST } from "../../src/AST/parser/ParseTreeToAST";
import { CheckerError } from "../../src/AST/checkers/BaseChecker";
import path from "path";

describe("Base Checker Tests", () => {
  // it("Should throw error due to missing page id", () => {
  //   const file = readFileSync(
  //     path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/missingPageID"),
  //     "utf-8"
  //   );
  //   const fileStream = CharStreams.fromString(file);
  //
  //   const lexer = new FormGeneratorLexer(fileStream);
  //
  //   const tokens = new CommonTokenStream(lexer);
  //
  //   const parser = new FormGeneratorParser(tokens);
  //
  //   const visitor = new ParseTreeToAST();
  //   //@ts-ignore
  //   const parsedProgram = parser.program().accept(visitor);
  //
  //   const checker = new BaseChecker();
  //
  //   expect(() => parsedProgram.accept({}, checker)).to.throw(
  //     CheckerError,
  //     "Page must have an ID"
  //   );
  // });

  it("Should throw error due to function call in function definition", () => {
    const file = readFileSync(
        path.resolve(__dirname,"../../src/AST/dsl/invalidInputs/invalidFunctionDefinition"),
        "utf-8"
    );
    const fileStream = CharStreams.fromString(file);

    const lexer = new FormGeneratorLexer(fileStream);

    lexer.getAllTokens().forEach((token) => {
      console.log(token);
    })
    lexer.reset();

    const tokens = new CommonTokenStream(lexer);

    const parser = new FormGeneratorParser(tokens);

    const visitor = new ParseTreeToAST();
    //@ts-ignore
    const parsedProgram = parser.program().accept(visitor);

    const checker = new BaseChecker();

    expect(() => parsedProgram.accept({}, checker)).toThrow( "Invalid function parameter name.");
  });
});
