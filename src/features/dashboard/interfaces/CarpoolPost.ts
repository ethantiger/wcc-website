import { CarpoolStatusEnum } from "../enums/CarpoolStatusEnum";
import { Timestamp, DocumentReference } from "firebase/firestore";


export default interface CarpoolPost {
  id: string;
  userId: DocumentReference;
  location: string;
  destination: string;
  description: string;
  maxPeople: number;
  carType: string;
  status: CarpoolStatusEnum;
  people: string[];
  targetDate: Timestamp;
  createdAt: Timestamp;
}