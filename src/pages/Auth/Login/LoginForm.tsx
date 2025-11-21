import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Form } from "@heroui/react";
import { useAuth } from "@hooks";
import { logError } from "@utils";
import { type FormEvent } from "react";

export default function LoginForm() {
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await login();
    } catch (err) {
      logError("Error en login", err);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 text-center">
      <h1 className="text-5xl font-bold tracking-tighter">
        BIENVENIDO DE VUELTA
      </h1>
      <p className="text-muted-foreground text-lg">
        Inicie sesion para continuar la batalla
      </p>

      <Form className="space-y-6 text-left" onSubmit={handleSubmit}>
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
          startContent={
            !isLoading && <FontAwesomeIcon icon={["fab", "microsoft"]} />
          }
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Microsoft"}
        </Button>
        <Button
          type="button"
          color="primary"
          size="lg"
          className="w-full"
          isDisabled
          startContent={<FontAwesomeIcon icon={["fab", "google"]} />}
        >
          {isLoading ? "Iniciando sesión..." : "Goolge"}
        </Button>
        <Button
          type="button"
          color="primary"
          size="lg"
          className="w-full"
          isDisabled
          startContent={<FontAwesomeIcon icon={["fab", "github"]} />}
        >
          {isLoading ? "Iniciando sesión..." : "GitHub"}
        </Button>
      </Form>
    </div>
    // <AuthForm
    //   title="BIENVENIDO DE VUELTA"
    //   subtitle="Inicie sesion para continuar la batalla"
    //   buttonText={isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
    //   footerText="¿No tienes una cuenta?"
    //   footerLinkHref="/signup"
    //   footerLinkText="Regístrate aquí"
    //   onSubmit={handleSubmit}
    //   isLoading={isLoading}
    //   error={error}
    // ></AuthForm>
  );
}
