import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { FunctionsContext } from "../AST/Evaluator/FunctionEvaluator";

export type IFormStateContext = Map<string, Map<string, string>>;

export interface IGlobalQuizContext {
  functionMap: FunctionsContext;
  setFunctionMap: Dispatch<SetStateAction<FunctionsContext>>;
  formState: Map<string, Map<string, string>>;
  setFormState: Dispatch<SetStateAction<Map<string, Map<string, string>>>>;
}

// Context storing function definitions and global variables
export const GlobalQuizContext = createContext<IGlobalQuizContext>({
  functionMap: {},
  setFunctionMap: () => {},
  formState: new Map(),
  setFormState: () => {},
});

export const useGlobalQuizContext = () => useContext(GlobalQuizContext);

export const GlobalQuizContextProvider = ({ children }: any) => {
  const [functionMap, setFunctionMap] = useState<FunctionsContext>({});
  const [formState, setFormState] = useState<IFormStateContext>(new Map());

  return (
    <GlobalQuizContext.Provider
      value={{ functionMap, setFunctionMap, formState, setFormState }}
    >
      {children}
    </GlobalQuizContext.Provider>
  );
};
