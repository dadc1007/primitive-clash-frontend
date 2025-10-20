import type { ReactNode } from "react";

interface MainLayoutProps {
  content: ReactNode;
}

export default function MainLayout({ content }: Readonly<MainLayoutProps>) {
  return (
    <div
      className="min-h-screen relative overflow-hidden bg-gradient-to-b 
             from-[var(--primary)] 
             via-[color-mix(in_oklab,var(--primary)_85%,#000000)] 
             to-[color-mix(in_oklab,var(--primary)_75%,#000000)]"
    >
      <div className="max-w-5xl mx-auto px-4 py-6">{content}</div>
    </div>
  );
}
