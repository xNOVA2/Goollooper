import AuthLayout from "@/app/layouts/AuthLayout";
import Signin  from "@/components/Auth/Signin";


export default function Home() {
  return (
    <>
      <AuthLayout title="Admin Login" subText="Welcome Back!">
        <Signin />
      </AuthLayout>
    </>
  );
}
