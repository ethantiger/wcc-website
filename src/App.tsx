import { BrowserRouter, Routes, Route } from "react-router-dom";

import ParallaxMountains from "./components/ParallaxMountain"
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/*" element={<ParallaxMountains />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
