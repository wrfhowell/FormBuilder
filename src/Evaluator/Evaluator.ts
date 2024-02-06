import {
  Visitor,
  Page,
  Pages,
  Header_Field,
  Instructions_Field,
  Program,
  Id_Field,
  PagesObj,
  PageObj,
  Question,
  QuestionObj, Node,
} from "../export";

type ASTNode = Page | Pages | Header_Field | Instructions_Field | Program;

export class Evaluator implements Visitor<string, void> {
  pages: PagesObj | undefined;
  latestPage: PageObj | undefined;
  latestQuestion: QuestionObj | undefined;

  constructor() {}

  jumpTable: any = {
    Page: this.visitPage,
    Pages: this.visitPages,
    Header: this.visitHeader,
    Instructions: this.visitInstructions,
    Program: this.visitProgram,
    PageId: this.visitPageId,
    Questions: this.visitQuestions,
    Question: this.visitQuestion,
  };

  //TODO: May have to reimplement this
  visit(context: string, node: Node) {
    let nodeType: string = node.constructor.name;
    this.jumpTable[nodeType](this, context, node);
  }

  visitPages(evaluator: Evaluator, context: string, pages: Pages) {
    console.log("Visiting Pages");
    evaluator.pages = new PagesObj();
  }

  visitPage(evaluator: Evaluator, context: string, page: Page) {
    console.log("Visiting Page");
    evaluator.latestPage = new PageObj();
    if (evaluator.pages) {
      evaluator.pages.addPageObj(evaluator.latestPage);
    } else {
      throw new Error("Pages not declared :(");
    }
  }

  visitHeader(evaluator: Evaluator, context: string, header: Header_Field) {
    console.log("Visiting Header_Field");
    if (evaluator.latestPage) {
      evaluator.latestPage.setHeader(header.toString());
    } else {
      throw new Error("Latest page not set :(");
    }
  }

  visitInstructions(
    evaluator: Evaluator,
    context: string,
    instructions: Instructions_Field
  ) {
    console.log("Visiting Instructions_Field");
    if (evaluator.latestPage) {
      evaluator.latestPage.setInstructions(instructions.toString());
    } else {
      throw new Error("Latest page not declared :(");
    }
  }

  //TODO: FIX THIS
  visitProgram(evaluator: Evaluator, context: string, program: Program) {
    console.log("Visiting Program");
    /*program.getNodes().forEach((node) => {
      node.accept(context, evaluator);
    });*/
  }

  visitPageId(evaluator: Evaluator, context: string, id: Id_Field) {
    console.log("Visiting Id_Field");
    evaluator.latestPage?.setId(id.toString());
  }

  visitQuestions(evaluator: Evaluator, context: string, questions: Questions_Field) {
    console.log("Visiting Questions_Field");
    evaluator.latestPage?.initQuestions();
  }

  visitQuestion(evaluator: Evaluator, context: string, question: Question) {
    console.log("Visiting Question");
    evaluator.latestQuestion = new QuestionObj();
    evaluator.latestPage?.addQuestion(evaluator.latestQuestion);
  }

  getPages = () => {
    return this.pages;
  };

  createHTML() {
    console.log("createHTML from Evaluator");
    if (this.pages) {
      this.pages.createHTML();
    } else {
      throw new Error("Pages is undefined :(");
    }
  }
}
