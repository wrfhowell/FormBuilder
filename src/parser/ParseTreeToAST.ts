import {
    Id_Field,
    Program,
    Pages,
    Page,
    Node,
    Instructions_Field,
    Question,
    Header_Field
} from "../export";
import {
    Array_valueContext,
    ArrayContext, Go_objectContext, GoTo_objectContext,
    Header_fieldContext,
    Id_fieldContext,
    Instructions_fieldContext, IsRequired_fieldContext, Label_fieldContext, Object_valueContext, Options_fieldContext,
    Page_arrayContext,
    PageContext,
    PagesContext,
    Question_arrayContext,
    QuestionContext,
    Type_fieldContext,
    VariablesContext
} from "../../generated/FormGeneratorParser";
import {ProgramContext} from "../../generated/FormGeneratorParser";
import {FormGeneratorParserVisitor} from "../../generated/FormGeneratorParserVisitor";
import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {Variable} from "../Nodes/Variable";
import {Page_Array} from "../Nodes/Page_Array";
import {Question_Array} from "../Nodes/Question_Array";
import {QuestionType_Field} from "../Nodes/QuestionType_Field";
import {Label_Field} from "../Nodes/Label_Field";
import {Options_Field} from "../Nodes/Options_Field";
import {Array_Value} from "../Nodes/Array_Value";
import {ArrayCustom} from "../Nodes/ArrayCustom";
import {IsRequired_Field} from "../Nodes/IsRequired_Field";
import {GoTo_Object} from "../Nodes/GoTo_Object";
import {Go_Object} from "../Nodes/Go_Object";
import {TerminalNode} from "antlr4ts/tree/TerminalNode";
import {Object_Value} from "../Nodes/Object_Value";

export class ParseTreeToAST extends AbstractParseTreeVisitor<any> implements FormGeneratorParserVisitor<any>{

    visitProgram(ctx: ProgramContext): Program {
        let variables: Variable[] = [];
        for (const v:VariablesContext in ctx.variables()) {
            variables.push(v.accept(this));
        }
        return new Program(<Pages> ctx.pages().accept(this), variables);
    }

    //TODO: Can probably just call visit children here!
    visitPages(ctx: PagesContext): Pages {
        return new Pages(<Page_Array> ctx.page_array().accept(this));
    }

    visitPage_array(ctx: Page_arrayContext): Page_Array {
        return this.visitChildren(ctx)
    }

    visitPage(ctx: PageContext): Page  {
        //TODO: Adjust instructions, header, and also include vars field!
        let pageFields = ctx.page_fields()
        let id = pageFields.id_field().accept(this);
        let goTo = pageFields.goTo_field()?.goTo_object().accept(this);
        let header = pageFields.header_field()?.accept(this);
        let instructions = pageFields.instructions_field()?.accept(this);
        let questionArray = pageFields.questions_field()?.question_array().accept(this);
        return new Page(id, goTo, header, instructions, questionArray);
    }

    visitId_field(ctx: Id_fieldContext): Id_Field {
        return new Id_Field(ctx.STRING().text)
    }

    //TODO: Figure out Header
    visitHeader_field(ctx: Header_fieldContext): Header_Field {
        return new Header_Field(ctx.STRING()?.text)
    }

    //TODO: Figure out Instructions
    visitInstructions_field(ctx: Instructions_fieldContext): Instructions_Field {
        return new Instructions_Field(ctx.STRING()?.text);
    }

    visitQuestion_array(ctx: Question_arrayContext): Question_Array {
        const questionList: Question[] = [];
        for (const q:QuestionContext in ctx.question()) {
            questionList.push(q.accept(this));
        }
        return new Question_Array(questionList);
    }

    visitQuestion(ctx: QuestionContext): Question {
        //TODO: No header field in question! Add dependsOn field, displayIf field, loop field, correctAnswer field and variables
        let questionFields = ctx.question_fields()
        let id = questionFields.id_field().accept(this);
        let type = questionFields.type_field()?.accept(this);
        let label = questionFields.label_field()?.accept(this);
        let options = questionFields.options_field()?.accept(this);
        let isRequired = questionFields.isRequired_field()?.accept(this);
        //let header = questionFields.()?.accept(this);
        return new Question(id, type, label, options, isRequired);
    }

    visitType_field(ctx: Type_fieldContext): QuestionType_Field {
        return new QuestionType_Field(ctx.question_type().text);
    }

    visitLabel_field(ctx: Label_fieldContext): Label_Field {
        return new Label_Field(ctx.STRING()?.text);
    }

    //TODO: Figure out Options
    visitOptions_field(ctx: Options_fieldContext): Options_Field {
        return new Options_Field()
    }

    visitArray(ctx: ArrayContext): ArrayCustom {
        const arrayList: Array_Value[] = [];
        for (const a:Array_valueContext in ctx.array_value()) {
            arrayList.push(<Array_Value>a.accept(<FormGeneratorParserVisitor<Node>>this));
        }
        return new ArrayCustom(arrayList);
    }

    visitArray_value(ctx: Array_valueContext): Array_Value {
        if (ctx.STRING()?.text != undefined) {
            return new Array_Value(ctx.STRING()?.text);
        } else if (ctx.NUM()?.text != undefined) {
            return new Array_Value(Number(ctx.NUM()?.text));
        } else {
            //TODO: Return error
            return;
        }
    }

    visitObject_value(ctx: Object_valueContext): Object_Value {

        //TODO: Check that index 1 is the correct string!
        if (ctx.STRING()[1].text != undefined) {
            return new Object_Value(ctx.STRING()[1].text);

        } else if (ctx.NUM()?.text != undefined) {
            return new Object_Value(Number(ctx.NUM()?.text));
        }
    }

    visitIsRequired_field(ctx: IsRequired_fieldContext): IsRequired_Field {
        return new IsRequired_Field(Number(ctx.boolean().text) == 1);
    }

    visitGoTo_object(ctx: GoTo_objectContext): GoTo_Object {
        const goObjectList: Go_Object[] = [];
        for (const g:Go_objectContext in ctx.go_object()) {
            goObjectList.push(<Go_Object>g.accept(<FormGeneratorParserVisitor<Node>>this));
        }
        return new GoTo_Object(ctx.STRING()?.text, goObjectList);
    }

    visitGo_object(ctx: Go_objectContext): Go_Object {
        const nodeStringList = ctx.STRING()
        const pageDirectURLList: String[] = [];
        for(const s:TerminalNode in nodeStringList) {
            pageDirectURLList.push(s.text);
        }
        return new Go_Object(pageDirectURLList);

    }

    //Abstract Tree method
    protected defaultResult(): any {
        return null;
    }


}
