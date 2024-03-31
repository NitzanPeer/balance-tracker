import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

export const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const guestEmail = "guest@example.com"

  const [user, setUser] = useState(null);
  const [isGuestUser, setIsGuestUser] = useState(false)

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }

  const logout = async () => {
      return await signOut(auth)
  }

  useEffect(() => {
    // onAuthStateChanged is a firebase function that returns a method that lets us unsubscribe from the listener.
    // in essence, we are subscribing to the listener and unsubscribing from it when the component dismounts.
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
      setIsGuestUser(guestEmail === currentUser?.email)
    });
    return () => {
      unsubAuth();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, isGuestUser, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};