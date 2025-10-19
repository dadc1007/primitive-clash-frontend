import prehistoricTribuWarriors from "@assets/prehistoric-tribe-warriors.jpg";
import { AuthBanner } from "@components/shared";

export default function SignupBanner() {
  return (
    <AuthBanner
      title={
        <>
          ÚNETE A LA <br /> BATALLA
        </>
      }
      slogan="Crea tu tribu y conquista la arena prehistórica"
      imageUrl={prehistoricTribuWarriors}
      type="signup"
    />
  );
}
