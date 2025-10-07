import { useState, useEffect } from 'react';
import { doc, getDoc, getDocFromCache, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import collections from '@/firebase/collections';
import CarpoolPost from '@/features/carpool/interfaces/CarpoolPost';
import User from '@/features/carpool/interfaces/User';

interface UseCarpoolWithUserResult {
  carpool: CarpoolPost | null;
  user: User | null;
  carpoolUsers: User[]; // Array of all users in the carpool
  carpoolLoading: boolean;
  userLoading: boolean;
  carpoolUsersLoading: boolean;
  carpoolError: string | null;
  userError: string | null;
}

export function useCarpoolWithUser(
  carpoolId: string,
  cacheExpiryMinutes: number = 5 // Cache expires after 5 minutes by default
): UseCarpoolWithUserResult {
  const [carpool, setCarpool] = useState<CarpoolPost | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [carpoolUsers, setCarpoolUsers] = useState<User[]>([]); // All users in carpool
  const [carpoolLoading, setCarpoolLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(false);
  const [carpoolUsersLoading, setCarpoolUsersLoading] = useState(false);
  const [carpoolError, setCarpoolError] = useState<string | null>(null);
  const [userError, setUserError] = useState<string | null>(null);

  // Cache key for user data
  const getUserCacheKey = (userId: string) => `user_${userId}`;

  // Check if user cache is expired
  const isUserCacheExpired = (userId: string) => {
    if (!cacheExpiryMinutes) return false;
    
    const cacheKey = getUserCacheKey(userId);
    const lastFetch = localStorage.getItem(`${cacheKey}_timestamp`);
    if (!lastFetch) return true;
    
    const timeSinceLastFetch = Date.now() - parseInt(lastFetch);
    const expiryTime = cacheExpiryMinutes * 60 * 1000; // Convert to milliseconds
    
    return timeSinceLastFetch > expiryTime;
  };

  useEffect(() => {
    if (!carpoolId) {
      setCarpoolLoading(false);
      return;
    }

    setCarpoolLoading(true);
    setCarpoolError(null);
    
    const carpoolRef = doc(db, collections.carpoolCollection, carpoolId);
    
    // Set up snapshot listener for real-time carpool updates
    const unsubscribe = onSnapshot(
      carpoolRef,
      (carpoolSnap) => {
        if (!carpoolSnap.exists()) {
          setCarpoolError('Carpool not found');
          setCarpoolLoading(false);
          setCarpool(null);
          setUser(null);
          return;
        }

        const carpoolData = { id: carpoolSnap.id, ...carpoolSnap.data() } as CarpoolPost;
        setCarpool(carpoolData);
        setCarpoolLoading(false);

        // Fetch user data when carpool updates (with caching)
        if (carpoolData.userId) {
          fetchUserWithCache(carpoolData.userId);
        } else {
          setUser(null);
          setUserLoading(false);
        }

        // Fetch all users in the carpool (driver + passengers)
        if (carpoolData.people && carpoolData.people.length > 0) {
          fetchCarpoolUsers(carpoolData.people);
        } else {
          setCarpoolUsers([]);
          setCarpoolUsersLoading(false);
        }
      },
      (error) => {
        setCarpoolError(error.message);
        setCarpoolLoading(false);
        console.error('Error listening to carpool:', error);
      }
    );

    // Cleanup function to unsubscribe from the listener
    return () => {
      unsubscribe();
    };
  }, [carpoolId, cacheExpiryMinutes]);

  // Separate function to fetch user data with caching
  const fetchUserWithCache = async (userId: string) => {
    try {
      setUserLoading(true);
      setUserError(null);
      
      const userRef = doc(db, collections.usersCollection, userId);
      const cacheExpired = isUserCacheExpired(userId);
      const cacheKey = getUserCacheKey(userId);
      
      // Try to get from cache first (if not expired)
      if (!cacheExpired) {
        try {
          const cachedUserSnap = await getDocFromCache(userRef);
          if (cachedUserSnap.exists()) {
            console.log(`👤 User ${userId} loaded from: CACHE (valid)`);
            setUser({ id: cachedUserSnap.id, ...cachedUserSnap.data() } as User);
            setUserLoading(false);
            return;
          }
        } catch (cacheError) {
          console.log(`👤 Cache miss for user: ${userId}`);
        }
      } else {
        console.log(`👤 Cache expired for user: ${userId}, fetching from server`);
      }

      // Fallback to network if cache miss or expired
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser({ id: userSnap.id, ...userSnap.data() } as User);
        localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
        console.log(`👤 User ${userId} loaded from: SERVER`);
      } else {
        // Create fallback user object
        setUser({
          id: userId,
          displayName: userId,
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
        id: userId,
        displayName: userId,
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
  };

  // Function to fetch multiple users with caching
  const fetchCarpoolUsers = async (userIds: string[]) => {
    try {
      setCarpoolUsersLoading(true);
      
      const users: User[] = [];
      
      for (const userId of userIds) {
        const userRef = doc(db, collections.usersCollection, userId);
        const cacheExpired = isUserCacheExpired(userId);
        const cacheKey = getUserCacheKey(userId);
        
        let userData: User | null = null;
        
        // Try to get from cache first (if not expired)
        if (!cacheExpired) {
          try {
            const cachedUserSnap = await getDocFromCache(userRef);
            if (cachedUserSnap.exists()) {
              console.log(`👥 Carpool user ${userId} loaded from: CACHE (valid)`);
              userData = { id: cachedUserSnap.id, ...cachedUserSnap.data() } as User;
            }
          } catch (cacheError) {
            console.log(`👥 Cache miss for carpool user: ${userId}`);
          }
        }
        
        // Fallback to network if cache miss or expired
        if (!userData) {
          try {
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              userData = { id: userSnap.id, ...userSnap.data() } as User;
              localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
              console.log(`👥 Carpool user ${userId} loaded from: SERVER`);
            } else {
              // Create fallback user object
              userData = {
                id: userId,
                displayName: userId,
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
              };
            }
          } catch (err) {
            console.error(`Error fetching carpool user ${userId}:`, err);
            // Create fallback user object
            userData = {
              id: userId,
              displayName: userId,
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
            };
          }
        }
        
        if (userData) {
          users.push(userData);
        }
      }
      
      setCarpoolUsers(users);
    } catch (err) {
      console.error('Error fetching carpool users:', err);
      setCarpoolUsers([]);
    } finally {
      setCarpoolUsersLoading(false);
    }
  };

  return {
    carpool,
    user,
    carpoolUsers,
    carpoolLoading,
    userLoading,
    carpoolUsersLoading,
    carpoolError,
    userError
  };
}