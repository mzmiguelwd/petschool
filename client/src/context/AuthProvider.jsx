import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // inicializar desde localStorage si existe
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : { accessToken: null, user: null };
  });

  useEffect(() => {
    // persistir cambios
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
