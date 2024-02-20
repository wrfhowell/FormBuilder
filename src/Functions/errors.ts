export class StaticCheckError extends Error {
  constructor(message: any) {
    super(message);
    this.name = "StaticCheckError";
  }
}

export class EvaluatorError extends Error {
  constructor(message: any) {
    super(message);
    this.name = "EvaluatorError";
  }
}

export class FunctionEvaluatorError extends Error {
  constructor(message: any) {
    super(message);
    this.name = "FunctionEvaluatorError";
  }
}
