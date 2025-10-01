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
  id: string | null,
  cacheExpiryMinutes: number = 5 // Cache expires after 5 minutes by default
): UseCachedDocumentResult<T> => {
  const [document, setDocument] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Cache key for this specific document
  const cacheKey = `document_${col}_${id}`;

  // Check if cache is expired
  const isCacheExpired = () => {
    if (!cacheExpiryMinutes) return false;
    
    const lastFetch = localStorage.getItem(`${cacheKey}_timestamp`);
    if (!lastFetch) return true;
    
    const timeSinceLastFetch = Date.now() - parseInt(lastFetch);
    const expiryTime = cacheExpiryMinutes * 60 * 1000; // Convert to milliseconds
    
    return timeSinceLastFetch > expiryTime;
  };

  useEffect(() => {
    if (!id) {
      setDocument(null);
      setError("No document ID provided");
      setLoading(false);
      return;
    }

    const fetchDocument = async () => {
      const docRef = doc(db, col, id);
      const cacheExpired = isCacheExpired();
      
      try {
        setLoading(true);
        setError(null);
        
        // First, try to get from cache (if not expired)
        if (!cacheExpired) {
          try {
            const cachedDoc = await getDocFromCache(docRef);
            if (cachedDoc.exists()) {
              console.log(`📄 Document ${id} loaded from: CACHE (valid)`);
              setDocument({ ...cachedDoc.data(), id: cachedDoc.id } as T);
              setLoading(false);
              return;
            }
          } catch (cacheError) {
            // Cache miss, continue to network request
            console.log(`📄 Cache miss for document: ${id}`);
          }
        } else {
          console.log(`📄 Cache expired for document: ${id}, fetching from server`);
        }
        
        // If not in cache or cache expired, fetch from server
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocument({ ...docSnap.data(), id: docSnap.id } as T);
          localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
          console.log(`📄 Document ${id} loaded from: SERVER`);
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
  }, [col, id, cacheExpiryMinutes]);

  return { document, error, loading };
};