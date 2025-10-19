import prehistoricWarrior from "@assets/prehistoric-warrior.jpg";
import { AuthBanner } from "@components/shared";

export default function LoginBanner() {
  return (
    <AuthBanner
      title={
        <>
          PRIMITIVE <br /> CLASH
        </>
      }
      slogan="Domina la arena con estrategia y poder primitivo."
      imageUrl={prehistoricWarrior}
    />
  );
}
