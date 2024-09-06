import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";

const useAuth = () => {
  const userInfo = useContext(AuthContext);
  return userInfo;
};

export default useAuth;
