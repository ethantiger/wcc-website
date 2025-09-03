import { Timestamp } from "firebase/firestore";
import { EventCategoryEnum } from "../enums/EventCategoryEnum";


export default interface Event {
  id: string;
  category: EventCategoryEnum;
  date: Timestamp;
  title: string;
  src: string;
  location: string;
}