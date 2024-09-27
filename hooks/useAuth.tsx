import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

type AuthContextProps = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(getAuth(), async (userAuth) => {
      try {
        if (userAuth) {
          setUser(userAuth);
          await AsyncStorage.setItem("user", JSON.stringify(userAuth));
        } else {
          setUser(null);
          await AsyncStorage.removeItem("user");
        }
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribeAuth;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(getAuth(), email, password);
  };

  const logout = async () => {
    await signOut(getAuth());
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
