import React from "react";

//React Router Dom
import { Route, Routes } from "react-router-dom";

//Components
import Home from "./Pages/home";
import Crop from "./Pages/Crop";
import Resize from "./Pages/Resize";
import NotFound from "./Common/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Crop" element={<Crop />}></Route>
        <Route path="/Resize" element={<Resize />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;