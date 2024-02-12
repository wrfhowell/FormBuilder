import {Program} from "../Nodes/Program";
import {Visitor} from "../Interfaces/Visitor";
import {Options} from "../Nodes/Options";
import {Variable} from "../Nodes/Variable";
import {VariableName} from "../Nodes/VariableName";
import {GoTo_Object} from "../Nodes/GoTo_Object";
import {Page} from "../Nodes/Page";
import {Question_Array} from "../Nodes/Question_Array";
import {MathExpression} from "../Nodes/MathExpression";
import {Pages} from "../Nodes/Pages";
import {VariablesArray} from "../Nodes/VariablesArray";
import {Regex} from "../Nodes/Regex";
import {Expression} from "../Nodes/Expression";
import {StringExpression} from "../Nodes/StringExpression";
import {Option} from "../Nodes/Option";
import {Question} from "../Nodes/Question";

export class instructionChecker implements Visitor<string,string>{
    //Call this from main
    checkProgram(p: Program): string {
        return p.accept("",this);
    }

    visit(context: string, expression: Expression | GoTo_Object | MathExpression | Option | Options | Page | Pages | Program | Question | Question_Array | Regex | StringExpression | Variable | VariableName | VariablesArray): string {
        let error = "";
        if (expression instanceof Program) {
            let pageArray = expression.getPages().getPageArray();
            pageArray.forEach((page)=>{
                console.log(page.getInstructions());
                if (page.getInstructions() == "" || page.getInstructions() == undefined) {
                    error = "Missing instructions on " + page.getId() + " page!"
                }
            })
        }
        return error;
    }
}