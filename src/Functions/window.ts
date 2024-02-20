declare global {
  interface Window {
    globalVars: GlobalVarsType;
  }
}

export type GlobalVarsType = {
  [key: string]: string | number | (string | number)[];
};

export const getGlobalVariables = () => {
  return window.globalVars;
};

export const setGlobalVariables = (vars: GlobalVarsType) => {
  window.globalVars = vars;
};
