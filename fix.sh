#!/bin/bash

echo "🛠️ Fixing MediLink build setup..."

mkdir -p src/lib src/hooks

cat > src/lib/firebase.ts <<'EOL'
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
EOL

cat > src/hooks/use-auth.ts <<'EOL'
"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
  const signup = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return { user, loading, login, signup, logout };
}
EOL

cat > next.config.ts <<'EOL'
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
export default nextConfig;
EOL

cat > netlify.toml <<'EOL'
[build]
  command = "npm run build && npx next export"
  publish = "out"
EOL

echo "✅ Fix files created!"
echo "Installing dependencies..."
npm install

echo "🚀 Building your Next.js app..."
npm run build

echo "🎉 All fixed! You can now deploy with:"
echo "npx netlify deploy --prod --dir=out"
