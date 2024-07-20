import { jwtDecode } from "jwt-decode";

export const setToken = (token: string | undefined): void => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    console.log("No token provided");
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const clearToken = (): void => {
  localStorage.removeItem("token");
};

// check if token is valid using jwt-decode package
export const isLoggedIn = (): boolean => {
  const token = getToken();

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentDate = Date.now() / 1000; // Current time in seconds

    // if decodedToken.exp is undefined
    // Check if token is expired
    if (!decodedToken.exp || decodedToken.exp < currentDate) {
      clearToken();
      return false;
    }

    return true;
  } catch (error) {
    clearToken();
    return false;
  }
};
