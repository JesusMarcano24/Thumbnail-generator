//React Router Dom
import { Route, Routes } from "react-router-dom";

//Components
import Home from "./Pages/Home";
import CropImage from "./Pages/CropImage";
import Resize from "./Pages/Resize";
import NotFound from "./Common/NotFound";
import Images from "./Pages/Images";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Crop" element={<CropImage />}></Route>
        <Route path="/Resize" element={<Resize />}></Route>
        <Route path="/Images" element={<Images />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
