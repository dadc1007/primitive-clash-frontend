import { SplitLayout } from "@layouts";
import LoginForm from "./LoginForm";
import LoginBanner from "./LoginBanner";

export default function LoginPage() {
  return (
    <SplitLayout leftContent={<LoginForm />} rightContent={<LoginBanner />} />
  );
}
