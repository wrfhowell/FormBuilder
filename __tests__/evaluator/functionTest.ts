
const data = {
			functionName: "MathematicsFunction",
			functionParameters: ["10", "10"],
			functionBody: {
				returnValueFunction: "20",
				statements: [
					{
						expression: {
							unscopedExpression: "10+ 10",
							unscopedExpressionString: "10 10",
						},
					},
				],
			},
};

// Function to generate TypeScript function code from the given structure
function generateTypeScriptFunction(data: any): string {
    let functions = {}

    functions[data.functionName] = new Function(data.functionParameters[0], data.functionParameters[1], )
}

// Generate TypeScript code
const tsFunctionCode = generateTypeScriptFunction(data);

console.log(tsFunctionCode);

describe("Function", () => {
	it("should correctly evaluate the sample AST", () => {
		const tsFunctionCode = generateTypeScriptFunction(data);

        console.log(tsFunctionCode);
	});
});
