import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext(null);

const AuthUser = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const registerEmailpass = (email, password) => {
    console.log(auth, email, password)
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = ()=>{
    return updateProfile(auth.currentUser, {
        displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
      })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (person) => {
      setUser(person);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const info = { registerEmailpass,updateUserProfile, user, loading };
  return <userContext.Provider value={info}>{children}</userContext.Provider>;
};

export default AuthUser;
