"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Tooltip from "@/components/Tooltip/ToolTip";

import { SiginFields, SigninFields } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/validation/AuthValidation/auth";
import { setUser } from "@/store/actions/userAction";
import { onLogin } from "@/api";


function Signin() {
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFields>({ resolver: zodResolver(SignInSchema) });
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<SigninFields> = async (data: SiginFields) => {
    try {
      setLoading(true);
      let loginRes: any = await onLogin(data);
      if (loginRes?.data?.code === 200) {
        dispatch(setUser(loginRes?.data?.data));
        toast.success(loginRes?.msg);
        setLoading(false);
        router.push('/dashboard');
      } else {
        toast.warning(loginRes?.msg);
      }
    } catch (error: Error | any) {
      setLoading(false);
      toast.error(error?.response?.data?.data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <p className="absolute  text-xm text-PrimaryColor px-3 mt-2">
            Email Address*
          </p>
          <div className="flex">
            <Input
              {...register("email")}
              type="email"
              placeholder="@mail.com"
              className="h-16 rounded-lg bg-backGroundColor pt-7 text-gray-400"
            />
            <div className="absolute ">
              {errors.email?.message && <Tooltip message={errors.email?.message as string} />}
            </div>
          </div>

        </div>
        <div className="relative mt-3">
          <p className="absolute  text-xm text-PrimaryColor px-3 mt-2">
            Password*
          </p>
          <div className="flex">
            <Input
              {...register("password")}
              type="password"
              placeholder="********"
              className="h-16 rounded-lg bg-backGroundColor pt-7 text-gray-400"
            />
            <div className="absolute">
              {errors.password?.message && <Tooltip message={errors.password?.message} />}

            </div>
          </div>

        </div>
        <div className="flex justify-between mt-3">
          <div className="flex items-center space-x-2">
            <Input type="checkbox" className="w-4 h-4 rounded-xl" />
            <label htmlFor="" className="text-sm">
              Remember me
            </label>
          </div>

          <div>
            <Link className="text-red-600 " href={"/forget"}>
              {" "}
              Forget Password
            </Link>
          </div>
        </div>
        <Button
          className="w-full rounded-full bg-SecondaryColor py-8 mt-5"
          type="submit"
        >
          Login
        </Button>
      </form>
    </>
  );
}

export default Signin;