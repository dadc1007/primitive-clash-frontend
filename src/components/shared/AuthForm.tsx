import { Alert, Button, Form } from "@heroui/react";
import React, { type FormEvent } from "react";
import type { ApiError } from "@lib";
import { Link } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

interface AuthFormProps {
  title: string;
  subtitle: string;
  buttonText: string;
  footerText: string;
  footerLinkHref: string;
  footerLinkText: string;
  children: React.ReactNode;
  onSubmit: (e: FormEvent) => void;
  isLoading?: boolean;
  error?: ApiError | null;
}

export default function AuthForm({
  title,
  subtitle,
  buttonText,
  footerText,
  footerLinkHref,
  footerLinkText,
  children,
  onSubmit,
  isLoading = false,
  error = null,
}: Readonly<AuthFormProps>) {
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Error durante el login", error);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 text-center">
      <h1 className="text-5xl font-bold tracking-tighter">{title}</h1>
      <p className="text-muted-foreground text-lg">{subtitle}</p>

      <Form className="space-y-6 text-left" onSubmit={onSubmit}>
        {children}
        {error && (
          <Alert
            color="danger"
            title={error.message || "Ocurrió un error inesperado."}
          />
        )}
        <Button
          type="submit"
          color="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          {buttonText}
        </Button>
        <button onClick={handleLogin}>Login con Microsoft</button>
      </Form>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          {footerText}{" "}
          <Link
            to={footerLinkHref}
            className="font-semibold text-primary hover:underline"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}
