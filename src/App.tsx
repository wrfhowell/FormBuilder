import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Main } from "./Components/Main";
import { Page } from "./Components/Page";
import { IPage } from "./Components/Interfaces";
import React from "react";
import { GlobalQuizContextProvider } from "./Components/Context";

function App() {
  const [pages, setPages] = useState<IPage[]>();
  return (
    <div className="App">
      <GlobalQuizContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main setPagesObj={setPages} />} />
            {pages?.map((page) => (
              <Route
                key={page.id}
                path={page.id}
                element={<Page page={page} iteration={0} />}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </GlobalQuizContextProvider>
    </div>
  );
}

export default App;
