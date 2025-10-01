import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, getDocs, getDocsFromCache, query, where, orderBy, Query, DocumentData, WhereFilterOp } from 'firebase/firestore';

interface UseCollectionResult<T> {
  documents: T[] | null;
  error: string | null;
  fromCache?: boolean;
  loading?: boolean;
}

export function useCollection<T extends { id: string }>(
  col: string,
  _q?: [string, WhereFilterOp, any] | null,
  _order?: [string, 'asc' | 'desc'] | null,
  useSnapshotListener: boolean = false,
  preferCache: boolean = false, // Add conditional caching option
  cacheExpiryMinutes: number = 5 // Cache expires after 5 minutes by default
): UseCollectionResult<T> {
  const [documents, setDocuments] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const q = useRef(_q).current;
  const order = useRef(_order).current;

  // Cache key for this specific query
  const cacheKey = `collection_${col}_${JSON.stringify(q)}_${JSON.stringify(order)}`;

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
    setLoading(true);
    let ref: Query<DocumentData> = collection(db, col);

    if (q && order) {
      ref = query(ref, where(...q), orderBy(...order));
    } else if (q) {
      ref = query(ref, where(...q));
    } else if (order) {
      ref = query(ref, orderBy(...order));
    }

    if (useSnapshotListener) {
      const unsub = onSnapshot(
        ref,
        (snapshot) => {
          const isFromCache = snapshot.metadata.fromCache;
          const results: T[] = [];
          
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id } as T);
          });

          console.log(`📚 Collection ${col} loaded from:`, isFromCache ? 'CACHE' : 'SERVER');
          console.log(`📊 Documents count: ${results.length}`);
          
          setDocuments(results);
          setFromCache(isFromCache);
          setError(null);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setError('Could not fetch the data');
          setFromCache(false);
          setLoading(false);
        }
      );
      return () => unsub();
    } else {
      // One-time fetch with optional cache-first strategy
      const fetchData = async () => {
        try {
          let snapshot;
          let isFromCache = false;
          const cacheExpired = isCacheExpired();

          if (preferCache && !cacheExpired) {
            try {
              // Try cache first (if not expired)
              snapshot = await getDocsFromCache(ref);
              isFromCache = true;
              console.log(`📚 Collection ${col} loaded from: CACHE (valid)`);
            } catch (cacheError) {
              // Fall back to server
              console.log(`📚 Cache miss for ${col}, falling back to server`);
              snapshot = await getDocs(ref);
              isFromCache = false;
              localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
              console.log(`📚 Collection ${col} loaded from: SERVER`);
            }
          } else {
            // Fetch from server (cache expired or not preferred)
            if (cacheExpired) {
              console.log(`📚 Cache expired for ${col}, fetching from server`);
            }
            snapshot = await getDocs(ref);
            isFromCache = snapshot.metadata.fromCache;
            localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
            console.log(`📚 Collection ${col} loaded from:`, isFromCache ? 'CACHE' : 'SERVER');
          }

          const results: T[] = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id } as T);
          });

          console.log(`📊 Documents count: ${results.length}`);
          
          setDocuments(results);
          setFromCache(isFromCache);
          setError(null);
        } catch (error) {
          console.error(error);
          setError('Could not fetch the data');
          setFromCache(false);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [col, q, order, useSnapshotListener, preferCache, cacheExpiryMinutes]);

  return { documents, error, fromCache, loading };
}