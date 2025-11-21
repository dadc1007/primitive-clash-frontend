import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ApiError, AuthSuccessResponse } from "@lib";
import { useMsal } from "@azure/msal-react";
import { log } from "@utils";
import { useUpsertUser } from "./useUpsertUser";

export interface UseAuthReturn {
  user: AuthSuccessResponse | null;
  login: () => Promise<AuthSuccessResponse>;
  logout: () => void;
  isLoading: boolean;
  error: ApiError | null;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthSuccessResponse | null>(() => {
    const savedUser = localStorage.getItem("user_data");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const upsertUserMutation = useUpsertUser();

  const login = async () => {
    try {
      const loginResponse = await instance.loginPopup({
        scopes: [
          "api://de66ae18-46d3-4b76-b180-b8967383e545/user_impersonation",
        ],
      });
      log("Usuario logueado:", loginResponse.account);

      const tokenResponse = await instance.acquireTokenSilent({
        scopes: [
          "api://de66ae18-46d3-4b76-b180-b8967383e545/user_impersonation",
        ],
        account: loginResponse.account,
      });

      const accessToken = tokenResponse.accessToken;
      localStorage.setItem("msalAccessToken", accessToken);

      const userData = await upsertUserMutation.mutateAsync();
      setUser(userData);

      navigate("/lobby");
    } catch (error) {
      throw error;
    }
  };

  // Función de logout
  const logout = async () => {
    try {
      await instance.logoutPopup();

      localStorage.removeItem("user_data");
      localStorage.removeItem("msalAccessToken");
      setUser(null);

      navigate("/");
    } catch (error) {
      localStorage.removeItem("user_data");
      localStorage.removeItem("msalAccessToken");
      setUser(null);
      console.error("Error en logout:", error);
    }
  };

  return {
    user,
    login,
    logout,
    isLoading: upsertUserMutation.isPending,
    error: upsertUserMutation.error,
    isAuthenticated: !!user,
  };
};
