import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot, DocumentData } from "firebase/firestore";

interface UseDocumentResult<T> {
  document: T | null;
  error: string | null;
}

export const useDocument = <T = DocumentData>(col: string, id: string | null): UseDocumentResult<T> => {
  const [document, setDocument] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!id) {
    setError("No document ID provided");
    return { document: null, error };
  }
  // Realtime data for document
  useEffect(() => {
    const docRef = doc(db, col, id);

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id } as T);
          setError(null);
        } else {
          setError("No such document exists");
        }
      },
      (err) => {
        console.error(err.message);
        setError("Failed to get document");
      }
    );

    return () => unsub();
  }, [col, id]);

  return { document, error };
};