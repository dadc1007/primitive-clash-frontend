import type { ReactNode } from "react";
import { Header } from "@components/shared";

interface MainLayoutProps {
  content: ReactNode;
}

export default function MainLayout({ content }: Readonly<MainLayoutProps>) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6">{content}</div>
    </div>
  );
}
