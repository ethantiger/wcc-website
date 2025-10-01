import { signInWithEmailAndPassword, signInWithPopup, OAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import collections from "../firebase/collections";

interface UseLoginResult {
  login: (email: string, password: string) => Promise<void>;
  loginWithMicrosoft: () => Promise<void>;
  error: string | null;
  isPending: boolean;
}

export const useLogin = (): UseLoginResult => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const createUserDocument = async (user: any) => {
    try {
      const userRef = doc(db, collections.usersCollection, user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // Extract provider-specific info
        const providerData = user.providerData[0] || {};
        
        await setDoc(userRef, {
          id: user.uid,
          email: user.email,
          displayName: user.displayName || providerData.displayName || user.email?.split('@')[0] || 'Unknown User',
          photoURL: user.photoURL || providerData.photoURL || null,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber || null,
          providerId: providerData.providerId || 'email',
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          metadata: {
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
          },
        });
      } else {
        // Update last login time for existing users
        await setDoc(userRef, {
          lastLogin: serverTimestamp(),
          metadata: {
            ...userSnap.data().metadata,
            lastSignInTime: user.metadata.lastSignInTime,
          }
        }, { merge: true });
      }
    } catch (err) {
      console.error('Error creating/updating user document:', err);
      // Don't throw error - login should still succeed even if user doc creation fails
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      
      // Create or update user document in Firestore
      await createUserDocument(res.user);
      
      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  const loginWithMicrosoft = async (): Promise<void> => {
    setError(null);
    setIsPending(true);

    try {
      const provider = new OAuthProvider('microsoft.com');
      provider.setCustomParameters({ prompt: 'select_account' });

      const res = await signInWithPopup(auth, provider);
      
      // Create or update user document in Firestore
      await createUserDocument(res.user);
      
      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  }

  return { login, loginWithMicrosoft, error, isPending };
};