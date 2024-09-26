import ForgetPassword from "@/components/Auth/forget";
import AuthLayout from "../layouts/AuthLayout";

export default function ForgetPage() {
  return (
    <AuthLayout
      title="Forgot Password"
      subText="Enter your email address and we&#8217;ll send you password reset instructions."
      additionalText="Back to Login"
    >
      <ForgetPassword />
    </AuthLayout>
  );
}
