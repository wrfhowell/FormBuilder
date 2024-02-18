import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { FunctionsContext } from "../AST/Evaluator/FunctionEvaluator";

export interface IFunctionContext {
  functionMap: FunctionsContext;
  setFunctionMap: Dispatch<SetStateAction<FunctionsContext>>;
}

// Context storing function definitions and global variables
export const GlobalQuizContext = createContext<IFunctionContext>({
  functionMap: {},
  setFunctionMap: () => {},
});

export const useGlobalQuizContext = () => useContext(GlobalQuizContext);

export const GlobalQuizContextProvider = ({ children }: any) => {
  const [functionMap, setFunctionMap] = useState<FunctionsContext>({});

  return (
    <GlobalQuizContext.Provider value={{ functionMap, setFunctionMap }}>
      {children}
    </GlobalQuizContext.Provider>
  );
};
