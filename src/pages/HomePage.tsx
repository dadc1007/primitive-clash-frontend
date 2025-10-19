import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-15 text-center bg-primary">
      <h1
        className="text-9xl font-bold tracking-tighter text-primary-foreground"
        style={{ fontFamily: "var(--font-bebas)" }}
      >
        PRIMITIVE <br /> CLASH
      </h1>
      <p className="text-2xl max-w-md mx-auto text-primary-foreground">
        Entra a la arena prehistórica y lucha por la supervivencia
      </p>
      <div className="flex gap-4">
        <Button size="lg" onPress={() => navigate("/login")}>
          Iniciar Sesión
        </Button>
        <Button color="secondary" size="lg" onPress={() => navigate("/signup")}>
          Crear cuenta
        </Button>
      </div>
    </div>
  );
}
