import React, { createContext, useState, ReactNode, useEffect } from "react";

interface AuthContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

interface Prop {
  children: ReactNode;
}

export const AuthProvider: React.FC<Prop> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUser = () => {
    // Add logic to get user and set user to true
    setIsLoggedIn(true);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
