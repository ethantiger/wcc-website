import { EventCategoryEnum } from "../enums/EventCategoryEnum";


export default interface Event {
  id: string;
  category: EventCategoryEnum;
  date: string;
  title: string;
  src: string;
}