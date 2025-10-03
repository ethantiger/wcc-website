import { Routes, Route } from "react-router-dom";
import Carpool from "@/features/carpool/components/Carpool";
import CarpoolDetails from "@/features/carpool/components/CarpoolDetails";
import Profile from "@/features/profile/components/Profile";

import collections from "@/firebase/collections";
import { useCollection } from "@/hooks/useCollection"
import CarpoolPost from "@/features/carpool/interfaces/CarpoolPost";


export default function DashboardContent() {
const { documents } = useCollection<CarpoolPost>(collections.carpoolCollection);

  return (
    <Routes>
      <Route path="/carpool" element={<Carpool carpools={documents} />} />
      <Route path="/carpool/:id" element={<CarpoolDetails />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}