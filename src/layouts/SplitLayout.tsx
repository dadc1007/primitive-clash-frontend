import type { ReactNode } from "react";

interface LayoutProps {
  readonly leftContent: ReactNode;
  readonly rightContent: ReactNode;
}

export default function SplitLayout({
  leftContent,
  rightContent,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex items-center justify-center">
        {leftContent}
      </div>
      <div className="w-1/2 flex items-center justify-center">
        {rightContent}
      </div>
    </div>
  );
}
