import { Header } from "@components/shared";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
}
