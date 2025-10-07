import { Routes, Route } from "react-router-dom";
import Carpool from "@/features/carpool/components/Carpool";
import CarpoolDetails from "@/features/carpool/components/CarpoolDetails";
import Profile from "@/features/profile/components/Profile";

export default function DashboardContent() {
  return (
    <Routes>
      <Route path="/carpool" element={<Carpool />} />
      <Route path="/carpool/:id" element={<CarpoolDetails />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}