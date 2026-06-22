import { createContext, useState, useEffect, useCallback } from "react";
import { apiGetMe } from "../api";

export const AuthContext = createContext();

function parseJwt(token) {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);   // { id, email, role }
  const [isLoading, setIsLoading] = useState(true); // prevents flash of wrong auth state

  // Restore session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const payload = parseJwt(savedToken);
      // Check expiry
      if (payload && payload.exp * 1000 > Date.now()) {
        setToken(savedToken);
        setUser({ email: payload.email, role: payload.role, id: payload.sub });
      } else {
        // Expired — clear storage
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((tokenData) => {
    localStorage.setItem("token", tokenData);
    setToken(tokenData);
    const payload = parseJwt(tokenData);
    if (payload) {
      setUser({ email: payload.email, role: payload.role, id: payload.sub });
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}