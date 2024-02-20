import { Evaluator } from "../AST/export";
import { FormGeneratorLexer } from "../AST/generated/FormGeneratorLexer";
import { FormGeneratorParser } from "../AST/generated/FormGeneratorParser";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeToAST } from "../AST/parser/ParseTreeToAST";
import { BaseChecker } from "src/AST/checkers/BaseChecker";
import { IPage, Vars } from "src/Components/Interfaces";
import { StaticCheckError, EvaluatorError } from "./errors";

export const parseProgram = (
  fileContents: string
): {
  programPages: IPage[];
  programGlobalVariables: Vars[];
  programFunctions: any;
} => {
  const fileStream = CharStreams.fromString(fileContents);
  const lexer = new FormGeneratorLexer(fileStream);
  const tokens = new CommonTokenStream(lexer);
  const parser = new FormGeneratorParser(tokens);
  const visitor = new ParseTreeToAST();
  // @ts-ignore
  const parsedProgram = parser.program().accept(visitor);
  const baseChecker = new BaseChecker();
  try {
    parsedProgram.accept({}, baseChecker);
  } catch (err: any) {
    throw new StaticCheckError(err);
  }

  const evaluator = new Evaluator();
  let programObj: any;
  try {
    programObj = parsedProgram.accept({}, evaluator);
  } catch (err: any) {
    throw new EvaluatorError(err);
  }
  let programPages = programObj.pages as IPage[];
  let programFunctions = programObj.FunctionsMap;
  let programGlobalVariables = programObj.globalVariables as Vars[];

  return { programPages, programFunctions, programGlobalVariables };
};
