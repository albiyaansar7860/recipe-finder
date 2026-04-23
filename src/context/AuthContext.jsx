import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubUser = null;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (unsubUser) {
          unsubUser();
          unsubUser = null;
        }

        if (user) {
          setCurrentUser(user);
          const userRef = doc(db, 'users', user.uid);
          
          // Initial fetch with 5-second timeout to prevent hangups
          try {
            const userDoc = await Promise.race([
              getDoc(userRef),
              new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000))
            ]);
            
            if (userDoc && userDoc.exists()) {
              setUserData(userDoc.data());
            }
          } catch (err) {
            console.warn("Initial user data fetch failed or timed out:", err);
            // We continue anyway so the app doesn't hang
          }

          // Real-time listener (handled separately)
          unsubUser = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
              setUserData(doc.data());
            }
          }, (err) => console.error("Snapshot error:", err));

        } else {
          setCurrentUser(null);
          setUserData(null);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      if (unsubUser) unsubUser();
    };
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    isAdmin: userData?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-emerald-50 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 border-t-4 border-emerald-500 rounded-full animate-spin"></div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-slate-900 font-black uppercase tracking-[0.3em] text-sm">Recipe Finder</p>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest animate-pulse">Synchronizing Cloud Data</p>
          </div>
        </div>
      ) : children}
    </AuthContext.Provider>
  );
};
