import { Visitor } from "../export";

export abstract class Node {
  abstract accept<C, T>(context: C, v: Visitor<C, T>): T;
}
