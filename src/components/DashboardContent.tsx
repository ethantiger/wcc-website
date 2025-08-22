import { Routes, Route } from "react-router-dom";
import Carpool from "./Carpool";
import Profile from "./Profile";

export default function DashboardContent() {
  return (
    <Routes>
      <Route path="/carpool" element={<Carpool />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}