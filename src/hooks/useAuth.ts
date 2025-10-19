import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "./useLogin";
import type { ApiError, AuthSuccessResponse, LoginRequest } from "@lib";

export interface UseAuthReturn {
  user: AuthSuccessResponse | null;
  login: (credentials: LoginRequest) => Promise<AuthSuccessResponse>;
  logout: () => void;
  isLoading: boolean;
  error: ApiError | null;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  //   const navigate = useNavigate();
  const [user, setUser] = useState<AuthSuccessResponse | null>(() => {
    const savedUser = localStorage.getItem("user_data");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginMutation = useLogin();

  const login = async (credentials: LoginRequest) => {
    try {
      const userData = await loginMutation.mutateAsync(credentials);
      setUser(userData);
      //   navigate("/dashboard");
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setUser(null);
    // navigate("/login");
  };

  return {
    user,
    login,
    logout,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isAuthenticated: !!user,
  };
};
