import {instructionChecker} from "../../src/checkers/instructionChecker";
import {baseProgram} from "../evaluator/sampleAst";
import {ProgramWithInstructions} from "../checkers/testProgram";

describe("Instruction static check", () => {
    it("should say that instructions on page1 are missing", () => {
        const checker = new instructionChecker();
        const result = checker.checkProgram(baseProgram);
        expect(result).toEqual("Missing instructions on page1 page!");
    });
    it("should say that instructions on page1 are missing", () => {
        const checker = new instructionChecker();
        const result = checker.checkProgram(ProgramWithInstructions);
        expect(result).toEqual("");
    });
});