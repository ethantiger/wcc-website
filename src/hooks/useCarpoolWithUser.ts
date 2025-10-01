import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import collections from '@/firebase/collections';
import CarpoolPost from '@/features/dashboard/interfaces/CarpoolPost';
import User from '@/features/dashboard/interfaces/User';

interface UseCarpoolWithUserResult {
  carpool: CarpoolPost | null;
  user: User | null;
  carpoolLoading: boolean;
  userLoading: boolean;
  carpoolError: string | null;
  userError: string | null;
}

export function useCarpoolWithUser(carpoolId: string): UseCarpoolWithUserResult {
  const [carpool, setCarpool] = useState<CarpoolPost | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [carpoolLoading, setCarpoolLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(false);
  const [carpoolError, setCarpoolError] = useState<string | null>(null);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    if (!carpoolId) {
      setCarpoolLoading(false);
      return;
    }

    const fetchCarpoolAndUser = async () => {
      try {
        // Step 1: Fetch carpool
        setCarpoolLoading(true);
        setCarpoolError(null);
        
        const carpoolRef = doc(db, collections.carpoolCollection, carpoolId);
        const carpoolSnap = await getDoc(carpoolRef);
        
        if (!carpoolSnap.exists()) {
          setCarpoolError('Carpool not found');
          setCarpoolLoading(false);
          return;
        }

        const carpoolData = { id: carpoolSnap.id, ...carpoolSnap.data() } as CarpoolPost;
        setCarpool(carpoolData);
        setCarpoolLoading(false);

        // Step 2: Fetch user based on carpool's userId
        if (carpoolData.userId) {
          try {
            setUserLoading(true);
            setUserError(null);
            
            const userRef = doc(db, collections.usersCollection, carpoolData.userId);
            const userSnap = await getDoc(userRef);
            
            if (userSnap.exists()) {
              setUser({ id: userSnap.id, ...userSnap.data() } as User);
            } else {
              // Create fallback user object
              setUser({
                id: carpoolData.userId,
                displayName: carpoolData.userId,
                email: '',
                photoURL: null,
                emailVerified: false,
                phoneNumber: null,
                createdAt: null as any,
                lastLogin: null as any,
                metadata: {
                  creationTime: '',
                  lastSignInTime: ''
                }
              });
            }
          } catch (err) {
            setUserError(err instanceof Error ? err.message : 'Failed to fetch user');
            // Fallback user
            setUser({
              id: carpoolData.userId,
              displayName: carpoolData.userId,
              email: '',
              photoURL: null,
              emailVerified: false,
              phoneNumber: null,
              createdAt: null as any,
              lastLogin: null as any,
              metadata: {
                creationTime: '',
                lastSignInTime: ''
              }
            });
          } finally {
            setUserLoading(false);
          }
        } else {
          setUserLoading(false);
        }

      } catch (err) {
        setCarpoolError(err instanceof Error ? err.message : 'Failed to fetch carpool');
        setCarpoolLoading(false);
        setUserLoading(false);
      }
    };

    fetchCarpoolAndUser();
  }, [carpoolId]);

  return {
    carpool,
    user,
    carpoolLoading,
    userLoading,
    carpoolError,
    userError
  };
}