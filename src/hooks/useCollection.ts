import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, where, orderBy, Query, DocumentData, WhereFilterOp } from 'firebase/firestore';

interface UseCollectionResult {
  documents: DocumentData[] | null;
  error: string | null;
}

export const useCollection = (
  col: string,
  _q?: [string, WhereFilterOp, any] | null,
  _order?: [string, 'asc' | 'desc'] | null
): UseCollectionResult => {
  const [documents, setDocuments] = useState<DocumentData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Prevent infinite loop in useEffect by using refs
  const q = useRef(_q).current;
  const order = useRef(_order).current;

  useEffect(() => {
    let ref: Query<DocumentData> = collection(db, col);

    if (q && order) {
      ref = query(ref, where(...q), orderBy(...order));
    } else if (q) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        const results: DocumentData[] = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // Update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.error(error);
        setError('Could not fetch the data');
      }
    );

    // Unsubscribe on unmount
    return () => unsub();
  }, [col, q, order]);

  return { documents, error };
};