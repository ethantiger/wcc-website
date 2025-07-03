import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

interface UseLogoutResult {
  logout: () => Promise<void>;
  error: string | null;
  isPending: boolean;
}

export const useLogout = (): UseLogoutResult => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const logout = async (): Promise<void> => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });

      setIsPending(false);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { logout, error, isPending };
};