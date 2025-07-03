import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot, DocumentData } from "firebase/firestore";

interface UseDocumentResult {
  document: DocumentData | null;
  error: string | null;
}

export const useDocument = (col: string, id: string): UseDocumentResult => {
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Realtime data for document
  useEffect(() => {
    const docRef = doc(db, col, id);

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
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