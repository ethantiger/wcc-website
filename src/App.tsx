import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Homepage from "./pages/Homepage"
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      { authIsReady &&
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/*" element={<Homepage />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      }
    </div>
  )
}

export default App
