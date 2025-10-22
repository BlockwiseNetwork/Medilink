"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, User, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { UserProfile } from "./definitions";
import { createUserProfile, getUserProfile } from "./firestore";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  googleLogin: () => Promise<any>;
  signup: (email: string, pass: string, fullName: string, role: "Patient" | "Doctor") => Promise<any>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userProfile = await getUserProfile(user.uid);
        setProfile(userProfile);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };
  
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // Check if user profile exists, if not, create one.
    // This is a simplified flow. In a real app, you might redirect to a page to ask for their role.
    const userProfile = await getUserProfile(user.uid);
    if (!userProfile) {
      await createUserProfile(user.uid, user.displayName || "Google User", user.email!, "Patient");
    }
  }

  const signup = async (email: string, pass: string, fullName: string, role: "Patient" | "Doctor") => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;
    await createUserProfile(user.uid, fullName, email, role);
    // After creating profile, refetch it to update the context
    const userProfile = await getUserProfile(user.uid);
    setProfile(userProfile);
  };

  const logout = () => {
    return signOut(auth);
  };
  
  const value = { user, profile, loading, login, googleLogin, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
