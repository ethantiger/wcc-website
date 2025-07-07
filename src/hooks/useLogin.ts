import { signInWithEmailAndPassword, signInWithPopup, OAuthProvider } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

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

  const login = async (email: string, password: string): Promise<void> => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
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