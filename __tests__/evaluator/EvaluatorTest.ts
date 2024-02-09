import { Evaluator } from "../../src/export";
import { baseProgram } from "./sampleAST";

describe("Evaluator Tests", () => {
	it("should correctly evaluate the sample AST", () => {
		const evaluator = new Evaluator();

		const result = evaluator.visit({}, baseProgram);
		const expectedResult = {};

		expect(result).toEqual(expectedResult);
	});
});
