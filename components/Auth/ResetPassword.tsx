"use client";
import React, { Suspense, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Input } from "../ui/input";
import Tooltip from "../Tooltip/ToolTip";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/validation/AuthValidation/auth";
import { ResetPassword as ResetPasswordType } from "@/types/type";
import { resetPassword } from "@/api";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ResetPasswordType> = async (data) => {
    try {
      setLoading(true);
      const token = searchParams.get("token");
      let passRes: any = await resetPassword(data, token);
      if (passRes?.data?.code === 200) {
        toast.success(passRes?.data?.msg);
        setLoading(false);
        router.push("/");
      } else {
        toast.warning(passRes?.msg);
      }
    } catch (error: Error | any) {
      setLoading(false);
      toast.error(error?.response?.data?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <p className="absolute  text-xm text-PrimaryColor px-3 mt-2">
          New Password*
        </p>
        <div className="flex">
          <Input
            {...register("password")}
            type="password"
            placeholder="New Password"
            className="h-16 rounded-lg bg-backGroundColor pt-7 text-gray-400"
          />
          <div className="absolute ">
            {errors.password?.message && (
              <Tooltip message={errors.password?.message as string} />
            )}
          </div>
        </div>
      </div>
      <div className="relative mt-3">
        <p className="absolute  text-xm text-PrimaryColor px-3 mt-2">
          Confirm Password*
        </p>
        <div className="flex">
          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="h-16 rounded-lg bg-backGroundColor pt-7 text-gray-400"
          />
          <div className="absolute">
            {errors.confirmPassword?.message && (
              <Tooltip message={errors.confirmPassword?.message} />
            )}
          </div>
        </div>
      </div>

      <Button
        className="w-full rounded-full bg-SecondaryColor py-8 mt-5"
        type="submit"
      >
        Reset Password
      </Button>
    </form>
  );
}
