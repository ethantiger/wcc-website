import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carpool from "./Carpool";

export default function DashboardContent() {
  return (
    <Routes>
      <Route path="/carpool" element={<Carpool />} />
      <Route path="/profile" element={<div>Profile Page</div>} />
    </Routes>
  );
}