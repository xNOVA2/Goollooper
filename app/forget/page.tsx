import ForgetPassword from "@/components/Auth/forget";
import AuthLayout from "../layouts/AuthLayout";

export default function ForgetPage() {
  return (
    <AuthLayout
      title="Forget Password"
      subText="Enter your email address and we’ll send you password reset instructions."
      additionalText="Back to Login"
    >
      <ForgetPassword />
    </AuthLayout>
  );
}
