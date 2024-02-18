import { AbstractParseTreeVisitor } from "antlr4ts/tree";
import {
  ArrayContext,
  BooleanContext,
  Cond_bodyContext,
  ConditionalContext,
  ConditionContext,
  CorrectAnswer_fieldContext,
  DisplayQuestions_fieldContext,
  ExpressionContext,
  Form_state_accessContext,
  Function_arrayContext,
  Function_bodyContext,
  Function_callContext,
  FunctionContext,
  Math_expressionContext,
  Options_fieldContext,
  PageContext,
  PagesContext,
  ProgramContext,
  Question_arrayContext,
  QuestionContext,
  ReturnValueContext,
  StatementContext,
  Text_field_valueContext,
  Variables_objectContext,
  Extended_math_expressionContext,
  Function_paramsContext,
} from "../../../generated/FormGeneratorParser";
import { FormGeneratorParserVisitor } from "../../../generated/FormGeneratorParserVisitor";
import { ArrayCustom } from "../Nodes/ArrayCustom";
import { ArrayValue } from "../Nodes/ArrayValue";
import { Cond_Body } from "../Nodes/Cond_Body";
import { Conditional } from "../Nodes/Conditional";
import { Else_If_Cond } from "../Nodes/Else_If_Cond";
import { Expression } from "../Nodes/Expression";
import { ExtendedMathExpression } from "../Nodes/ExtendedMathExpression";
import { FormStateAccess } from "../Nodes/FormStateAccess";
import { FunctionCustom } from "../Nodes/FunctionCustom";
import { Function_Body } from "../Nodes/Function_Body";
import { Function_Call } from "../Nodes/Function_Call";
import { Functions_Array } from "../Nodes/Functions_Array";
import { If_Cond } from "../Nodes/If_Cond";
import { Question_Array } from "../Nodes/Question_Array";
import { Variable } from "../Nodes/Variable";
import { VariableName } from "../Nodes/VariableName";
import { VariablesArray } from "../Nodes/VariablesArray";
import { MathExpression, Page, Pages, Program, Question } from "../export";
import { VariableAssignment } from "../Nodes/VariableAssignment";
import { MathOp } from "../Nodes/MathOp";

export class ParseTreeToAST
  extends AbstractParseTreeVisitor<any>
  implements FormGeneratorParserVisitor<any>
{
  visitProgram(ctx: ProgramContext): Program {
    const functionsObject = ctx
      .functions()
      ?.function_array()
      .accept(this) as Functions_Array;
    const variablesObject = ctx
      .variables()
      ?.variables_object()
      .accept(this) as VariablesArray;
    const pages = ctx.pages().accept(this) as Pages;
    if (functionsObject && variablesObject) {
      return new Program(pages, functionsObject, variablesObject);
    } else if (variablesObject) {
      return new Program(pages, undefined, variablesObject);
    } else if (functionsObject) {
      return new Program(pages, functionsObject, undefined);
    } else {
      return new Program(pages, undefined, undefined);
    }
  }

  visitPages(ctx: PagesContext): Pages {
    let pagesList: Page[] = [];
    for (const p of ctx.page_array().page()) {
      pagesList.push(p.accept(this) as Page);
    }
    return new Pages(pagesList);
  }

  visitFunction_array(ctx: Function_arrayContext): Functions_Array {
    let functionList: FunctionCustom[] = [];
    for (const f of ctx.function()) {
      functionList.push(f.accept(this) as FunctionCustom);
    }
    return new Functions_Array(functionList);
  }

  visitVariables_object(ctx: Variables_objectContext): VariablesArray {
    let variableList: Variable[] = [];
    for (let v of ctx.variable()) {
      const varName = v.VARIABLE_NAME().text;
      const varValue = v.variable_value();
      const varBoolean = varValue.boolean()?.accept(this);
      const varFormStateAccess = varValue.form_state_access()?.accept(this);
      const varFuncCall = varValue.function_call()?.accept(this);
      if (varValue.NUM()?.text) {
        variableList.push(new Variable(varName, Number(varValue.NUM()?.text)));
      } else if (varValue.STRING()?.text) {
        variableList.push(new Variable(varName, varValue.STRING()?.text));
      } else if (varBoolean) {
        variableList.push(new Variable(varName, varBoolean));
      } else if (varValue.array()) {
        variableList.push(
          new Variable(varName, varValue.array()?.accept(this) as ArrayCustom)
        );
      } else if (varFormStateAccess) {
        variableList.push(new Variable(varName, varFormStateAccess));
      } else if (varFuncCall) {
        variableList.push(new Variable(varName, varFuncCall));
      } else {
        variableList.push(new Variable(varName, undefined));
      }
    }
    return new VariablesArray(variableList);
  }

  //TODO: Evaluator does what it wants to with undefined variables
  visitPage(ctx: PageContext): Page {
    ctx.page_fields().page_field();
    let id = undefined;
    let header = undefined;
    let instructions = undefined;
    let goTo = undefined;
    let questions;
    let displayQuestions = undefined;

    for (let pageFields of ctx.page_fields().page_field()) {
      if (pageFields.id_field()) {
        id = pageFields.id_field()?.text_field_value().accept(this);
      } else if (pageFields.header_field()) {
        header = pageFields.header_field()?.text_field_value().accept(this);
      } else if (pageFields.instructions_field()) {
        instructions = pageFields
          .instructions_field()
          ?.text_field_value()
          .accept(this);
      } else if (pageFields.goTo_field()) {
        goTo = pageFields.goTo_field()?.text_field_value().accept(this);
      } else if (pageFields.displayQuestions_field()) {
        displayQuestions = pageFields.displayQuestions_field()?.accept(this);
      } else if (pageFields.questions_field()) {
        questions = pageFields
          .questions_field()
          ?.question_array()
          .accept(this) as Question_Array;
      }
    }
    let page = new Page(
      id,
      goTo,
      header,
      instructions,
      displayQuestions,
      questions
    );

    return page;
  }

  visitText_field_value(
    ctx: Text_field_valueContext
  ): string | VariableName | Function_Call {
    return (
      ctx?.STRING()?.text.replace(/["]/g, "") ||
      (ctx?.function_call()?.accept(this) as Function_Call) ||
      (new VariableName(
        ctx?.VARIABLE_NAME()?.text.replace(/["]/g, "") as string
      ) as VariableName)
    );
  }

  visitFunction(ctx: FunctionContext): FunctionCustom {
    const variableName = new VariableName(
      ctx.VARIABLE_NAME().text.replace(/["]/g, "")
    );
    const res = ctx.function_params().accept(this);
    const parameters: (
      | string
      | number
      | VariableName
      | Function_Call
      | FormStateAccess
    )[] = res;
    return new FunctionCustom(
      variableName,
      parameters,
      ctx.function_body().accept(this)
    );
  }

  visitFunction_params(ctx: Function_paramsContext) {
    const functionParams: any[] = [];
    ctx.parameter()?.forEach((sub_ctx) => {
      if (sub_ctx.NUM() || sub_ctx.STRING() || sub_ctx.VARIABLE_NAME()) {
        const ans = sub_ctx.NUM()
          ? parseInt(sub_ctx.NUM()?.text.replace(/["]/g, "") || "1")
          : sub_ctx.STRING()
          ? sub_ctx.STRING()?.text.replace(/["]/g, "")
          : new VariableName(
              sub_ctx.VARIABLE_NAME()?.text.replace(/["]/g, "") || ""
            );
        functionParams.push(ans);
      } else if (sub_ctx.form_state_access !== undefined) {
        functionParams.push(sub_ctx.form_state_access()?.accept(this));
      } else {
        functionParams.push(sub_ctx.function_call()?.accept(this));
      }
    });
    return functionParams;
  }

  visitForm_state_access(ctx: Form_state_accessContext): FormStateAccess {
    return new FormStateAccess(
      ctx.path_to_key().path_to_page_key().STRING().text.replace(/["]/g, ""),
      ctx.path_to_key().path_to_question_key().STRING().text.replace(/["]/g, "")
    );
  }

  visitFunction_body(ctx: Function_bodyContext): Function_Body {
    const statements: (
      | Conditional
      | Expression
      | VariableAssignment
      | undefined
    )[] = [];
    for (const s of ctx.statement()) {
      statements.push(s.accept(this));
    }
    const returnVal = ctx.returnValue().accept(this);

    if (returnVal) {
      return new Function_Body(statements, returnVal);
    } else {
      return new Function_Body(statements, undefined);
    }
  }

  visitStatement(
    ctx: StatementContext
  ): Conditional | Expression | VariableAssignment | undefined {
    const statementConditional = ctx.conditional()?.accept(this) as Conditional;
    const statementExpression = ctx.expression()?.accept(this) as Expression;
    const statementVariableAssignment = ctx.var_assignment();

    if (statementConditional) {
      return statementConditional;
    } else if (statementExpression) {
      return statementExpression;
    } else if (statementVariableAssignment) {
      return new VariableAssignment(
        new VariableName(statementVariableAssignment.VARIABLE_NAME().text),
        statementVariableAssignment.returnValue().accept(this)
      );
    } else {
      return undefined;
    }
  }

  visitReturnValue(
    ctx: ReturnValueContext
  ):
    | string
    | number
    | VariableName
    | Expression
    | Function_Call
    | ArrayCustom
    | undefined {
    let returnValVarNameString = ctx.VARIABLE_NAME()?.text;
    let returnValVarName;
    const returnValString = ctx.STRING()?.text;
    const returnValNumString = ctx.NUM()?.text;
    let returnValNum;
    const returnValExpression = ctx.expression()?.accept(this) as Expression;
    const returnValFuncCall = ctx
      .function_call()
      ?.accept(this) as Function_Call;
    const returnValArray = ctx.array()?.accept(this) as ArrayCustom;
    if (returnValVarNameString) {
      returnValVarName = new VariableName(returnValVarNameString);
    } else if (returnValNumString) {
      returnValNum = Number(returnValNumString);
    }
    return (
      returnValVarName ||
      returnValString ||
      returnValNum ||
      returnValExpression ||
      returnValFuncCall ||
      returnValArray
    );
  }

  visitFunction_call(ctx: Function_callContext): Function_Call {
    const functionParams = ctx.function_params().accept(this);
    return new Function_Call(
      new VariableName(ctx.VARIABLE_NAME().text),
      functionParams
    );
  }

  visitConditional(ctx: ConditionalContext): Conditional {
    let ifCond = new If_Cond(
      ctx.if_cond()?.condition().accept(this) as Function_Call | VariableName,
      ctx.if_cond()?.cond_body().accept(this)
    );
    let elseIfList: Else_If_Cond[] = [];
    for (const e of ctx.else_if_cond()) {
      elseIfList.push(
        new Else_If_Cond(
          e.condition().accept(this) as Function_Call | VariableName,
          e.function_body().accept(this)
        )
      );
    }
    let elseCond = ctx.else_cond()?.cond_body().accept(this);
    return new Conditional(ifCond, elseIfList, elseCond);
  }

  visitCondition(ctx: ConditionContext): Function_Call | VariableName {
    return (
      ctx.function_call()?.accept(this) ||
      new VariableName(ctx.VARIABLE_NAME()?.text as string)
    );
  }

  visitCond_body(ctx: Cond_bodyContext): Cond_Body {
    const statements: (
      | Conditional
      | Expression
      | VariableAssignment
      | undefined
    )[] = [];
    for (const s of ctx.statement()) {
      statements.push(s.accept(this));
    }
    const returnValIf = ctx.returnValueIf()?.returnValue().accept(this);

    if (returnValIf) {
      return new Cond_Body(statements, returnValIf);
    }
    return new Cond_Body(statements, undefined);
  }

  visitDisplayQuestions_field(
    ctx: DisplayQuestions_fieldContext
  ): string | number | undefined {
    let displayAll = ctx.DISPLAY_ALL()?.text;
    let displayNum = ctx.NUM()?.text;
    if (displayAll) {
      return displayAll;
    } else if (displayNum) {
      return Number(displayNum);
    } else {
      return undefined;
    }
  }

  visitQuestion_array(ctx: Question_arrayContext): Question_Array {
    const questionList: Question[] = [];
    for (const q of ctx.question()) {
      questionList.push(q.accept(this) as Question);
    }
    return new Question_Array(questionList);
  }

  //TODO: Adjust question fields
  //TODO: Adjust field once Boolean problem is fixed
  visitQuestion(ctx: QuestionContext): Question {
    let id = undefined;
    let type;
    let label;
    let options;
    let dependsOn;
    let displayIf;
    let loop;
    let isRequired;
    let correctAnswer;
    let varsObject;
    for (let questionFields of ctx.question_fields().question_field()) {
      if (questionFields.id_field()) {
        id = questionFields.id_field()?.text_field_value().accept(this);
      } else if (questionFields.type_field()) {
        console.log("Type from ParseTreeToAST: ", questionFields.type_field());
        type = questionFields.type_field()?._stop?.text?.replace(/["]/g, "");
      } else if (questionFields.label_field()) {
        label = questionFields.label_field()?.text_field_value().accept(this);
      } else if (questionFields.options_field()) {
        options = questionFields.options_field()?.accept(this);
      } else if (questionFields.dependsOn_field()) {
        dependsOn = questionFields.dependsOn_field()?.STRING().text;
      } else if (questionFields.displayIf_field()) {
        displayIf = questionFields.displayIf_field()?.STRING().text;
      } else if (questionFields.loop_field()) {
        loop = Number(questionFields.loop_field()?.NUM().text);
      } else if (questionFields.isRequired_field()) {
        isRequired = questionFields.isRequired_field()?.boolean().accept(this);
      } else if (questionFields.correctAnswer_field()) {
        correctAnswer = questionFields.correctAnswer_field()?.accept(this) as
          | string
          | number
          | VariableName
          | Function_Call
          | undefined;
      } else if (questionFields.variables()?.variables_object()) {
        varsObject = questionFields
          .variables()
          ?.variables_object()
          .accept(this) as VariablesArray;
      }
    }

    return new Question(
      id,
      type,
      label,
      options,
      dependsOn,
      displayIf,
      loop,
      isRequired,
      correctAnswer,
      varsObject
    );
  }

  visitBoolean(ctx: BooleanContext): boolean {
    return !!ctx.TRUE();
  }

  visitOptions_field(
    ctx: Options_fieldContext
  ): VariableName | Function_Call | ArrayCustom | undefined {
    const optionsArray = ctx.array()?.accept(this);
    const optionsFuncCall = ctx.function_call()?.accept(this);
    const optionsVarName = ctx.VARIABLE_NAME()?.text;
    if (optionsArray) {
      return optionsArray;
    } else if (optionsFuncCall) {
      return optionsFuncCall;
    } else if (optionsVarName) {
      return new VariableName(optionsVarName);
    } else {
      return undefined;
    }
  }

  visitArray(ctx: ArrayContext): ArrayValue[] {
    const arrayList: ArrayValue[] = [];
    for (const a of ctx.array_value()) {
      const currNumValue = a.NUM()?.text;
      const currStringValue = a.STRING()?.text;
      const currVarNameVal = a.VARIABLE_NAME()?.text;

      if (currNumValue) {
        arrayList.push(new ArrayValue(Number(currNumValue)));
      } else if (currStringValue) {
        arrayList.push(new ArrayValue(currStringValue));
      } else if (currVarNameVal) {
        arrayList.push(new ArrayValue(currVarNameVal));
      } else {
        arrayList.push(new ArrayValue(undefined));
      }
    }
    return arrayList;
  }

  visitCorrectAnswer_field(
    ctx: CorrectAnswer_fieldContext
  ): string | number | VariableName | Function_Call | undefined {
    const correctAnswerString = ctx.STRING()?.text;
    const correctAnswerNumber = ctx.NUM()?.text;
    const correctAnswerVariableName = ctx.VARIABLE_NAME()?.text;
    const correctAnswerFuncCall = ctx.function_call()?.accept(this);
    if (correctAnswerString) {
      return correctAnswerString;
    } else if (correctAnswerNumber) {
      return Number(correctAnswerNumber);
    } else if (correctAnswerVariableName) {
      return new VariableName(correctAnswerVariableName);
    } else if (correctAnswerFuncCall) {
      return correctAnswerFuncCall;
    } else {
      return undefined;
    }
  }

  visitExpression(ctx: ExpressionContext): Expression {
    let expressionValue: number | VariableName | MathExpression;
    let numVal = ctx.NUM()?.text;
    let varName = ctx.VARIABLE_NAME()?.text;
    if (numVal) {
      expressionValue = Number(numVal);
    } else if (varName) {
      expressionValue = new VariableName(varName);
    } else {
      expressionValue = new MathExpression(ctx.math_expression()?.accept(this));
    }
    const newExpression = new Expression(expressionValue);
    return newExpression;
  }

  visitMath_expression(ctx: Math_expressionContext) {
    let expression: Expression = new Expression(ctx.expression().accept(this));
    let extendedMathExpressions: ExtendedMathExpression[] = [];

    for (let sub_ctx of ctx.extended_math_expression()) {
      let extended_math_expression: ExtendedMathExpression =
        new ExtendedMathExpression(
          new MathOp(sub_ctx.math_op().text),
          sub_ctx.expression()?.accept(this)
        );
      extendedMathExpressions.push(extended_math_expression);
    }

    let return_obj = { expression, extendedMathExpressions };

    console.log("visitMath_expression returning: ", return_obj);

    return return_obj;
  }

  visitExtended_math_expression(ctx: Extended_math_expressionContext) {
    // console.log("Visiting extended math expression");
  }

  //Abstract Tree method
  protected defaultResult(): any {}
}
