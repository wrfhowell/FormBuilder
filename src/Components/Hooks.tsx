import { useState } from "react";

export const useFileUpload = () => {
  const [fileContents, setFileContents] = useState<string>("");

  const uploadFile = (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = async (e: any) => {
      setFileContents(e.target.result);
    };
    fileReader.readAsText(e.target.files[0]);
  };

  return { uploadFile, fileContents };
};
