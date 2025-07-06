import { BrowserRouter, Routes, Route } from "react-router-dom";

import ParallaxMountains from "./components/ParallaxMountain"
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<ParallaxMountains />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
