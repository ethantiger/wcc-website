import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

interface UseFirestore {
  addDocument: (doc: Record<string, any>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  updateDocument: (id: string, updates: Record<string, any>) => Promise<void>;
}

export const useFirestore = (col: string): UseFirestore => {
  // Collection reference
  const ref = collection(db, col);

  // Add a document
  const addDocument = async (doc: Record<string, any>): Promise<void> => {
    const createdAt = new Date();
    await addDoc(ref, { ...doc, createdAt });
  };

  // Delete a document
  const deleteDocument = async (id: string): Promise<void> => {
    const docRef = doc(db, col, id);
    await deleteDoc(docRef);
  };

  // Update a document
  const updateDocument = async (id: string, updates: Record<string, any>): Promise<void> => {
    const docRef = doc(db, col, id);
    await updateDoc(docRef, updates);
  };

  return { addDocument, deleteDocument, updateDocument };
};