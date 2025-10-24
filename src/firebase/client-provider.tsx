'use client';

import { initializeFirebase, FirebaseProvider } from '@/firebase';

let firebase: ReturnType<typeof initializeFirebase>;

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!firebase) {
    firebase = initializeFirebase();
  }
  return (
    <FirebaseProvider
      firebaseApp={firebase.firebaseApp}
      auth={firebase.auth}
      firestore={firebase.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
