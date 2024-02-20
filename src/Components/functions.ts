import { Function_Call } from "src/AST/Nodes/Function_Call";
import { FunctionEvaluator } from "src/AST/Evaluator/FunctionEvaluator";
import { FunctionEvaluatorContext } from "src/AST/Evaluator/FunctionEvaluator";
import { IFormStateContext } from "./Context";
import { FunctionsContext } from "../AST/Evaluator/FunctionEvaluator";
import { Vars } from "./Interfaces";
import { VariableName } from "src/AST/Nodes/VariableName";

declare global {
  interface Window {
    globalVars: { [key: string]: string | number | (string | number)[] };
  }
}

export const getArgValues = (
  args: (string | number | Function_Call)[],
  evaluatedVars: { [key: string]: string | number },
  globalVars: { [key: string]: string | number | (string | number)[] },
  formState: IFormStateContext,
  functionMap: FunctionsContext
): (string | number)[] => {
  let argValues: (string | number)[] = [];

  args.forEach((arg) => {
    const functionEvaluator: FunctionEvaluator = new FunctionEvaluator();
    const context: FunctionEvaluatorContext = {
      formState,
      vars: evaluatedVars,
      globalVars,
      functions: functionMap,
      passedArguments: [],
      returnValue: 0,
    };

    functionEvaluator.visit(context, arg);
    argValues.push(context.returnValue);
  });

  return argValues;
};

export const evaluateVars = (
  vars: Vars[],
  evaluatedVars: { [key: string]: string | number },
  globalVars: { [key: string]: string | number | (string | number)[] },
  formState: IFormStateContext,
  functionMap: FunctionsContext
) => {
  const currentEvaluatedVars = evaluatedVars;

  if (vars) {
    for (let variable of vars) {
      for (let [key, functionBinding] of Object.entries(variable)) {
        if (
          typeof functionBinding.value === "string" ||
          typeof functionBinding.value === "number"
        ) {
          // Function binding value is a string / number
          currentEvaluatedVars[key] = functionBinding.value;
        } else if (typeof functionBinding.value === "function") {
          if (!functionBinding.args) {
            // Function Binding is function without arguments
            currentEvaluatedVars[key] = functionBinding.value();
          } else {
            // Function Binding is function with arguments
            let args = getArgValues(
              functionBinding.args,
              currentEvaluatedVars,
              globalVars,
              formState,
              functionMap
            );
            currentEvaluatedVars[key] = functionBinding.value(args);
          }
        } else {
          // function binding is a FunctionCustom and needs to be evaluated
          const functionEvaluator = new FunctionEvaluator();
          const context: FunctionEvaluatorContext = {
            formState,
            globalVars,
            passedArguments: functionBinding.args,
            vars: { ...currentEvaluatedVars },
            functions: functionMap,
            returnValue: 0,
          };
          functionEvaluator.visit(context, functionBinding.value);
          currentEvaluatedVars[key] = context.returnValue;
        }
      }
    }
  }
  return { currentEvaluatedVars, globalVars };
};

// Return true if objects are different, otherwise return false
export const compareObjects = (
  obj1: { [key: string]: string | number },
  obj2: { [key: string]: string | number }
): boolean => {
  for (const key in Object.keys(obj1)) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) return true;
  }

  for (const key in Object.keys(obj2)) {
    if (!obj1.hasOwnProperty(key) || obj1[key] !== obj2[key]) return true;
  }

  return false;
};

export const evaluateOptions = (
  options: { value: string | number | VariableName }[] | VariableName,
  vars: { [key: string]: string | number | (string | number)[] },
  globalVars: { [key: string]: string | number | (string | number)[] },
  formState: Map<string, Map<string, string>>,
  functions: FunctionsContext
): (string | number)[] => {
  const context: FunctionEvaluatorContext = {
    formState,
    globalVars,
    vars: { ...vars },
    functions,
    returnValue: 0,
  };
  const functionEvaluator = new FunctionEvaluator();

  functionEvaluator.visit(context, options);

  return context.returnValue;

  //   console.log("options from evaluateOptions: ", options);
  //   let evaluatedOptions: (string | number)[] = [];

  //   if (options instanceof VariableName) {
  //     if (vars.hasOwnProperty(options.getName())) {
  //       let evaluatedOptionsTest = vars[options.getName()];
  //       if (evaluatedOptionsTest instanceof Array) {
  //         evaluatedOptions = evaluatedOptionsTest;
  //       } else {
  //         evaluatedOptions.push(evaluatedOptionsTest);
  //       }
  //     } else {
  //       let evaluatedOptionsTest = globalVars[options.getName()];
  //       if (evaluatedOptionsTest instanceof Array) {
  //         evaluatedOptions = evaluatedOptionsTest;
  //       }
  //     }
  //     return evaluatedOptions;
  //   }

  //   options.forEach((option) => {
  //     if (typeof option.value === "string" || typeof option.value === "number") {
  //       evaluatedOptions.push(option.value);
  //     } else {
  //       if (vars.hasOwnProperty(option.value.getName())) {
  //         evaluatedOptions.push(vars[option.value.getName()]);
  //       } else {
  //         evaluatedOptions.push(globalVars[option.value.getName()]);
  //       }
  //     }
  //   });
  //   return evaluatedOptions;
};
