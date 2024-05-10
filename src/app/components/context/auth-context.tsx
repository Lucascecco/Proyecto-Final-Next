"use client";

import { auth, provider } from "@/lib/firebase";
import { UserData, createUser, getUser } from "@/lib/actions";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<{
  user?: UserData;
  loginUser: (values: { email: string; password: string }) => Promise<boolean>;
  registerUser: (values: {
    name: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  logoutUser: () => void;
  googleLogin: () => void;
}>({
  loginUser: async (values: { email: string; password: string }) => {
    return false;
  },
  registerUser: async (values: { name: string; email: string; password: string }) => {
    return false;
  },
  logoutUser: () => {},
  googleLogin: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserData>();

  const loginUser = async (values: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (values: {
    name: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (user) {
        await createUser({
          logged: true,
          uid: user.user.uid,
          email: values.email,
          administrator: false,
          name: values.name,
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const logoutUser = async () => {
    await signOut(auth);
  };

  const googleLogin = async () => {
    await signInWithPopup(auth, provider);
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUser(user.uid);
        const administrator = userData?.administrator ? userData.administrator : false
        setUser({
          logged: true,
          administrator: administrator,
          name: userData.name,
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({
          logged: false,
          administrator: false,
          name: null,
          email: null,
          uid: "",
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
