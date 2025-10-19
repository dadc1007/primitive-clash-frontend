import { useAuth, type UseAuthReturn } from "@hooks";
import { createContext, useContext, type ReactNode } from "react";

const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }

  return context;
}
