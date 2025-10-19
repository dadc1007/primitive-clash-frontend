import { SplitLayout } from "@layouts";
import SignupBanner from "./SignupBanner";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <SplitLayout leftContent={<SignupBanner />} rightContent={<SignupForm />} />
  );
}
