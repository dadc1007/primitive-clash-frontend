import { Outlet } from "react-router-dom";
import { AuthProvider } from "@providers/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
