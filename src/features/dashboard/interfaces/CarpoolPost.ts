import { CarpoolStatusEnum } from "../components/enums/CarpoolStatusEnum";


export default interface CarpoolPost {
  id: string;
  userId: string;
  location: string;
  maxPeople: number;
  carType: string;
  status: CarpoolStatusEnum;
  people: string[];
  targetDate: Date;
  createdAt: Date;
}