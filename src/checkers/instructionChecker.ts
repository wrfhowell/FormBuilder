import {FormGeneratorParserVisitor} from "../../gen/parser/src/parser/FormGeneratorParserVisitor";
import {AbstractParseTreeVisitor, ErrorNode, ParseTree, RuleNode} from "antlr4ts/tree";
import {Node} from "../Abstract/Node";
import {Program} from "../Nodes/Program";
import {
    Array_valueContext, ArrayContext, Boolean_expressionContext,
    BooleanContext,
    Cond_bodyContext, ConditionalContext, ConditionContext,
    CorrectAnswer_fieldContext,
    DependsOn_fieldContext,
    DisplayIf_fieldContext,
    DisplayQuestions_fieldContext, ExpressionContext,
    Form_state_accessContext,
    Function_arrayContext,
    Function_bodyContext,
    Function_callContext, Function_paramsContext, FunctionContext, FunctionsContext,
    GoTo_fieldContext, Header_fieldContext, Id_fieldContext,
    Instructions_fieldContext, IsRequired_fieldContext, Label_fieldContext, Loop_fieldContext,
    Math_expressionContext,
    Math_opContext, Num_equality_opContext,
    Object_valueContext, ObjectContext,
    Options_fieldContext, Page_arrayContext, Page_fieldContext, Page_fieldsContext,
    PageContext,
    PagesContext,
    ParameterContext, Path_to_keyContext,
    ProgramContext,
    Question_arrayContext,
    Question_fieldContext, Question_fieldsContext,
    Question_typeContext,
    QuestionContext, Questions_fieldContext,
    Scoped_expressionContext,
    StatementContext, Static_functionContext,
    String_equality_opContext,
    String_expressionContext, Type_fieldContext, Unscoped_expressionContext,
    Variable_valueContext,
    Variables_objectContext, VariablesContext
} from "../../gen/parser/src/parser/FormGeneratorParser";
import {TerminalNode} from "antlr4ts/tree/TerminalNode";
import {Override} from "antlr4ts/Decorators";

export class instructionChecker implements FormGeneratorParserVisitor<String>{
    //Call this from main
    checkProgram(p: Program): String {
        let someString = "";
        return p.accept(someString, this);
    }

    @Override
    visitProgram(ctx: ProgramContext): String {
        ctx.pages().accept(t)
        return "";
    }

    @Override
    visitPage(ctx: PageContext): String {
        if (ctx.getInstructions) {
            // ???? Shouldn't I be able to access instructions
        }
        return "error";
    }

    visitPage_array(ctx: Page_arrayContext): Node {
        return undefined;
    }

    visitPage_field(ctx: Page_fieldContext): Node {
        return undefined;
    }

    visitPage_fields(ctx: Page_fieldsContext): Node {
        return undefined;
    }

    visitPages(ctx: PagesContext): Node {
        return undefined;
    }

    visitPath_to_key(ctx: Path_to_keyContext): Node {
        return undefined;
    }

    visit(tree: ParseTree): Node {
        return undefined;
    }

    visitChildren(node: RuleNode): Node {
        return undefined;
    }

    visitErrorNode(node: ErrorNode): Node {
        return undefined;
    }

    visitTerminal(node: TerminalNode): Node {
        return undefined;
    }


}