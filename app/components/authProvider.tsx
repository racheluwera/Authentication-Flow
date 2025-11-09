
"use client";
import React, { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";

type AuthContextType = { user: User | null | undefined; loading: boolean };
const AuthContext = createContext<AuthContextType>({ user: undefined, loading: true });

export  function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

//   return <AuthContextType.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
