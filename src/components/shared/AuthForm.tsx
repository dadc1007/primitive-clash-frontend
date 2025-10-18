import { Alert, Button, Form, Link } from "@heroui/react";
import React, { type FormEvent } from "react";
import type { ApiError } from "@lib";

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
  return (
    <div className="w-full max-w-md space-y-8 text-center">
      <h1 className="text-5xl font-bold tracking-tighter">{title}</h1>
      <p className="text-muted-foreground text-lg">{subtitle}</p>

      <Form className="space-y-6 text-left" onSubmit={onSubmit}>
        {children}

        {error && (
          <Alert
            color="danger"
            title={
              error.status === 401
                ? "Correo o contraseña incorrectos"
                : error.status === 0
                ? "No se pudo conectar con el servidor"
                : error.message || "Ocurrió un error inesperado"
            }
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
      </Form>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          {footerText}{" "}
          <Link
            href={footerLinkHref}
            className="font-semibold text-primary hover:underline"
            size="sm"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}
