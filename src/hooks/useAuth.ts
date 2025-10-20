import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type {
  ApiError,
  AuthSuccessResponse,
  LoginRequest,
  SignUpRequest,
} from "@lib";
import { useLogin, useSignup } from "@hooks";

export interface UseAuthReturn {
  user: AuthSuccessResponse | null;
  login: (credentials: LoginRequest) => Promise<AuthSuccessResponse>;
  signup: (credentials: SignUpRequest) => Promise<AuthSuccessResponse>;
  logout: () => void;
  isLoading: boolean;
  error: ApiError | null;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthSuccessResponse | null>(() => {
    const savedUser = localStorage.getItem("user_data");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginMutation = useLogin();
  const signupMutation = useSignup();

  const login = async (credentials: LoginRequest) => {
    try {
      const userData = await loginMutation.mutateAsync(credentials);
      setUser(userData);
      navigate("/collection");
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (credentials: SignUpRequest) => {
    try {
      const userData = await signupMutation.mutateAsync(credentials);
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setUser(null);
    navigate("/login");
  };

  return {
    user,
    login,
    signup,
    logout,
    isLoading: loginMutation.isPending || signupMutation.isPending,
    error: loginMutation.error || signupMutation.error,
    isAuthenticated: !!user,
  };
};
