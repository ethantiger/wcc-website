import { Timestamp } from "firebase/firestore";

interface DateString {
  date: string;
  time: string;
}

export function convertTimestampToDate(timestamp: Timestamp): DateString {
  const date = timestamp.toDate().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const time = timestamp.toDate().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })
  return { date, time }
}
