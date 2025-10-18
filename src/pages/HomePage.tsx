import { Button } from "@heroui/react";

export default function HomePage() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center space-y-15">
      <div className="text-center space-y-4">
        <h1
          className="text-9xl font-bold tracking-tighter"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          PRIMITIVE <br /> CLASH
        </h1>
        <p className="text-2xl max-w-md mx-auto">
          Entra a la arena prehistórica y lucha por la supervivencia
        </p>
      </div>
      <div className="flex gap-4">
        <Button color="primary" size="lg">
          Iniciar Sesión
        </Button>
        <Button color="secondary" size="lg">
          Crear cuenta
        </Button>
      </div>
    </div>
  );
}
