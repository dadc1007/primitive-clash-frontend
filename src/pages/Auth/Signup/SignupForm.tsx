import { AuthForm } from "@components/shared";
import { Input } from "@heroui/react";
import { useAuth } from "@hooks";
import { logError } from "@utils";
import { type FormEvent, useState } from "react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signup({ username, email, password });
    } catch (err) {
      logError("Error en login", err);
    }
  };

  return (
    <AuthForm
      title="Crea tu cuenta"
      subtitle="Únete a miles de guerreros en la arena"
      buttonText={isLoading ? "Creando cuenta..." : "Crear cuenta"}
      footerText="¿Ya tienes una cuenta?"
      footerLinkHref="/login"
      footerLinkText="Inicia sesión"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    >
      <Input
        isRequired
        isDisabled={isLoading}
        label="Usuario"
        labelPlacement="outside"
        placeholder="Ingresa tu usuario"
        type="text"
        variant="faded"
        value={username}
        onValueChange={setUsername}
      />
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
