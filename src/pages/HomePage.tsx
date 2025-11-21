import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-15 text-center">
      <h1
        className="text-9xl font-bold tracking-tighter"
        style={{ fontFamily: "var(--font-bebas)" }}
      >
        PRIMITIVE <br /> CLASH
      </h1>
      <p className="text-2xl max-w-md mx-auto">
        Entra a la arena prehistórica y lucha por la supervivencia
      </p>
      <div className="flex gap-4">
        <Button color="primary" size="lg" onPress={() => navigate("/login")}>
          Iniciar aventura
        </Button>
      </div>
    </div>
  );
}
