import { Pages, Page, Header, Instructions, Program } from "../export";

export interface Visitor<C, T> {
  visit(context: C, pages: Pages): T;
  visit(context: C, page: Page): T;
  visit(context: C, header: Header): T;
  visit(context: C, instructions: Instructions): T;
  visit(context: C, program: Program): T;
}
