import {
  Evaluator,
  Page,
  Pages,
  Program,
  Header,
  Instructions,
  PageId,
  Questions,
  Question,
} from "./export";

function main() {
  let e: Evaluator = new Evaluator();
  let s: string = "";

  let parsedProgram: Program = new Program();

  parsedProgram.addNode(new Pages());

  parsedProgram.addNode(new Page());
  parsedProgram.addNode(new PageId("1"));
  parsedProgram.addNode(new Header("Heading 1"));
  parsedProgram.addNode(new Instructions("Instructions 1"));
  parsedProgram.addNode(new Questions());
  parsedProgram.addNode(new Question());

  parsedProgram.addNode(new Page());
  parsedProgram.addNode(new PageId("2"));
  parsedProgram.addNode(new Header("Heading 2"));
  parsedProgram.addNode(new Instructions("Instructions 2"));

  parsedProgram.accept(s, e);

  e.createHTML();
}

main();
