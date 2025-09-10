import { Timestamp } from "firebase/firestore";
import { EventCategoryEnum } from "../enums/EventCategoryEnum";

interface Link {
  href: string;
  label: string;
}

export default interface Event {
  id: string;
  src: string;
  title: string;
  category: EventCategoryEnum;
  date: Timestamp;
  location: string;
  description?: string;
  link?: Link;
  additionalLinks?: Link[];
}