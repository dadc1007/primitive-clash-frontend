import { AuthForm } from "@components/shared";
import { Input } from "@heroui/react";
import { useAuth } from "@hooks";
import { logError } from "@utils";
import { type FormEvent, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
    } catch (err) {
      logError("Error en login", err);
    }
  };

  return (
    <AuthForm
      title="BIENVENIDO DE VUELTA"
      subtitle="Ingresa tus credenciales para continuar la batalla"
      buttonText={isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
      footerText="¿No tienes una cuenta?"
      footerLinkHref="/signup"
      footerLinkText="Regístrate aquí"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    >
      <Input
        isRequired
        isDisabled={isLoading}
        errorMessage="Por favor ingresa un correo electrónico válido"
        label="Correo"
        labelPlacement="outside"
        placeholder="Ingresa tu correo"
        type="email"
        variant="faded"
        value={email}
        onValueChange={setEmail}
      />
      <Input
        isRequired
        isDisabled={isLoading}
        label="Contraseña"
        labelPlacement="outside"
        placeholder="Ingrese su contraseña"
        type="password"
        variant="faded"
        value={password}
        onValueChange={setPassword}
      />
    </AuthForm>
  );
}
