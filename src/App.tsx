import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Homepage from "./pages/Homepage"
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <AppRoutes user={user} />
        </BrowserRouter>
      )}
    </div>
  )
}

// Separate component to use useLocation inside BrowserRouter
function AppRoutes({ user }: { user: any }) {
  const location = useLocation();

  return (
    <>
      {/* Only show Navbar if not on a /dashboard route */}
      {!location.pathname.includes("/dashboard") && <Navbar />}
      <Routes>
        <Route path="/*" element={<Homepage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard/carpool" /> : <Login />} />
        <Route path="/dashboard/*" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App
