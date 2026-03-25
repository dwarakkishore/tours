"use client";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({
    displayName: null,
    email: null,
    photoURL: null,
    emailVerified: false,
    phoneNumber: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Delay initialization to avoid blocking critical path
    const initAuth = () => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        if (user) {
          setUserInfo({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            phoneNumber: auth.currentUser?.phoneNumber || user.phoneNumber,
          });
        }
        setLoading(false);
      });
      return unsubscribe;
    };

    let unsubscribe;
    const timer = setTimeout(() => {
      unsubscribe = initAuth();
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const refreshUserInfo = async () => {
    await auth.currentUser?.reload();
    if (auth.currentUser) {
      setUserInfo({
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
        emailVerified: auth.currentUser.emailVerified,
        phoneNumber: auth.currentUser.phoneNumber,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, userInfo, refreshUserInfo, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
