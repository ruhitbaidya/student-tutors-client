import { useContext } from "react";
import { userContext } from "../../AuthContext/AuthUser";

const useUserContext = () => {
  const userData = useContext(userContext);
  return userData;
};

export default useUserContext;
