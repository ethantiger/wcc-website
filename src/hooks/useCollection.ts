import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, getDocs, query, where, orderBy, Query, DocumentData, WhereFilterOp } from 'firebase/firestore';

interface UseCollectionResult<T> {
  documents: T[] | null;
  error: string | null;
}

export function useCollection<T extends { id: string }>(
  col: string,
  _q?: [string, WhereFilterOp, any] | null,
  _order?: [string, 'asc' | 'desc'] | null,
  useSnapshotListener: boolean = false
): UseCollectionResult<T> {
  const [documents, setDocuments] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const q = useRef(_q).current;
  const order = useRef(_order).current;

  useEffect(() => {
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
          const results: T[] = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id } as T);
          });
          setDocuments(results);
          setError(null);
        },
        (error) => {
          console.error(error);
          setError('Could not fetch the data');
        }
      );
      return () => unsub();
    } else {
      getDocs(ref)
        .then((snapshot) => {
          const results: T[] = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id } as T);
          });
          setDocuments(results);
          setError(null);
        })
        .catch((error) => {
          console.error(error);
          setError('Could not fetch the data');
        });
      return;
    }
  }, [col, q, order, useSnapshotListener]);

  return { documents, error };
}