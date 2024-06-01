import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase";
import { createContext, useEffect, useState } from "react";
import usePullicApi from "../Hooks/publicApi/usePullicApi";

export const userContext = createContext(null);

const AuthUser = ({ children }) => {
    const publicApicall = usePullicApi();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const registerEmailpass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name
    });
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (person) => {
      setUser(person);
      setLoading(false);
      if(person){
        publicApicall.post('/jwtCreate', {email : person.email})
        .then((res)=> {
            const token = res.data.token;
            localStorage.setItem("token", JSON.stringify(token))
        })
        .catch((err)=> console.log(err))
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const info = { registerEmailpass, updateUserProfile, user, loading };
  return <userContext.Provider value={info}>{children}</userContext.Provider>;
};

export default AuthUser;
