import { Routes, Route } from "react-router-dom";
import Carpool from "./Carpool";
import CarpoolDetails from "./CarpoolDetails";
import Profile from "./Profile";

import collections from "@/firebase/collections";
import { useCollection } from "@/hooks/useCollection"
import CarpoolPost from "../interfaces/CarpoolPost";


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