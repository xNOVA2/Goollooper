import AuthLayout from "@/app/layouts/AuthLayout";
import ResetPassword from "@/components/Auth/ResetPassword";

export default function page() {
  return (
    <AuthLayout title="Reset Password" subText="Enter your new Password">
            <ResetPassword/>
    </AuthLayout>
  )
}
