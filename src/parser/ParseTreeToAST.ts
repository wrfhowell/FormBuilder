import {
    Program,
    Pages,
    Page,
    Node,
    Question,
} from "../export";
import {
    Array_valueContext,
    ArrayContext,
    CorrectAnswer_fieldContext,
    DisplayIf_fieldContext,
    Go_objectContext,
    GoTo_objectContext,
    Header_fieldContext,
    Instructions_fieldContext,
    Label_fieldContext,
    Options_fieldContext,
    PageContext,
    PagesContext,
    Question_arrayContext,
    QuestionContext,
    VariableContext,
    Variables_objectContext,
} from "../../generated/FormGeneratorParser";
import {ProgramContext} from "../../generated/FormGeneratorParser";
import {FormGeneratorParserVisitor} from "../../generated/FormGeneratorParserVisitor";
import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {VariablesArray} from "../Nodes/VariablesArray";
import {Question_Array} from "../Nodes/Question_Array";
import {Options} from "../Nodes/Options";
import {GoTo_Object} from "../Nodes/GoTo_Object";
import {Variable} from "../Nodes/Variable";
import {Expression} from "../Nodes/Expression";
import {Option} from "../Nodes/Option";
import {Regex} from "../Nodes/Regex";
import {VariableName} from "../Nodes/VariableName";

export class ParseTreeToAST extends AbstractParseTreeVisitor<Node> implements FormGeneratorParserVisitor<Node>{

    visitProgram(ctx: ProgramContext): Program {
        if (ctx.variables()?.variables_object()) {
            return new Program(<Pages>ctx.pages().accept(<FormGeneratorParserVisitor<Node>>this),
                <VariablesArray>ctx.variables()?.variables_object().accept(<FormGeneratorParserVisitor<Node>>this));
        } else {
            return new Program(<Pages>ctx.pages().accept(<FormGeneratorParserVisitor<Node>>this), undefined);
        }
    }

    visitVariables_object(ctx: Variables_objectContext): VariablesArray {
        let variableList: Variable[] = [];
        for (const v: VariableContext in ctx.variable()) {
            const varName = v.variable_name().STRING().text;
            const varValue = v.variable_value();
            const regexValCheck = varValue.REGEX()?.text;
            if (varValue.NUM()?.text) {
                variableList.push(new Variable(varName, Number(varValue.NUM()?.text)));
            } else if (varValue.STRING()?.text) {
                variableList.push(new Variable(varName, varValue.STRING()?.text));
            } else if (regexValCheck) {
                variableList.push(new Variable(varName, new Regex(regexValCheck)));
            } else if (varValue.array()) {
                variableList.push(new Variable(varName, <(string | number | undefined)[]> varValue.array()?.accept(<FormGeneratorParserVisitor<Node>>this)));
            } else {
                variableList.push(new Variable(varName, undefined));
            }
        }
        return new VariablesArray(variableList);
    }

    visitPages(ctx: PagesContext): Pages {
        let pagesList: Page[] = []
        for (const p:PageContext in ctx.page_array().page()) {
            pagesList.push(<Page> p.accept(<FormGeneratorParserVisitor<Node>>this));
        }
        return new Pages(pagesList);
    }

    //TODO: Adjust field once Boolean problem is fixed
    visitPage(ctx: PageContext): Page  {
        let pageFields = ctx.page_fields();
        let id = pageFields.id_field().STRING().text;
        let goTo = <GoTo_Object> pageFields.goTo_field()?.goTo_object().accept(<FormGeneratorParserVisitor<Node>>this);
        let header = <string | Expression | VariableName | undefined> pageFields.header_field()?.accept(<FormGeneratorParserVisitor<Node>>this);
        let instructions = <string | Expression | VariableName | undefined> pageFields.instructions_field()?.accept(<FormGeneratorParserVisitor<Node>>this);
        let displayQuestions: boolean | undefined;
        let questionArray: Question_Array = <Question_Array> pageFields.questions_field()?.question_array().accept(<FormGeneratorParserVisitor<Node>>this);
        let varsObject: VariablesArray | undefined;
        if (pageFields.displayQuestions_field()?.boolean()) {
            displayQuestions = (Number(pageFields.displayQuestions_field()?.boolean().text) == 1);
        } else {
            displayQuestions = undefined;
        }
        if (pageFields.variables()?.variables_object()) {
            varsObject = <VariablesArray> pageFields.variables()?.variables_object().accept(<FormGeneratorParserVisitor<Node>> this);
        } else {
            varsObject = undefined;
        }
        return new Page(id, goTo, header, instructions, displayQuestions, questionArray, varsObject);
    }

    visitHeader_field(ctx: Header_fieldContext): string | Expression | VariableName | undefined {
        const headerString = ctx.STRING()?.text;
        const headerExpression = <Expression>ctx.expression()?.accept(<FormGeneratorParserVisitor<Node>>this);
        const headerVarName = ctx.variable_name()?.STRING().text;
        if (headerString) {
            return headerString;
        } else if (headerExpression) {
            return headerExpression;
        } else if (headerVarName) {
            return new VariableName(headerVarName);
        } else {
            return undefined;
        }
    }

    visitInstructions_field(ctx: Instructions_fieldContext): string | Expression | VariableName | undefined {
        const instructionString = ctx.STRING()?.text;
        const instructionExpression = <Expression>ctx.expression()?.accept(<FormGeneratorParserVisitor<Node>>this);
        const instructionVarName = ctx.variable_name()?.STRING().text;
        if (instructionString) {
            return instructionString;
        } else if (instructionExpression) {
            return instructionExpression;
        } else if (instructionVarName) {
            return new VariableName(instructionVarName);
        } else {
            return undefined;
        }
    }

    visitQuestion_array(ctx: Question_arrayContext): Question_Array {
        const questionList: Question[] = [];
        for (const q:QuestionContext in ctx.question()) {
            questionList.push(<Question> q.accept(<FormGeneratorParserVisitor<Node>> this));
        }
        return new Question_Array(questionList);
    }

    //TODO: Adjust field once Boolean problem is fixed
    visitQuestion(ctx: QuestionContext): Question {
        let questionFields = ctx.question_fields();
        let id = questionFields.id_field().STRING().text;
        let type = questionFields.type_field()?.text;
        let label= <string | Expression | VariableName | undefined> questionFields.label_field()?.accept(<FormGeneratorParserVisitor<Node>> this);
        let options: Options = <Options> questionFields.options_field()?.accept(<FormGeneratorParserVisitor<Node>> this);
        let dependsOn = questionFields.dependsOn_field()?.text;
        let displayIf = <string | Regex | Expression | undefined> questionFields.displayIf_field()?.accept(<FormGeneratorParserVisitor<Node>> this);
        let loop = Number(questionFields.loop_field()?.NUM().text);
        let isRequired: boolean | undefined;
        let correctAnswer = <string | number | Regex | Expression | undefined> questionFields.correctAnswer_field()?.accept(<FormGeneratorParserVisitor<Node>> this);
        let varsObject: VariablesArray | undefined;
        if (questionFields.isRequired_field()?.boolean()) {
            isRequired = (Number(questionFields.isRequired_field()?.boolean().text) == 1);
        } else {
            isRequired = undefined;
        }
        if (questionFields.variables()?.variables_object()) {
            varsObject = <VariablesArray> questionFields.variables()?.variables_object().accept(<FormGeneratorParserVisitor<Node>> this);
        } else {
            varsObject = undefined;
        }
        return new Question(id, type, label, options, dependsOn, displayIf, loop, isRequired, correctAnswer, varsObject);
    }

    visitLabel_field(ctx: Label_fieldContext): string | Expression | VariableName | undefined {
        const labelString = ctx.STRING()?.text;
        const labelExpression = <Expression>ctx.expression()?.accept(<FormGeneratorParserVisitor<Node>>this);
        const labelVarName = ctx.variable_name()?.STRING().text;
        if (labelString) {
            return labelString;
        } else if (labelExpression) {
            return labelExpression;
        } else if (labelVarName) {
            return new VariableName(labelVarName);
        } else {
            return undefined;
        }
    }

    visitOptions_field(ctx: Options_fieldContext): Options {
        return new Options(<Option[]> ctx.array().accept(<FormGeneratorParserVisitor<Node>> this));
    }


    visitArray(ctx: ArrayContext): Option[] {
        const arrayList: Option[] = [];
        for (const a:Array_valueContext in ctx.array_value()) {
            const currNumValue = a.NUM()?.text;
            const currStringValue = a.STRING()?.text;

            if (currNumValue) {
                arrayList.push(new Option(Number(currNumValue)));
            } else if (currStringValue) {
                arrayList.push(new Option(currStringValue));
            } else {
                arrayList.push(new Option(undefined));
            }
        }
        return arrayList;
    }

    visitDisplayIf_field(ctx: DisplayIf_fieldContext): string | Regex | Expression | undefined {
        const displayIfString = ctx.STRING()?.text;
        const displayIfRegex = ctx.REGEX()?.text;
        const displayIfExpression = <Expression>ctx.expression()?.accept(<FormGeneratorParserVisitor<Node>>this);
        if (displayIfString) {
            return displayIfString;
        } else if (displayIfRegex) {
            return new Regex(displayIfRegex);
        } else if (displayIfExpression) {
            return displayIfExpression;
        } else {
            return undefined;
        }
    }

    visitCorrectAnswer_field(ctx: CorrectAnswer_fieldContext): string | number | Regex | Expression | undefined {
        const correctAnswerString = ctx.STRING()?.text;
        const correctAnswerNumber = ctx.NUM()?.text;
        const correctAnswerRegex = ctx.REGEX()?.text;
        const correctAnswerExpression = <Expression>ctx.expression()?.accept(<FormGeneratorParserVisitor<Node>>this);
        if (correctAnswerString) {
            return correctAnswerString;
        } else if (correctAnswerNumber) {
            return Number(correctAnswerNumber);
        } else if (correctAnswerRegex) {
            return correctAnswerRegex;
        } else if (correctAnswerExpression) {
            return correctAnswerExpression;
        } else {
            return undefined;
        }
    }

    visitGoTo_object(ctx: GoTo_objectContext): GoTo_Object {
        return new GoTo_Object(ctx.STRING()?.text,
            <{[key: string]: string}> ctx.go_object()?.accept(<FormGeneratorParserVisitor<Node>>this));
    }

    visitGo_object(ctx: Go_objectContext): {[key: string]: string} {
        let goToDictionary: {[key: string]: string} = {}
        for (let i: number = 0; i < ctx.go_object_key().length; i++) {
            goToDictionary[ctx.go_object_key()[i].STRING().text] = ctx.go_object_value()[i].STRING().text;
        }
        return goToDictionary;
    }

    //Abstract Tree method
    protected defaultResult(): any {
    }


}
