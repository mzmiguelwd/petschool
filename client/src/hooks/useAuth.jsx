import { useContext } from "react";

import AuthContext from "../context/AuthProvider";

/**
 * Custom hook to access the authentication context (auth state and setAuth function).
 * @returns {{auth: {email: string, roles: string[], accessToken: string}, setAuth: function}}
 */
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
