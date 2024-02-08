import { Evaluator } from "../../src/export";
import { program } from "./sampleAst";

describe("Evaluator Tests", () => {
	it("should correctly evaluate the sample AST", () => {
		console.log(program);
		const evaluator = new Evaluator();

		const result = evaluator.visit({}, program);

		const expectedResult = {};

		expect(result).toEqual(expectedResult);
	});
});
