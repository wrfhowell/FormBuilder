import { Evaluator } from "../../src/AST/export";
import { quizData } from "../testObjects/object";
import { baseProgram } from "./sampleAstFunction";

describe("Evaluator Tests", () => {
  it("should correctly evaluate the sample AST", () => {
    const evaluator = new Evaluator();

    const result = evaluator.visit({}, baseProgram);
    const expectedResult = quizData;

    expect(result).toEqual({});
  });
});
