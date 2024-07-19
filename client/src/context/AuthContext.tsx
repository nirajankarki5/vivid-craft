import React, { createContext, useState, ReactNode } from "react";

interface AuthContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: true,
  setIsLoggedIn: () => {},
});

interface Prop {
  children: ReactNode;
}

export const AuthProvider: React.FC<Prop> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
