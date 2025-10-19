import React from "react";

interface AuthBannerProps {
  title: React.ReactNode;
  slogan: string;
  imageUrl: string;
}

export default function AuthBanner({
  title,
  slogan,
  imageUrl,
}: Readonly<AuthBannerProps>) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-primary relative overflow-hidden">
      <img
        src={imageUrl}
        alt="Banner decorativo del juego"
        className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity duration-500"
        aria-hidden="true"
      />
      <div className="text-center space-y-6 p-12 z-10">
        <h2
          className="text-7xl font-bold text-primary-foreground tracking-tighter"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          {title}
        </h2>
        <p className="text-2xl text-primary-foreground/90 max-w-lg leading-relaxed">
          {slogan}
        </p>
      </div>
    </div>
  );
}
