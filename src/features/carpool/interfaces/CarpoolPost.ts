import { CarpoolStatusEnum } from "../enums/CarpoolStatusEnum";
import { Timestamp } from "firebase/firestore";
import { CarpoolTypeEnum } from "../enums/CarpoolTypeEnum";


export default interface CarpoolPost {
  id: string;
  userId: string;
  location: string;
  destination: string;
  description: string;
  maxPeople: number;
  carType: string;
  type: CarpoolTypeEnum;
  status: CarpoolStatusEnum;
  people: string[];
  requests: string[]; // Array of user IDs who have requested to join
  targetDate: Timestamp;
  createdAt: Timestamp;
}