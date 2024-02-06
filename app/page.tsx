import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthLayout from "@/app/layouts/AuthLayout";
import Signin from "@/components/Auth/Signin";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <AuthLayout title="Admin Login" subText="Welcome Back!">
        <Signin />
      </AuthLayout>
    </>
  );
}
