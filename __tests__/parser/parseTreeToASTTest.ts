import {ParseTreeToAST} from "../../src/parser/ParseTreeToAST";
import {describe} from "node:test";
import {baseProgram} from "../parser/mockAST";
import {CharStreams, CommonTokenStream} from "antlr4ts";
//Replace with generated TS file location
import {FormGeneratorLexer} from "../../gen/parser/src/parser/FormGeneratorLexer";
import {FormGeneratorParser} from "../../gen/parser/src/parser/FormGeneratorParser";

//These won't fully pass until nodes are done implementing
describe("Parse tree to AST conversion test", () => {
    it("should correctly convert parse tree to an AST", () => {
        // setup mock tree
        const mockAST = baseProgram;

        // setup real tree
        const lexer = new FormGeneratorLexer(CharStreams.fromString("input-metals.js"));
        lexer.getAllTokens().forEach((token) => {
            console.log(token);
        })
        lexer.reset();
        const tokens = new CommonTokenStream(lexer);
        console.log("Done tokenizing");

        const parser = new FormGeneratorParser(tokens);
        const visitor = new ParseTreeToAST();
        const realAST = visitor.visitProgram(parser.program());
        console.log("Done parsing");

        expect(realAST).toEqual(mockAST)
    })
})
