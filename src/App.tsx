//React Router Dom
import { Route, Routes } from "react-router-dom";

//Components
import Home from "./Pages/Home";
import CropImage from "./Pages/CropImage";
import Resize from "./Pages/Resize";
import NotFound from "./Common/NotFound";
import Images from "./Pages/Images";

function App() {dsfsdf
  return (sdfsdf
    <>
      <Routes>
        <Route path="/" elemensdfsdfsdfsdt={<Home />}></Route>
        <Route path="/Crop" elemefsdfsdfsdfnt={<CropImage />}></Route>
        <Route path="/Resize" eledsfdsfsdfsdfment={<Resize />}></Route>
        <Route path="/images" elementsdfsdfsdf={<Images />}></Route>
        <Route path="*"fsdfsdfsdf element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
