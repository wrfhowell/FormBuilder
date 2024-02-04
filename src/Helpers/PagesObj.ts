import { PageObj } from "../export";
import fs from "fs";

export class PagesObj {
  pages: PageObj[];

  constructor() {
    this.pages = [];
  }

  addPageObj(pageObj: PageObj) {
    this.pages.push(pageObj);
  }

  createHTML() {
    console.log("createHTML from PagesObj");
    this.pages.forEach((page) => {
      this.createPageHTML(page);
    });
  }

  createPageHTML(page: PageObj) {
    console.log(`createPageHTML for page ${page.getId()}`);
    let html: string = `<html>
    ${page.getHeader() ? `<h1>${page.getHeader()}</h1>` : ""}
    <p>${page.getInstructions()}</p>
    </html>`;

    try {
      fs.mkdirSync("out");
    } catch (e: any) {
      if (e?.code === "EEXIST") {
      } else {
        throw e;
      }
    }
    fs.writeFileSync(`out/${page.getId()}.html`, html);
  }
}
