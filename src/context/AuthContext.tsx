import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc, enableNetwork, disableNetwork } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  isOnline: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// List of admin emails that don't require Firestore check
const HARDCODED_ADMINS = [
  'gururajbg4@gmail.com',
  'admin@example.com'  // Dummy admin email
];

// Hardcoded password for the dummy admin
const DUMMY_ADMIN_PASSWORD = 'Admin@123';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Handle online/offline state
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      enableNetwork(db).catch(console.error);
    };
    const handleOffline = () => {
      setIsOnline(false);
      disableNetwork(db).catch(console.error);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // First check if user is in hardcoded admin list
        const isHardcodedAdmin = HARDCODED_ADMINS.includes(user.email || '');
        if (isHardcodedAdmin) {
          setIsAdmin(true);
        } else if (isOnline) {
          try {
            // If not hardcoded admin, check Firestore
            const adminDoc = await getDoc(doc(db, 'admins', user.uid));
            setIsAdmin(adminDoc.exists());
          } catch (error) {
            console.error('Error checking admin status:', error);
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isOnline]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      if (isOnline) {
        try {
          // Check if this is the first time the user is signing in
          const adminDoc = await getDoc(doc(db, 'admins', user.uid));
          if (!adminDoc.exists() && HARDCODED_ADMINS.includes(user.email || '')) {
            // Add the owner as an admin
            await setDoc(doc(db, 'admins', user.uid), {
              email: user.email,
              isOwner: true,
              addedBy: 'system'
            });
          }
        } catch (error) {
          console.error('Error setting up admin:', error);
          // Continue with sign-in even if admin setup fails
        }
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      // Check if this is the dummy admin account
      if (email === 'admin@example.com' && password === DUMMY_ADMIN_PASSWORD) {
        // For the dummy admin, we'll just set the user state directly
        // since we don't have a real Firebase account
        setUser({
          uid: 'dummy-admin-uid',
          email: 'admin@example.com',
          displayName: 'Admin User',
          // Add other required User properties
        } as User);
        setIsAdmin(true);
        return;
      }
      
      // For all other accounts, use Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // If it's the dummy admin, just clear the state
      if (user?.email === 'admin@example.com') {
        setUser(null);
        setIsAdmin(false);
        return;
      }
      
      // For real Firebase accounts, use Firebase logout
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      loading,
      isOnline,
      signInWithGoogle,
      signInWithEmail,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 