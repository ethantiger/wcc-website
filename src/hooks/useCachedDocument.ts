import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, getDocFromCache, DocumentData } from "firebase/firestore";

interface UseCachedDocumentResult<T> {
  document: T | null;
  error: string | null;
  loading: boolean;
}

export const useCachedDocument = <T = DocumentData>(
  col: string, 
  id: string | null
): UseCachedDocumentResult<T> => {
  const [document, setDocument] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      setDocument(null);
      setError("No document ID provided");
      setLoading(false);
      return;
    }

    const fetchDocument = async () => {
      const docRef = doc(db, col, id);
      
      try {
        setLoading(true);
        setError(null);
        
        // First, try to get from cache
        try {
          const cachedDoc = await getDocFromCache(docRef);
          if (cachedDoc.exists()) {
            console.log("Document fetched from cache:", id);
            setDocument({ ...cachedDoc.data(), id: cachedDoc.id } as T);
            setLoading(false);
            return;
          }
        } catch (cacheError) {
          // Cache miss, continue to network request
          console.log("Cache miss for document:", id);
        }
        
        // If not in cache, fetch from server
        const doc = await getDoc(docRef);
        if (doc.exists()) {
          setDocument({ ...doc.data(), id: doc.id } as T);
        } else {
          setError("No such document exists");
          setDocument(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch document");
        setDocument(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [col, id]);

  return { document, error, loading };
};