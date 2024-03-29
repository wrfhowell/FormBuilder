import { Function_Call } from "src/AST/Nodes/Function_Call";
import {
  FunctionEvaluator,
  VarsContext,
} from "src/AST/Evaluator/FunctionEvaluator";
import { FunctionEvaluatorContext } from "src/AST/Evaluator/FunctionEvaluator";
import { IFormStateContext } from "../Components/Context";
import { FunctionsContext } from "../AST/Evaluator/FunctionEvaluator";
import { FunctionBinding, Vars } from "../Components/Interfaces";
import { VariableName } from "src/AST/Nodes/VariableName";

export const getArgValues = (
  args: (string | number | Function_Call)[],
  evaluatedVars: { [key: string]: string | number | (string | number)[] },
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
  evaluatedVars: { [key: string]: string | number | (string | number)[] },
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
  options:
    | { value: string | number | VariableName }[]
    | VariableName
    | FunctionBinding,
  vars: { [key: string]: string | number | (string | number)[] },
  globalVars: { [key: string]: string | number | (string | number)[] },
  formState: Map<string, Map<string, string>>,
  functions: FunctionsContext
): (string | number)[] => {
  let optionsArgs: (string | number | Function_Call)[] = [];
  let nodeToVisit;
  if (!(options instanceof Array) && !(options instanceof VariableName)) {
    // Options is a FunctionBinding

    if (options.args) {
      optionsArgs = getArgValues(
        options.args,
        { ...vars },
        { ...globalVars },
        formState,
        functions
      );
    }

    nodeToVisit = options.value;
  } else {
    nodeToVisit = options;
  }

  const context: FunctionEvaluatorContext = {
    formState,
    globalVars,
    vars: { ...vars },
    functions,
    returnValue: 0,
    passedArguments: optionsArgs,
  };
  const functionEvaluator = new FunctionEvaluator();

  functionEvaluator.visit(context, nodeToVisit);

  return context.returnValue;
};

export const evaluateProperty = (
  property: string | FunctionBinding | VariableName,
  formState: Map<string, Map<string, string>>,
  functionMap: FunctionsContext,
  vars: VarsContext
): string => {
  let propertyValue: string = "";

  if (typeof property === "string" || typeof property === "number") {
    return property;
  } else if (property instanceof VariableName) {
    const functionEvaluator = new FunctionEvaluator();
    const updatedGlobalVars = { ...window.globalVars };
    const context: FunctionEvaluatorContext = {
      formState,
      vars,
      globalVars: updatedGlobalVars,
      functions: functionMap,
      returnValue: 0,
    };
    functionEvaluator.visit(context, property);
    window.globalVars = updatedGlobalVars;
    return context.returnValue;
  }

  if (typeof property.value === "function") {
    if (!property.args) {
      propertyValue = property.value().toString();
    } else {
      let args = getArgValues(
        property.args,
        vars,
        { ...window.globalVars },
        formState,
        functionMap
      );
      propertyValue = property.value(args).toString();
    }
  } else if (
    typeof property.value === "number" ||
    typeof property.value === "string"
  ) {
    propertyValue = property.value.toString();
  } else {
    const functionEvaluator = new FunctionEvaluator();
    const updatedGlobalVars = { ...window.globalVars };

    let context: FunctionEvaluatorContext = {
      formState,
      passedArguments: property.args,
      vars,
      globalVars: updatedGlobalVars,
      functions: functionMap,
      returnValue: 0,
    };
    functionEvaluator.visit(context, property.value);
    window.globalVars = updatedGlobalVars;
    propertyValue = context.returnValue;
  }
  return propertyValue.toString();
};
