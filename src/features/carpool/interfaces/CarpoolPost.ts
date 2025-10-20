import { CarpoolStatusEnum } from "../enums/CarpoolStatusEnum";
import { Timestamp } from "firebase/firestore";


export default interface CarpoolPost {
  id: string;
  userId: string;
  location: string;
  destination: string;
  description: string;
  maxPeople: number;
  carType: string;
  status: CarpoolStatusEnum;
  people: string[];
  requests: string[]; // Array of user IDs who have requested to join
  targetDate: Timestamp;
  createdAt: Timestamp;
}