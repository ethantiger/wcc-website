import { Timestamp } from "firebase/firestore";


export default interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  createdAt: Timestamp;
  lastLogin: Timestamp;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
}